package com.br.agencia.backoffice.service;

import com.br.agencia.backoffice.controller.aeroporto.dto.AeroportoDto;
import com.br.agencia.backoffice.model.Aeroporto;
import com.br.agencia.backoffice.ports.AeroportoUseCase;
import com.br.agencia.backoffice.repository.AeroportoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AeroportoUseCaseImpl implements AeroportoUseCase {

    private final AeroportoRepository aeroportoRepository;

    @Override
    public AeroportoDto save(AeroportoDto aeroportoDto) {
        Aeroporto aeroporto = Aeroporto.builder()
                .nome(aeroportoDto.getNome())
                .sigla(aeroportoDto.getSigla())
                .codigo(aeroportoDto.getCodigo())
                .cidade(aeroportoDto.getCidade())
                .estado(aeroportoDto.getEstado())
                .build();

        Aeroporto saved = aeroportoRepository.save(aeroporto);

        return AeroportoDto.to(saved);
    }

    @Override
    public AeroportoDto update(Long id, AeroportoDto aeroportoDto) {
        Aeroporto aeroportoSelecionado = aeroportoRepository.findById(id).get();

        Aeroporto aeroporto = Aeroporto.builder()
                .id(aeroportoSelecionado.getId())
                .nome(aeroportoDto.getNome())
                .sigla(aeroportoDto.getSigla())
                .codigo(aeroportoDto.getCodigo())
                .cidade(aeroportoDto.getCidade())
                .estado(aeroportoDto.getEstado())
                .build();

        Aeroporto saved = aeroportoRepository.save(aeroporto);
        return AeroportoDto.to(saved);
    }

    @Override
    public List<AeroportoDto> get() {
        return aeroportoRepository.findAll()
                .stream()
                .map(AeroportoDto::to)
                .collect(Collectors.toList());
    }

    @Override
    public Page<AeroportoDto> get(Pageable pageable) {
        return aeroportoRepository.findAll(pageable)
                .map(AeroportoDto::to);
    }

    @Override
    public AeroportoDto get(Long id) {
        return aeroportoRepository.findById(id)
                .stream()
                .map(AeroportoDto::to)
                .findFirst()
                .orElseThrow();
    }

    @Override
    public void delete(Long id) {
        aeroportoRepository.deleteById(id);
    }
}
