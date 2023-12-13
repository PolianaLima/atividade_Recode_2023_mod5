package com.br.agencia.backoffice.controller.empresaaerea.dto;

import com.br.agencia.backoffice.model.EmpresaAerea;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaAereaDto implements Serializable {
    Long id;

    String nome;

    String cnpj;

    public static EmpresaAereaDto to(EmpresaAerea saved){
        return new EmpresaAereaDto(
                saved.getId(),
                saved.getNome(),
                saved.getCnpj()
        );
    }
}
