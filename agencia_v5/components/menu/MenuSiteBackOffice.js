import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

function MenuSiteBackOffice(props) {
  const { logout, user } = useAuth();
  return (
    <div className="container-fluid bg-app">
      <nav className="container d-flex p-3 fs-5  justify-content-between align-items-center">

        <Link href="/backoffice/dashboard">
          <Image
            src="/img/logo.png"
            alt="Logo empresa"
            width={80}
            height={80}
          />
        </Link>


        <div className="w-100 ms-5">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cadastro
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/backoffice/aeroporto" className="dropdown-item">
                    Aeroporto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/backoffice/companhia_aerea"
                    className="dropdown-item"
                  >
                    C&A Aerea
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bem vindo(a),
                <br />{user.nome}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Sair
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  );
}

export default MenuSiteBackOffice;
