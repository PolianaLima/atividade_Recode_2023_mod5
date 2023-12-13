package com.br.agencia.backoffice.controller.aeroporto.dto;

import com.br.agencia.backoffice.model.Aeroporto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AeroportoDto implements Serializable {
    Long id;

    String nome;

    String sigla;

    String codigo;

    String cidade;

    String estado;

    public static AeroportoDto to(Aeroporto saved) {
        return new AeroportoDto(
                saved.getId(),
                saved.getNome(),
                saved.getSigla(),
                saved.getCodigo(),
                saved.getCidade(),
                saved.getEstado()
        );
    }
}
