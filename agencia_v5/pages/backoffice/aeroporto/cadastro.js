import React, {useEffect, useState} from 'react';
import Head from "next/head";
import ButtonFechar from "@/components/ButtonFechar";
import {useAuth} from "@/context/authContext";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import axios from "axios";
import ModalComponent from "@/components/ModalComponent";
import {http} from "@/utils/http";
import {getTokenVerify} from "@/pages/api/getTokenVerify";

function Cadastro(props) {

    getTokenVerify();

    const {token} = useAuth();
    const router = useRouter();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('/backoffice/aeroporto')
    };

    const [status, setStatus] = useState([false])
    const [error, setError] = useState([false])

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();


    const onSubmit = async (data) => {

        try {
            await http.post("/aeroportos", data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setStatus(true)
                    reset()
                    openModal()
                })

        } catch (error) {
            console.error("Erro ao cadastrar aeroporto", error)
            setError(true)
        }
    }

    return (
        <>
            <Head>
                <title>Agencia de Viagems - Cadastro de Aeroporto </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="container">
                <form className="form-control p-5">
                    <ButtonFechar url="/backoffice/aeroporto"/>
                    <input className="form-control mb-3 mt-3"
                           placeholder="Nome"
                           id="nome"
                           {...register("nome", {required: true})}
                    />
                    {errors?.nome?.type === "required" && (
                        <p className="text-danger fw-bold">Campo Obrigatorio</p>
                    )}
                    <input className="form-control mb-3"
                           placeholder="Codigo"
                           id="codigo"
                           {...register("codigo", {required: true})}
                    />
                    {errors?.codigo?.type === "required" && (
                        <p className="text-danger fw-bold">Campo Obrigatorio</p>
                    )}
                    <input className="form-control mb-3"
                           placeholder="Sigla"
                           id="sigla"
                           {...register("sigla", {required: true})}
                    />
                    {errors?.sigla?.type === "required" && (
                        <p className="text-danger fw-bold">Campo Obrigatorio</p>
                    )}
                    <input className="form-control mb-3"
                           placeholder="Cidade"
                           id="cidade"
                           {...register("cidade", {required: true})}
                    />
                    {errors?.cidade?.type === "required" && (
                        <p className="text-danger fw-bold">Campo Obrigatorio</p>
                    )}
                    <input className="form-control mb-3"
                           placeholder="Estado"
                           id="estado"
                           {...register("estado", {required: true})}
                    />
                    {errors?.estado?.type === "required" && (
                        <p className="text-danger fw-bold">Campo Obrigatorio</p>
                    )}

                    <div>
                        <button className="btn btn-success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(onSubmit)()
                                }}
                        >Salvar
                        </button>
                    </div>


                    {status === true ? (
                        <ModalComponent isOpen={openModal}>
                            <p>Aeroporto salvo com sucesso</p>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-success" onClick={closeModal}>OK</button>
                            </div>

                        </ModalComponent>
                    ) : (
                      ""
                    )}

                    {error === true?(
                        <p className="text-danger fw-bold mt-4">Erro ao salvar, verifique os dados e tente novamente!</p>
                    ):("")}

                </form>
            </main>
        </>
    );
}

export default Cadastro;