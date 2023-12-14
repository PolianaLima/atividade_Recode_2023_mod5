import React from 'react';
import Link from "next/link";

function CardVoos({voo}) {
    return (
        <div className="w-100 shadow rounded-4  d-sm-flex justify-content-between mb-5">
            <div className="w-100 me-5 p-5">
                <div className="d-sm-flex flex-row">
                    <div className="me-5">
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/airplane-mode-on--v1.png"
                             alt="airplane-mode-on--v1"/>
                        <span className="ms-2 fw-bold">IDA</span>
                        <p className=" text-body-secondary">{voo.data_partida_formatada}</p>
                    </div>
                    <div className="me-5">
                        <span className="fw-bold" title={voo.nomeAeroportoSaida}
                              style={{cursor: "pointer"}}>{voo.siglaAeroportoSaida}</span>
                        <p className="text-body-secondary">{voo.cidadeSaida}</p>
                    </div>
                    <div className="w-100">
                        <span className="fw-bold" title={voo.nomeAeroportoChegada}
                              style={{cursor: "pointer"}}>{voo.siglaAeroportoChegada}</span>
                        <p className="text-body-secondary">{voo.cidadeChegada}</p>
                    </div>
                </div>

                <div className="d-sm-flex justify-content-between mt-4">
                    <p className="d-flex flex-column text-body-secondary "><span
                        className="fw-bold">
                        <img width="28" height="28" src="https://img.icons8.com/fluency/48/company.png" alt="company"/>
                        Empresa</span> {voo.nomeEmpresa}</p>
                    <p className="d-flex flex-column text-body-secondary align-items-center"><span
                        className="fw-bold">
                        <img width="28" height="28" src="https://img.icons8.com/emoji/48/airplane-emoji.png" alt="airplane-emoji"/>
                        Voo</span> {voo.numero}</p>
                    <p className="d-flex flex-column text-body-secondary align-items-center"><span
                        className="fw-bold">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1"/>
                        Partida</span> {voo.hora_partida}</p>
                    <p className="d-flex flex-column text-body-secondary align-items-center"><span
                        className="fw-bold">
                        <img width="25" height="25" src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1"/>
                        Duração</span> {voo.duracao}</p>

                </div>
            </div>

            <div className="w-100 border-start p-5" style={{maxWidth:400}}>
                <div className="w-100  d-sm-flex flex-column align-items-end">
                    <p>Preço por Adulto</p>
                    <p className="fs-5 fw-bold">R$ {(voo.preco - (voo.preco * voo.desconto) / 100).toFixed(2)}</p>
                    <Link href={`/compra/addPassageiros/${voo.id}`} className="btn btn-success w-100">Comprar</Link>
                </div>
            </div>

        </div>
    );
}

export default CardVoos;