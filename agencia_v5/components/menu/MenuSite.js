import Image from "next/image";
import Link from "next/link";
import React from "react";
import {useAuth} from "@/context/authContext";
import MenuSiteBackOffice from "@/components/menu/MenuSiteBackOffice";

function MenuSite(props) {

    const {token, user, logout} = useAuth();
    return (
        <menu className="container-fluid mt-0 bg-app">
            <nav className=" container navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand text-light me-5 d-flex flex-row align-items-end"
                        href="/"
                    >
                        <Image width={60} height={60} src="/img/logo.png" alt="Logo empresa"/>
                        <p>FÉRIAS & LAZER</p>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" href="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" href="/destino">
                                    Destino
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" href="/promocoes">
                                    Promoções
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" href="/contato">
                                    Contato
                                </Link>
                            </li>
                        </ul>

                        <div className="nav-item ">
                            <img
                                width="60"
                                height="60"
                                src="https://img.icons8.com/fluency/96/000000/user-male-circle--v2.png"
                                alt="user-male-circle--v2"
                            />

                            <li className="nav-item dropdown  list">


                                {token != null && user.role === "USER" ? (
                                    <>
                                        <div className="nav-link link-light dropdown-toggle fs-5" href="#"
                                              role="button" data-bs-toggle="dropdown"
                                              aria-expanded="false">
                                            {user.nome}
                                        </div>
                                        <ul className="dropdown-menu">
                                            <Link href="/usuario/perfil" className="dropdown-item">Meu Perfil</Link>
                                            <button className="dropdown-item" onClick={logout}>
                                                Sair
                                            </button>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <Link className="nav-link link-light dropdown-toggle fs-5" href="#"
                                              role="button" data-bs-toggle="dropdown"
                                              aria-expanded="false">
                                            Iniciar Sessao
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href="/login">Cliente</Link></li>
                                            <li><Link className="dropdown-item" href="/backoffice">Admin</Link></li>
                                        </ul>
                                    </>
                                )}


                            </li>

                        </div>
                    </div>
                </div>
            </nav>
        </menu>
    );
}

export default MenuSite;
