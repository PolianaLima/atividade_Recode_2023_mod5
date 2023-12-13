import React, {useEffect, useState} from 'react';
import Head from "next/head";
import {router, useRouter} from "next/router";
import {useAuth} from "@/context/authContext";
import {useForm} from "react-hook-form";
import ButtonFechar from "@/components/ButtonFechar";
import ModalComponent from "@/components/ModalComponent";
import data from "bootstrap/js/src/dom/data";
import {http} from "@/utils/http";
import axios from "axios";
import {getTokenVerify} from "@/pages/api/getTokenVerify";

function Cadastro(props) {

    getTokenVerify();

    const [modalIsOpen, setModaIsOpen] = useState(false);

    const openModal = () =>{
        setModaIsOpen(true);
    }

    const closeModal = () =>{
        setModaIsOpen(false);
        router.push('/backoffice/companhia_aerea')
    }

    const {token} = useAuth();
    const router = useRouter();
    const [status, setStatus] = useState([false])
    const [error, setError] = useState([false])

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    useEffect(() => {
        if (token == null) router.push('/')
    }, [token, router]);


const onSubmit = async (data)=>{
    try {
        await http.post("/empresasaereas", data, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
            .then(response=>{
                setStatus(true)
                reset()
                openModal()
            })
    }catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Erro na resposta da API:', error.response.data);
            setError(true)
        } else {
            console.error('Erro ao enviar dados para a API:', error);
            setError(true)
        }
    }
}

    return (
        <>
            <Head>
                <title>Agencia de Viagems - Cadastro de C&A Aereas </title>
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
                           placeholder="CNPJ"
                           id="cnpj"
                           {...register("cnpj", {required: true})}
                    />
                    {errors?.codigo?.type === "required" && (
                        <p className="text-danger fw-bold">Campo Obrigatorio</p>
                    )}

                    <div>
                        <button className="btn btn-success  pe-5 ps-5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(onSubmit)()
                                }}
                        >Salvar
                        </button>
                    </div>


                    {status === true ? (
                        <ModalComponent isOpen={openModal}>
                            <p>Empresa salva com sucesso</p>
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