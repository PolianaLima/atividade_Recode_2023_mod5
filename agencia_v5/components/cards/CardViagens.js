import React, {useState} from 'react';
import {format, addHours, parseISO, addMinutes} from "date-fns";
import {ht, ptBR} from "date-fns/locale";
import {utcToZonedTime} from "date-fns-tz";
import {useRouter} from "next/router";
import ModalComponent from "@/components/ModalComponent";
import {http} from "@/utils/http";

function CardViagens({passagem, token}) {

    const router = useRouter();

    const dataPartida = parseISO(`${passagem.voo.data_partida}T${passagem.voo.hora_partida}`);
    const fusoHorario = 'America/Sao_Paulo';
    const dataPartidaFusoHorario = utcToZonedTime(dataPartida, fusoHorario);
    const duracaoEmHoras = parseInt(passagem.voo.duracao.split(':')[0], 10); // Horas
    const duracaoEmMinutos = parseInt(passagem.voo.duracao.split(':')[1], 10); // Minutos
    const dataChegada = addMinutes(addHours(dataPartidaFusoHorario, duracaoEmHoras), duracaoEmMinutos);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.reload();
    };

    const handleDeletePassagem = ()=>{
        http.delete(`/passagens/${passagem.id}`, {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }) .then(()=>{
            closeModal();
        })
            .catch((erro)=>{
                console.error("Erro ao exlcuir ",erro );
            })
    }

    return (

        <>
            <div className="d-sm-flex shadow flex-column border p-4 mb-5">
                <div className="d-sm-flex">
                    <img width="48" height="48" className="me-3"
                         src="https://img.icons8.com/emoji/48/airplane-emoji.png"
                         alt="airplane-emoji"/>
                    <div>
                        <h4 className="m-0">Voo para {passagem.voo.destino.cidade}</h4>
                        <p className="text-secondary">Numero da reserva: {passagem.bilhete}</p>
                    </div>
                </div>

                <div className="d-flex">
                    <img width="28" height="28" className="me-3" src="https://img.icons8.com/fluency/48/company.png"
                         alt="company"/>
                    <p className="me-3"> {passagem.empresa.nome} </p>
                    <p> Voo: {passagem.voo.numero}</p>
                </div>
                <hr/>

                <div className="d-sm-flex flex-row justify-content-between">
                    <div className="d-flex flex-column align-items-center justify-content-center p-5">
                    <span
                        className="text-secondary fs-5">
                        {format(dataPartida, "EE, dd 'de' MMM 'de' yyyy", {locale: ptBR})}
                    </span>
                        <h1>{format(dataPartida, "HH:mm")}</h1>
                        <h3 className="text-secondary">{passagem.voo.origem.sigla}</h3>
                        <p className="text-secondary">{passagem.voo.origem.cidade}</p>
                    </div>

                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <span>Duração</span>
                        <p>{passagem.voo.duracao}</p>
                    </div>

                    <div className="d-flex flex-column align-items-center justify-content-center p-5">
                    <span className="text-secondary"> {format(dataChegada, "EE, dd 'de' MMM 'de' yyyy", {locale: ptBR})}
                    </span>
                        <h1> {format(dataChegada, "HH:mm", {locale: ptBR})}</h1>
                        <h3 className="text-secondary">{passagem.voo.destino.sigla}</h3>
                        <p className="text-secondary">{passagem.voo.destino.cidade}</p>
                    </div>


                </div>

                <div className="container-sm d-flex flex-column">
                    <p className="fw-bold mb-0">Dados do passageiro:</p>
                    <p className="m-0">Nome: {passagem.passageiro.nome}</p>
                    <p>CPF: {passagem.passageiro.cpf}</p>
                </div>

                <button className="btn btn-danger w-100" onClick={() => openModal(passagem.id)}>Cancelar Passagem</button>


                <ModalComponent isOpen={modalIsOpen}>
                    <p>Deseja excluir o Voo? </p>
                    <div className="d-flex justify-content-between">

                        <button className="btn  bg-success me-2" onClick={(e) => {
                            e.preventDefault();
                            handleDeletePassagem()
                        }}>CONFIRMAR
                        </button>
                        <button className="btn  btn-danger" onClick={closeModal}>CONCELAR</button>
                    </div>

                </ModalComponent>


            </div>
        </>


    );
}

export default CardViagens;