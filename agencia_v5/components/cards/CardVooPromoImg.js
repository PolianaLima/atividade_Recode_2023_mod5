import React from 'react';
import Link from "next/link";

function CardVooPromoImg({voo}) {
    return (
        <div className="card ms-2" style={{maxWidth:300, minHeight:640}}>
            <img src="img/img_card_padrao.jpg" className="card-img-top"
                 alt="Imagem do card da promoção"/>
            <div className="card-body d-flex flex-column justify-content-between ">
                <h5 className="fw-bold ">Destino:  {voo.cidadeChegada} </h5>
                <hr/>
                <p>Saindo de {voo.cidadeSaida}</p>
                <p>{voo.data_partida_formatada}</p>
                <p className="mt-4 mb-4 d-flex flex-row justify-content-between">

                    {voo.desconto !== 0 ? (
                        <>
                            <span className="text-bg-success p-2 rounded-3 "> OFERTA IMBATIVEL
                            </span>
                            <span
                                className="text-bg-danger p-2 rounded-circle">{voo.desconto}%
                            </span>
                        </>

                    ) : (

                        <div className="mb-5"></div>
                    )}
                </p>
                <hr/>
                <p className="fs-3 text-center fw-bold">
                    <sub>R$</sub> {(voo.preco).toFixed(2)}</p>
                <hr/>
                <Link href={`/compra/addPassageiros/${voo.id}`} className="btn btn-warning w-100">Comprar</Link>
            </div>
        </div>
    );
}

export default CardVooPromoImg;
