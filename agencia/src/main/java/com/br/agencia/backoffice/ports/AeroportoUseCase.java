package com.br.agencia.backoffice.ports;

import com.br.agencia.backoffice.controller.aeroporto.dto.AeroportoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AeroportoUseCase {
    AeroportoDto save(AeroportoDto aeroportoDto);

    AeroportoDto update(Long id, AeroportoDto aeroportoDto);

    List<AeroportoDto> get();

    Page<AeroportoDto> get(Pageable pageable);

    AeroportoDto get(Long id);

    void delete(Long id);

}
