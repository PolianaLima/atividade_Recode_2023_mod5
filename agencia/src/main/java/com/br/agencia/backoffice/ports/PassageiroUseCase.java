package com.br.agencia.backoffice.ports;

import com.br.agencia.backoffice.controller.passageiro.dto.PassageiroDto;

import java.util.List;

public interface PassageiroUseCase {
    PassageiroDto save(PassageiroDto passageiroDto);

    PassageiroDto update(Long id, PassageiroDto passageiroDto);

    List<PassageiroDto> get();

    PassageiroDto get(Long id);

    void delete(Long id);
}
