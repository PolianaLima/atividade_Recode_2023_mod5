package com.br.agencia.backoffice.service;

import com.br.agencia.backoffice.controller.voos.dto.VooDto;
import com.br.agencia.backoffice.model.Aeroporto;
import com.br.agencia.backoffice.model.EmpresaAerea;
import com.br.agencia.backoffice.model.Voo;
import com.br.agencia.backoffice.ports.VooUseCase;
import com.br.agencia.backoffice.repository.AeroportoRepository;
import com.br.agencia.backoffice.repository.EmpresaAereaRepository;
import com.br.agencia.backoffice.repository.VooRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.br.agencia.backoffice.util.GeradorNumeroAutomatico.gerarNumeroAleatorio;

@Service
@RequiredArgsConstructor
public class VooUseCaseImpl implements VooUseCase {

    private final VooRepository vooRepository;
    private final EmpresaAereaRepository empresaAereaRepository;
    private final AeroportoRepository aeroportoRepository;


    @Override
    public VooDto save(VooDto vooDto) {

        EmpresaAerea empresaAerea = empresaAereaRepository.findById(vooDto.getIdEmpresa()).get();
        Aeroporto aeroportoPartida = aeroportoRepository.findById(vooDto.getIdAeroportoPartida()).get();
        Aeroporto aeroportoCHegada = aeroportoRepository.findById(vooDto.getIdAeroportoChegada()).get();

       Integer numeroVoo = gerarNumeroAleatorio(1,10000);

        Voo voo = Voo.builder()
                .numero(numeroVoo)
                .empresaAerea(empresaAerea)
                .dataPartida(vooDto.getDataPartida())
                .aeroportoPartida(aeroportoPartida)
                .aeroportoChegada(aeroportoCHegada)
                .horaPartida(vooDto.getHoraPartida())
                .duracao(vooDto.getDuracao())
                .totalAssentos(vooDto.getTotalAssentos())
                .preco(vooDto.getPreco())
                .desconto(vooDto.getDesconto())
                .build();

        Voo saved = vooRepository.save(voo);
        return VooDto.to(saved);
    }

    @Override
    public VooDto update(Long id, VooDto vooDto) {
        EmpresaAerea empresaAerea = empresaAereaRepository.findById(vooDto.getIdEmpresa()).get();
        Aeroporto aeroportoPartida = aeroportoRepository.findById(vooDto.getIdAeroportoPartida()).get();
        Aeroporto aeroportoCHegada = aeroportoRepository.findById(vooDto.getIdAeroportoChegada()).get();

        Voo vooSelecionado = vooRepository.findById(id).get();

        Voo voo = Voo.builder()
                .id(vooSelecionado.getId())
                .numero(vooSelecionado.getNumero())
                .empresaAerea(empresaAerea)
                .dataPartida(vooDto.getDataPartida())
                .aeroportoPartida(aeroportoPartida)
                .aeroportoChegada(aeroportoCHegada)
                .horaPartida(vooDto.getHoraPartida())
                .duracao(vooDto.getDuracao())
                .totalAssentos(vooDto.getTotalAssentos())
                .preco(vooDto.getPreco())
                .desconto(vooDto.getDesconto())
                .build();

        Voo saved = vooRepository.save(voo);
        return VooDto.to(saved);
    }

    @Override
    public List<VooDto> get() {
        return vooRepository.findAll()
                .stream()
                .map(VooDto::to)
                .collect(Collectors.toList());
    }

    @Override
    public Page<VooDto> get(Pageable pageable) {
        return vooRepository.findAll(pageable)
                .map(VooDto::to);
    }

    @Override
    public VooDto get(Long id) {
        return vooRepository.findById(id)
                .stream()
                .map(VooDto::to)
                .findFirst()
                .orElseThrow();
    }

    @Override
    public void delete(Long id) {
        vooRepository.deleteById(id);
    }

}
