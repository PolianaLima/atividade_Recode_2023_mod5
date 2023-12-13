package com.br.agencia.backoffice.controller.passageiro.dto;

import com.br.agencia.backoffice.model.Passageiro;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassageiroDto {
     Long id;

    @JsonProperty("id_usuario")
     Long idUsuario;

     String cpf;

     String nome;

    @JsonProperty("data_nascimento")
     LocalDate dataNascimento;

     String sexo;

     String cep;

     String endereco;

     Integer numero;

     String cidade;

     String estado;

    public static PassageiroDto to(Passageiro saved){
        return new PassageiroDto(
                saved.getId(),
                saved.getUsuario().getId(),
                saved.getCpf(),
                saved.getNome(),
                saved.getDataNascimento(),
                saved.getSexo(),
                saved.getCep(),
                saved.getEndereco(),
                saved.getNumero(),
                saved.getCidade(),
                saved.getEstado()
        );
    }
}
