package com.br.agencia.backoffice.service;

import com.br.agencia.backoffice.controller.passagem.dto.PassagemDto;
import com.br.agencia.backoffice.model.Passageiro;
import com.br.agencia.backoffice.model.Passagem;
import com.br.agencia.backoffice.model.Voo;
import com.br.agencia.backoffice.model.usuario.Usuario;
import com.br.agencia.backoffice.ports.PassagemUseCase;
import com.br.agencia.backoffice.repository.PassageiroRepository;
import com.br.agencia.backoffice.repository.PassagemRepository;
import com.br.agencia.backoffice.repository.UsuarioRepository;
import com.br.agencia.backoffice.repository.VooRepository;
import com.br.agencia.backoffice.util.GeradorNumeroAutomatico;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PassagemUseCaseImpl implements PassagemUseCase {

    private final UsuarioRepository usuarioRepository;
    private final VooRepository vooRepository;
    private final PassageiroRepository passageiroRepository;

    private final PassagemRepository passagemRepository;


    @Override
    public PassagemDto save(PassagemDto passagemDto) {

        Integer bilhete = GeradorNumeroAutomatico.gerarNumeroAleatorio(2,20000);

        Usuario usuario = usuarioRepository.findById(passagemDto.getIdUsuario()).get();
        Voo voo = vooRepository.findById(passagemDto.getIdVoo()).get();
        Passageiro passageiro = passageiroRepository.findById(passagemDto.getIdPassageiro()).get();

        Passagem passagem = Passagem.builder()
                .usuario(usuario)
                .voo(voo)
                .passageiro(passageiro)
                .bilhete(bilhete)
                .build();

        Passagem saved = passagemRepository.save(passagem);

        return PassagemDto.to(saved);
    }

    @Override
    public PassagemDto update(Long id, PassagemDto passagemDto) {

        Usuario usuario = usuarioRepository.findById(passagemDto.getIdUsuario()).get();
        Voo voo = vooRepository.findById(passagemDto.getIdVoo()).get();
        Passageiro passageiro = passageiroRepository.findById(passagemDto.getIdPassageiro()).get();

        Passagem passagemSelecionada = passagemRepository.findById(id).get();

        Passagem passagem = Passagem.builder()
                .id(passagemSelecionada.getId())
                .usuario(usuario)
                .voo(voo)
                .passageiro(passageiro)
                .bilhete(passagemSelecionada.getBilhete())
                .build();

        Passagem saved = passagemRepository.save(passagem);
        return PassagemDto.to(passagem);
    }

    @Override
    public List<PassagemDto> get() {
        return passagemRepository.findAll()
                .stream()
                .map(PassagemDto::to)
                .collect(Collectors.toList());
    }

    @Override
    public PassagemDto get(Long id) {
        return passagemRepository.findById(id)
                .stream()
                .map(PassagemDto::to)
                .findFirst()
                .orElseThrow();
    }

    @Override
    public List<PassagemDto> getByUsuario(Long id) {
        return passagemRepository.findByUsuarioId(id)
                .stream()
                .map(PassagemDto::to)
                .collect(Collectors.toList());
    }


    @Override
    public void delete(Long id) {
        passagemRepository.deleteById(id);
    }
}
