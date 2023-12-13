import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Carousel from "@/components/cards/Carousel";
import Image from "next/image";
import moment from "moment/moment";
import {getDataVoos} from "@/pages/api/getDataVoos";
import CardVooPromoImg from "@/components/cards/CardVooPromoImg";
import Link from "next/link";
import {useRouter} from "next/router";

function Index(props) {

    const [voos, setVoos] = useState([]);

    moment.locale('pt-br');

    useEffect(() => {
        const getData = async () => {
            try {
                const voosDados = await getDataVoos();
                setVoos(voosDados);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };

        getData();
    }, []);


    const rioJaneiro = voos.filter(value => value.cidadeChegada === "Rio de Janeiro")
    const salvador = voos.filter(value => value.cidadeChegada === "Salvador")
    const saoPaulo = voos.filter(value => value.cidadeChegada === "Sao Paulo")

    return (
        <>
            <Head>
                <title>Agencia de Viagems - Destino </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Carousel url1="/img/carrousel_img1.jpg"
                          url2="/img/carrousel_img2.jpg"
                          url3="/img/carrousel_img3.jpg"
                          url4="/img/carrousel_img4.jpg"/>

                <div className="container d-sm-flex mb-3 bg-light p-4 mt-5 rounded-4">
                    <div className="">
                        <h1 className="mt-5">Voos Para o Rio de Janeiro</h1>
                        <Image src="/img/icone_rio.png" width={300} height={300}
                               alt="Icone Voos imbativeis"/>
                        <Link href="/pesquisa/[codigobanner]" as={`/pesquisa/${encodeURIComponent('Rio de Janeiro')}`}
                              className="btn btn-primary w-100 rounded-4 mt-5">
                            Ver mais voos
                        </Link>

                    </div>
                    <div className="container mt-5 d-sm-flex justify-content-between ">
                        {rioJaneiro && rioJaneiro.length > 0 ? (
                            rioJaneiro.slice(0, 3).map(vooMap =>
                                <div key={vooMap.id}>
                                    <CardVooPromoImg voo={vooMap}/>
                                </div>
                            )

                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center ">
                                <h3 className="text-body-secondary"> OPS! Nao temos nenhuma opção no momento</h3>
                                <img width="48" height="48" src="https://img.icons8.com/color/48/000000/happy--v1.png"
                                     alt="happy--v1"/>
                            </div>
                        )}

                    </div>
                </div>

                <div className="container d-sm-flex align-items-lg-stretch mb-5 bg-light p-5 mt-5">
                    <div className="mt-5">
                        <h1 className="mt-5">Voos para Salavador</h1>
                        <Image src="/img/icone_salvador.png" width={300} height={300}
                               alt="Icone Voos imbativeis"/>
                        <Link href="/pesquisa/[codigobanner]" as={`/pesquisa/${encodeURIComponent('Salvador')}`}
                              className="btn btn-primary w-100 rounded-4 mt-5">
                            Ver mais voos
                        </Link>

                    </div>
                    <div className="container mt-5 d-sm-flex justify-content-between ">
                        {salvador && salvador.length > 0 ? (
                            salvador.map(vooMap =>
                                <div key={vooMap.id}>
                                    <CardVooPromoImg voo={vooMap}/>
                                </div>
                            )

                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center ">
                                <h3 className="text-body-secondary"> OPS! Nao temos nenhuma opção no momento</h3>
                                <img width="48" height="48" src="https://img.icons8.com/color/48/000000/happy--v1.png"
                                     alt="happy--v1"/>
                            </div>
                        )}
                    </div>
                </div>

                <div className="container d-sm-flex align-items-lg-stretch mb-5 bg-light p-5 ">
                    <div className="mt-5">
                        <h1 className="mt-5">Voos para Sao Paulo</h1>
                        <Image src="/img/icone_sao_paulo.png" width={300} height={300}
                               alt="Icone Voos imbativeis"/>
                        <Link href="/pesquisa/[codigobanner]" as={`/pesquisa/${encodeURIComponent('Sao Paulo')}`}
                              className="btn btn-primary w-100 rounded-4 mt-5">
                            Ver mais voos
                        </Link>

                    </div>
                    <div className="container d-sm-flex justify-content-between ">
                        {saoPaulo && saoPaulo.length > 0 ? (
                            saoPaulo.slice(0, 3).map(vooMap =>
                                <div key={vooMap.id}>
                                    <CardVooPromoImg voo={vooMap}/>
                                </div>
                            )

                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center ">
                                <h3 className="text-body-secondary"> OPS! Nao temos nenhuma opção no momento</h3>
                                <img width="48" height="48" src="https://img.icons8.com/color/48/000000/happy--v1.png"
                                     alt="happy--v1"/>
                            </div>
                        )}
                    </div>
                </div>


            </main>
        </>
    );
}

export default Index;