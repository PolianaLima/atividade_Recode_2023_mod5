package com.br.agencia.backoffice.ports;

import com.br.agencia.backoffice.controller.empresaaerea.dto.EmpresaAereaDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmpresaAereaUseCase {
    EmpresaAereaDto save(EmpresaAereaDto empresaAereaDto);
    EmpresaAereaDto update(Long id, EmpresaAereaDto empresaAereaDto);
    List<EmpresaAereaDto> get();
    Page<EmpresaAereaDto>get(Pageable pageable);

    EmpresaAereaDto get(Long id);

    void delete(Long id);


}
