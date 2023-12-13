import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

function MenuSiteBackOffice(props) {
  const { logout, user } = useAuth();
  return (
    <div className="container-fluid bg-primary">
      <nav className="container navbar navbar-expand-lg justify-content-between">
        <Link href="/backoffice/dashboard">
          <Image
            src="/img/logo.png"
            alt="Logo empresa"
            width={80}
            height={80}
          />
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
