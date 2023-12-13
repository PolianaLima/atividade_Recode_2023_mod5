import React, {useEffect, useState} from 'react';
import Head from "next/head";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";
import {getDataVoos} from "@/pages/api/getDataVoos";

function VooId(props) {

    const router = useRouter();
    const vooId = router.query.vooId;
    const vooIdNumber = parseInt(vooId);

    const dataPassagem = {};

    const [tokenUsuario, setTokenUsuario] = useState([{"token": ""}])
    const [usuarioId, setUsuarioId] = useState([])
    const [passageiros, setPassageiros] = useState([])
    const [voo, setVoo] = useState([])
    const [showFormNewPassageiros, setShowFormNewPassageiros] = useState(false);
    const [showFormPassageirosList, setshowFormPassageirosList] = useState(true);

    dataPassagem.id_usuario = usuarioId;
    dataPassagem.id_voo = vooIdNumber;

    useEffect(() => {
        const data = getUserFromCookie();
        if (data === null) {
            router.push("/login");
        } else {
            setTokenUsuario(data.token);
            setUsuarioId(data.usuario.id)
        }
    }, [router]);

    useEffect(() => {
        const getVoo = async () => {

            try {
                const voosDados = await getDataVoos();
                const vooSelecionado = voosDados.find((voo) => {
                    return (
                        voo.id === vooIdNumber
                    );
                });
                setVoo(vooSelecionado);
            } catch (error) {
                console.error("Erro na resposta da API", error)
            }
        }

        getVoo();
    }, [vooIdNumber]);


    useEffect(() => {
        const getDataPassageiros = async () => {
            try {
                const response = await http.get("/passageiros", {
                    headers: {
                        Authorization: `Bearer ${tokenUsuario}`,
                        Accept: "application/json"
                    }
                });
                setPassageiros(response.data)
            } catch (e) {
                console.error("Erro ao buscar passageiros", e);
            }
        }
        getDataPassageiros();
    }, [tokenUsuario]);


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const handleNewPassageiro = () => {
        setshowFormPassageirosList(false)
        setShowFormNewPassageiros(true)
    }


    const onSubmit = async (data) => {
        data.id_usuario = usuarioId;

        const response = await http.post(`/passageiros`, data, {
            headers: {
                Authorization: `Bearer ${tokenUsuario}`
            }
        });
        dataPassagem.id_passageiro = response.data.id;
        savePassagem(dataPassagem)
    }

    const savePassagemSelectedPassageiro = (data) => {
        dataPassagem.id_passageiro = parseInt(data.id_passageiro);
        savePassagem(dataPassagem);
    }

    const savePassagem = async (dataPassagem) => {

        const response = await http.post(`/passagens`, dataPassagem, {
            headers: {
                Authorization: `Bearer ${tokenUsuario}`
            }
        })

        router.push("/usuario/perfil")
    }


    return (
        <>
            <Head>
                <title>Agencia de Viagems - Compras </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="container mb-5">
                <h4 className="text-secondary">Complete os dados para finalizar sua reserva</h4>

                <div className="d-sm-flex">


                    {showFormPassageirosList === true ? (
                        <div className="form w-100 visible ">
                            <div>
                                <p>Adicione um novo caso nao esteja na lista!</p>
                                <button className="btn btn-success mb-4"
                                        onClick={handleNewPassageiro}
                                >Novo Passageiro
                                </button>
                            </div>

                            {passageiros && passageiros.length > 0 ? (
                                <div>
                                    <select className="form-select"
                                            defaultValue="0"
                                            {...register("id_passageiro",
                                                {validate: (value) => (value !== "0")})}
                                    >

                                        <option value="0">Selecione uma passageiro</option>
                                        {passageiros.map(passageiro => (
                                            < option value={passageiro.id} key={passageiro.id}>
                                                {passageiro.nome}
                                            </option>
                                        ))}
                                    </select>

                                    {errors?.id_passageiro?.type === "validate" && (
                                        <p className="text-danger fw-bold">Selecione uma opção válida</p>
                                    )}

                                    <button className="btn btn-success mt-5"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleSubmit(savePassagemSelectedPassageiro)()
                                            }}
                                    >
                                        Confirmar Compra
                                    </button>

                                </div>

                            ) : ("")}

                        </div>

                    ) : ("")}


                    {showFormNewPassageiros === true ? (

                        <div className="form w-100">
                            <p className="fs-5 fw-bold text-secondary">Adicione os dados do passageiro</p>

                            <div className="d-flex flex-column">
                                <label className="form-label">Nome</label>
                                <input className="form-control"
                                       type="text"
                                       placeholder="Insira o nome completo do passageiro"
                                       {...register("nome", {required: true})}

                                />

                            </div>

                            <div className="d-flex flex-column">
                                <label className="form-label">CPF</label>
                                <input className="form-control"
                                       type="text"
                                       placeholder="Cpf"
                                       {...register("cpf", {required: true})}
                                />
                            </div>

                            <div className="d-sm-flex">
                                <div className="d-flex flex-column mt-4 me-3 w-100">
                                    <label className="form-label">Data Nascimento</label>
                                    <input className="form-control"
                                           type="date"
                                           {...register("data_nascimento", {required: true})}
                                    />
                                </div>

                                <div className="d-flex flex-column mt-4 w-100">
                                    <label className="form-label">Genero</label>
                                    <select className="form-select mb-3"
                                            defaultValue="0"
                                            {...register("sexo",
                                                {validate: (value) => (value !== "0")})}
                                    >
                                        <option value="0">Selecione uma opção</option>
                                        <option value="F">Feminino</option>
                                        <option value="M">Masculino</option>
                                    </select>
                                    {errors?.id_passageiro?.type === "validate" && (
                                        <p className="text-danger fw-bold">Selecione uma opção válida</p>
                                    )}
                                </div>
                            </div>

                            <div className="d-sm-flex flex-column border p-3">
                                <p className="fs-5 text-secondary">Informe seu endereço e contato para caso de
                                    emergência!</p>

                                <div className="d-flex flex-column w-100">
                                    <label className="form-label">Cep</label>
                                    <input className="form-control"
                                           type="text"
                                           placeholder="Digite o cep"
                                           {...register("cep", {required: true})}
                                    />
                                </div>
                                <div className="d-flex mt-3">
                                    <div className="d-flex flex-column w-100 me-3">
                                        <label className="form-label">Endereço</label>
                                        <input className="form-control"
                                               type="text"
                                               placeholder="Endereço"
                                               {...register("endereco", {required: true})}
                                        />
                                    </div>

                                    <div className="d-flex flex-column ">
                                        <label className="form-label">Cep</label>
                                        <input className="form-control"
                                               type="number"
                                               placeholder="Numero"
                                               {...register("numero", {required: true})}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <div className="d-flex flex-column w-100 me-3">
                                        <label className="form-label">Cidade</label>
                                        <input className="form-control"
                                               type="text"
                                               placeholder="Cidade"
                                               {...register("cidade", {required: true})}
                                        />
                                    </div>

                                    <div className="d-flex flex-column w-100 ">
                                        <label className="form-label">Estado</label>
                                        <input className="form-control"
                                               type="text"
                                               placeholder="Estado"
                                               {...register("estado", {required: true})}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <button className="btn btn-warning" onClick={(event) => {
                                        event.preventDefault();
                                        handleSubmit(onSubmit)()
                                    }}>Confirmar Compra
                                    </button>
                                </div>

                            </div>
                        </div>
                    ) : ("")}


                    <div className="p-3 ms-3 w-100">
                        <h4 className="text-secondary">Detalhe da compra</h4>
                        <div className="bg-body-secondary w-100 rounded-4 p-3">

                            <div className="d-flex align-items-center">
                                <img width="48" className="me-3" height="48"
                                     src="https://img.icons8.com/emoji/48/airplane-emoji.png"
                                     alt="airplane-emoji"/>
                                <div>
                                    <h3>{voo.cidadeSaida} - {voo.cidadeChegada}</h3>
                                    <p>{voo.nomeEmpresa}</p>
                                </div>

                            </div>


                            <div className="d-sm-flex flex-row justify-content-between">
                                <div className="d-flex flex-column align-items-center justify-content-center p-5">
                                    <span className="text-secondary"> {voo.data_partida_formatada}</span>
                                    <h1>{voo.hora_partida}</h1>
                                    <h3 className="text-secondary">{voo.siglaAeroportoSaida}</h3>
                                    <p className="text-secondary">{voo.cidadeSaida}</p>
                                </div>

                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <span>Duração</span>
                                    <p>{voo.duracao}</p>
                                </div>

                                <div className="d-flex flex-column align-items-center justify-content-center p-5">
                                    <span className="text-secondary"> sab, 13 de Janeiro 2024</span>
                                    <h1>08:30</h1>
                                    <h3 className="text-secondary">{voo.siglaAeroportoChegada}</h3>
                                    <p className="text-secondary">{voo.cidadeChegada}</p>
                                </div>


                            </div>

                            <div className="d-flex justify-content-between">
                                <p className="w-100 text-center fw-bold">TOTAL</p>
                                <p className="w-100 text-center fs-4 fw-bold"><sub
                                    className="text-secondary">R$ </sub>{(voo.preco)}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </main>
        </>
    );
}

export default VooId;