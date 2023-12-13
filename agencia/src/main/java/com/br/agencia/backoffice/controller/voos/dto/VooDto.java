package com.br.agencia.backoffice.controller.voos.dto;

import com.br.agencia.backoffice.model.Voo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VooDto {
    Long id;

    Integer numero;

    @JsonProperty("id_empresa")
    Long idEmpresa;

    @JsonProperty("id_aeroporto_partida")
    Long idAeroportoPartida;

    @JsonProperty("id_aeroporto_chegada")
    Long idAeroportoChegada;

    @JsonProperty("data_partida")
    LocalDate dataPartida;


    @JsonProperty("hora_partida")
    LocalTime horaPartida;

    LocalTime duracao;

    @JsonProperty("total_assentos")
    Integer totalAssentos;

    Double preco;

    Double desconto;


    public static VooDto to(Voo saved){
        return new VooDto(
                saved.getId(),
                saved.getNumero(),
                saved.getEmpresaAerea().getId(),
                saved.getAeroportoPartida().getId(),
                saved.getAeroportoChegada().getId(),
                saved.getDataPartida(),
                saved.getHoraPartida(),
                saved.getDuracao(),
                saved.getTotalAssentos(),
                saved.getPreco(),
                saved.getDesconto()
        );
    }

}
