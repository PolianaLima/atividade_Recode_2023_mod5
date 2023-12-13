package com.br.agencia.backoffice.controller.usuario.dto;

import com.br.agencia.backoffice.model.usuario.UsuarioRole;

public record RegisterDto(String nome, String login, String senha,UsuarioRole role) {
}
