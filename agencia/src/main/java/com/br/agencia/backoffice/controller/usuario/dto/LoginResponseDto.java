package com.br.agencia.backoffice.controller.usuario.dto;

import com.br.agencia.backoffice.model.usuario.Usuario;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto{
    private String token;
    private Usuario usuario;

    public LoginResponseDto(String token, Usuario usuario) {
        this.token = token;
        this.usuario = usuario;
    }


}
