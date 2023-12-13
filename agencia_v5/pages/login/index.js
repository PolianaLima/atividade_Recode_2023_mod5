import Head from "next/head";
import {useForm} from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useAuth} from "@/context/authContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {http} from "@/utils/http";

function Login() {

    const {token, login} = useAuth();

    const [error, setError] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const router = useRouter();

    useEffect(() => {
        if (token != null) router.push("/");
    }, [router, token]);

    const onSubmit = (data) => {
        const response = http.post(
            "http://localhost:8080/auth/login",
            data
        )
            .then((response) => {
                if (response.data != null) {
                    login(response.data);
                    const booleanPromise = router.push("/");
                }
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    console.error("Erro na resposta da API:", error.response.data);
                    setError(true);
                } else {
                    console.error("Erro ao enviar dados para a API:", error);
                }
            });
    }


    return (
        <>

            <Head>
                <title>Agencia de Viagems - Login </title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="container">
                <div className="container d-sm-flex align-items-center justify-content-center mt-5 min-heigth">
                    <div className="w-100 d-flex justify-content-end">
                        <Image src="/img/fundo_login.jpg" width={350} height={350} alt="Icone Login"/>
                    </div>
                    <div className="w-100 d-flex flex-column justify-content-start">

                        <h1 className="mb-4 text-center">Login</h1>
                        <p>Ainda não e cadastrado? <Link href="/cadastroUsuario">Cadastre-se agora mesmo</Link></p>
                        <input
                            type="text"
                            className="form-control  mb-4  border-primary"
                            id="login"
                            placeholder="Login"
                            {...register("login", {required: true})}
                        />
                        {errors?.login?.type === "required" && (
                            <p className=" text-danger fw-bold">Login Obrigatório!</p>
                        )}

                        <input
                            type="password"
                            className="form-control mb-4 border-primary"
                            id="senha"
                            placeholder="Senha"
                            {...register("senha", {required: true})}
                        />

                        {errors?.senha?.type === "required" && (
                            <p className=" text-danger fw-bold">Senha Obrigatório!</p>
                        )}

                        {error === true ?  (
                            <p className=" text-danger fw-bold">Usuario ou senha invalida!</p>
                        ):("")}
                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Entrar
                        </button>

                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;
