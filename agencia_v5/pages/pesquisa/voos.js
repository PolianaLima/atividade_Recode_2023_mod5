import {http} from "@/utils/http";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import CardVoos from "@/components/cards/CardVoos";
import moment from "moment";
import 'moment/locale/pt-br';
import {getDataVoos} from "@/pages/api/getDataVoos";

function Voos() {
    const router = useRouter();
    const [voos, setVoos] = useState([]);

    const { origem, destino, data_partida} = router.query;

    useEffect(() => {
        const getData = async () => {
            try {

                const voosDados = await getDataVoos();
                const voosFiltrados = voosDados.filter((voo) => {
                    return (
                        voo.cidadeSaida === origem &&
                        voo.cidadeChegada === destino &&
                        voo.data_partida === data_partida
                    );
                });

                setVoos(voosFiltrados);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };

        getData();
    }, [origem, destino, data_partida]);



    return (
        <>
            <Head>
                <title>Agencia de Viagems - Home </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="container mt-5">
                {voos && voos.length > 0 ? (
                    voos.map(vooMap =>
                        <div key={vooMap.id}>
                            <CardVoos voo={vooMap} />
                        </div>
                    )
                ) : (
                    <>
                        <p className="text-danger fw-bold">Ops.. Nao encontramos nenhum voo no momento, tente novamente com outra data!</p>
                        <button className="btn btn-danger" onClick={(event) => {
                            event.preventDefault()
                            router.push('/')
                        }}>Buscar novamente
                            <img width="20" className="ms-2" height="20" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
                        </button>
                    </>
                )}
            </main>
        </>
    );
}

export default Voos;