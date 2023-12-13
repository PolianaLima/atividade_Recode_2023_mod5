package com.br.agencia.backoffice.ports;

import com.br.agencia.backoffice.controller.passagem.dto.PassagemDto;
import com.br.agencia.backoffice.model.usuario.Usuario;

import java.util.List;

public interface PassagemUseCase {
    PassagemDto save(PassagemDto passagemDto);

    PassagemDto update(Long id,PassagemDto passagemDto);

    List<PassagemDto> get();

    PassagemDto get(Long id);

    List<PassagemDto> getByUsuario(Long id);

    void delete(Long id);
}
