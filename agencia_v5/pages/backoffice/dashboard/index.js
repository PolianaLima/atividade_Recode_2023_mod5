import React, {useEffect, useState} from "react";
import Head from "next/head";
import {useAuth} from "@/context/authContext";
import {useRouter} from "next/router";
import {http} from "@/utils/http";
import Link from "next/link";
import Image from "next/image";
import Paginacao from "@/components/Paginacao";
import ModalComponent from "@/components/ModalComponent";
import moment from "moment/moment";
import {getTokenVerify} from "@/pages/api/getTokenVerify";

function Index(props) {

    getTokenVerify();

    const {token} = useAuth();
    const router = useRouter();

    const [voos, setVoos] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [idvoos, setIdVoos] = useState([]);


    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (idVoosSelecionado) => {
        setIdVoos(idVoosSelecionado)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.reload();
    };


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await http.get(`/voos?page=${page}&size=10`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                    params: {page},
                });

                // Extraindo voos do response
                const voos = response.data.content;

                // Mapeando os id empresa, e aeroportos
                const idEmpresas = voos.map((voo) => voo.id_empresa);
                const idAeroportosSaida = voos.map((voo) => voo.id_aeroporto_partida);
                const idAeroportosChegada = voos.map((voo) => voo.id_aeroporto_chegada);

                // Remover id duplicado :: Empresa e Aeroportos
                const uniqueIdEmpresas = [...new Set(idEmpresas)];

                const uniqueIdAeroportos = [
                    ...new Set([...idAeroportosSaida, ...idAeroportosChegada]),
                ];

                // Para cada ID único de empresa, buscar o nome da empresa
                const empresaResponses = await Promise.all(
                    uniqueIdEmpresas.map((id) =>
                        http.get(`/empresasaereas/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    )
                );

                // Buscando informações sobre o Aeroporto
                const aeroportoResponses = await Promise.all(
                    uniqueIdAeroportos.map((id) =>
                        http.get(`/aeroportos/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    )
                );

                const empresaMap = empresaResponses
                    .filter((resp) => resp.data.hasOwnProperty("nome"))
                    .reduce((map, empresaResponse) => {
                        const empresa = empresaResponse.data;
                        map[empresa.id] = empresa.nome;
                        return map;
                    }, {});

                const aeroportoMap = aeroportoResponses
                    .filter((resp) => resp.data.hasOwnProperty("cidade"))
                    .reduce((map, aeroportoResponse) => {
                        const aeroporto = aeroportoResponse.data;
                        map[aeroporto.id] = {
                            cidade: aeroporto.cidade,
                            nome: aeroporto.nome,
                        };
                        return map;
                    }, {});

                const voosDados = voos.map((voo) => ({
                    ...voo,
                    nomeEmpresa: empresaMap[voo.id_empresa],
                    cidadeSaida: aeroportoMap[voo.id_aeroporto_partida]?.cidade,
                    nomeAeroportoSaida: aeroportoMap[voo.id_aeroporto_partida]?.nome,
                    cidadeChegada: aeroportoMap[voo.id_aeroporto_chegada]?.cidade,
                    nomeAeroportoChegada: aeroportoMap[voo.id_aeroporto_chegada]?.nome,
                    data_partida_formatada: moment(voo.data_partida).format('DD/MM/YYYY'),
                }));
                setVoos(voosDados);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };


        getData();
    }, [page, token]);


    const handleDeleteVoo = () =>{
        http.delete(`/voos/${idvoos}`, {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then(()=>{
                closeModal();
            })
            .catch((erro)=>{
                console.error("Erro ao exlcuir ",erro );
            })
    }


    return (
        <>
            <Head>
                <title>Agencia de Viagems - DashBoard </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="container">

                <div className="container d-sm-flex flex-row justify-content-between mb-3">
                    <h3>Lista de Voos</h3>
                    <Link href="/backoffice/dashboard/cadastro" className="btn btn-success pe-5 ps-5" onClick={(e) => {
                    }}>Novo
                    </Link>
                </div>

                <table className="table">
                    <thead>
                    <tr className="border border-2 border-warning">
                        <th scope="col">Origem / Aeroporto</th>
                        <th scope="col">Destino / Aeroporto</th>
                        <th scope="col">Voo</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Desc.</th>
                        <th scope="col">Data</th>
                        <th scope="col" className="d-flex justify-content-end">Ações</th>
                    </tr>

                    {voos && voos.length > 0 ? (
                        voos.map(voo =>
                            <tr key={voo.id}>
                                <td>{voo.cidadeSaida} / {voo.nomeAeroportoSaida}</td>
                                <td>{voo.cidadeChegada} / {voo.nomeAeroportoChegada}</td>
                                <td>{voo.numero}</td>
                                <td>R$ {voo.preco.toFixed(2)}</td>
                                <td>{voo.desconto}%</td>
                                <td>{voo.data_partida_formatada}</td>

                                <td className="d-flex justify-content-end">
                                    <Link href={`/backoffice/dashboard/${voo.id}`}
                                          className="btn btn-success me-3">
                                        <Image src="/img/editar.png" alt="" width={20} height={20}/>

                                    </Link>
                                    <button className="btn btn-danger"
                                            onClick={() => openModal(voo.id)}>X
                                    </button>
                                </td>
                            </tr>
                        )

                    ) : (
                        <tr>
                            <td colSpan="6">Nenhum Voo encontrado.</td>
                        </tr>
                    )}
                    </thead>
                </table>

                <Paginacao page={page} totalPages={totalPages} setPage={setPage}/>


                <ModalComponent isOpen={modalIsOpen}>
                    <p>Deseja excluir o Voo? </p>
                    <div className="d-flex justify-content-between">

                        <button className="btn  bg-success me-2" onClick={(e) => {
                            e.preventDefault();
                            handleDeleteVoo()
                        }}>CONFIRMAR
                        </button>
                        <button className="btn  btn-danger" onClick={closeModal}>CONCELAR</button>
                    </div>

                </ModalComponent>
            </main>
        </>
    );
}

export default Index;
