package com.br.agencia.backoffice.service;

import com.br.agencia.backoffice.controller.empresaaerea.dto.EmpresaAereaDto;
import com.br.agencia.backoffice.model.EmpresaAerea;
import com.br.agencia.backoffice.ports.EmpresaAereaUseCase;
import com.br.agencia.backoffice.repository.EmpresaAereaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpresaAereaUseCaseImpl implements EmpresaAereaUseCase {

    private final EmpresaAereaRepository empresaAereaRepository;

    @Override
    public EmpresaAereaDto save(EmpresaAereaDto empresaAereaDto) {
        EmpresaAerea empresaAerea = EmpresaAerea.builder()
                .nome(empresaAereaDto.getNome())
                .cnpj(empresaAereaDto.getCnpj())
                .build();

        EmpresaAerea saved = empresaAereaRepository.save(empresaAerea);

        return EmpresaAereaDto.to(saved);
    }

    @Override
    public EmpresaAereaDto update(Long id, EmpresaAereaDto empresaAereaDto) {
        EmpresaAerea empresaAereaSelecionado = empresaAereaRepository.findById(id).get();

        EmpresaAerea empresaAerea = EmpresaAerea.builder()
                .id(empresaAereaSelecionado.getId())
                .nome(empresaAereaDto.getNome())
                .cnpj(empresaAereaDto.getCnpj())
                .build();

        EmpresaAerea saved = empresaAereaRepository.save(empresaAerea);
        return EmpresaAereaDto.to(saved);
    }

    @Override
    public List<EmpresaAereaDto> get() {
        return empresaAereaRepository.findAll()
                .stream()
                .map(EmpresaAereaDto::to)
                .collect(Collectors.toList());
    }

    @Override
    public Page<EmpresaAereaDto> get(Pageable pageable) {
        return empresaAereaRepository.findAll(pageable)
                .map(EmpresaAereaDto::to);
    }

    @Override
    public EmpresaAereaDto get(Long id) {
        return empresaAereaRepository.findById(id)
                .stream()
                .map(EmpresaAereaDto::to)
                .findFirst()
                .orElseThrow();
    }

    @Override
    public void delete(Long id) {
        empresaAereaRepository.deleteById(id);
    }
}
