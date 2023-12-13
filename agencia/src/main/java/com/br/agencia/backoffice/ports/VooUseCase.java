package com.br.agencia.backoffice.ports;

import com.br.agencia.backoffice.controller.voos.dto.VooDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VooUseCase {
    VooDto save(VooDto vooDto);

    VooDto update(Long id, VooDto vooDto);

    List<VooDto> get();

    Page<VooDto> get(Pageable pageable);

    VooDto get(Long id);

    void delete(Long id);

}
