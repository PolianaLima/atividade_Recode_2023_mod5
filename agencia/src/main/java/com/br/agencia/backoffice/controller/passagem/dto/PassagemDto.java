package com.br.agencia.backoffice.controller.passagem.dto;

import com.br.agencia.backoffice.model.Passagem;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassagemDto {

    Long id;

    @JsonProperty("id_usuario")
    long idUsuario;

    @JsonProperty("id_voo")
    Long idVoo;

    @JsonProperty("id_passageiro")
    Long idPassageiro;

    Integer bilhete;

    public static PassagemDto to(Passagem saved){
        return new PassagemDto(
                saved.getId(),
                saved.getUsuario().getId(),
                saved.getVoo().getId(),
                saved.getPassageiro().getId(),
                saved.getBilhete()
        );
    }
}
