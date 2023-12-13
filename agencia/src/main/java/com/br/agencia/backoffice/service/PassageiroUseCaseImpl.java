package com.br.agencia.backoffice.service;

import com.br.agencia.backoffice.controller.passageiro.dto.PassageiroDto;
import com.br.agencia.backoffice.model.Passageiro;
import com.br.agencia.backoffice.model.usuario.Usuario;
import com.br.agencia.backoffice.ports.PassageiroUseCase;
import com.br.agencia.backoffice.repository.PassageiroRepository;
import com.br.agencia.backoffice.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PassageiroUseCaseImpl implements PassageiroUseCase {

    private final PassageiroRepository passageiroRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public PassageiroDto save(PassageiroDto passageiroDto) {
        Usuario usuario = usuarioRepository.findById(passageiroDto.getIdUsuario()).get();

        Passageiro passageiro = Passageiro.builder()
                .usuario(usuario)
                .cpf(passageiroDto.getCpf())
                .nome(passageiroDto.getNome())
                .dataNascimento(passageiroDto.getDataNascimento())
                .sexo(passageiroDto.getSexo())
                .cep(passageiroDto.getCep())
                .endereco(passageiroDto.getEndereco())
                .numero(passageiroDto.getNumero())
                .cidade(passageiroDto.getCidade())
                .estado(passageiroDto.getEstado())
                .build();

        Passageiro saved = passageiroRepository.save(passageiro);

        return PassageiroDto.to(saved);
    }

    @Override
    public PassageiroDto update(Long id, PassageiroDto passageiroDto) {
        Passageiro passageiroSelecionado = passageiroRepository.findById(id).get();

        Passageiro passageiro = Passageiro.builder()
                .id(passageiroSelecionado.getId())
                .usuario(passageiroSelecionado.getUsuario())
                .cpf(passageiroDto.getCpf())
                .nome(passageiroDto.getNome())
                .dataNascimento(passageiroDto.getDataNascimento())
                .sexo(passageiroDto.getSexo())
                .cep(passageiroDto.getCep())
                .endereco(passageiroDto.getEndereco())
                .numero(passageiroDto.getNumero())
                .cidade(passageiroDto.getCidade())
                .estado(passageiroDto.getEstado())
                .build();

        Passageiro saved = passageiroRepository.save(passageiro);

        return PassageiroDto.to(saved);
    }

    @Override
    public List<PassageiroDto> get() {
        return passageiroRepository.findAll()
                .stream()
                .map(PassageiroDto::to)
                .collect(Collectors.toList());
    }

    @Override
    public PassageiroDto get(Long id) {
        return passageiroRepository.findById(id)
                .stream()
                .map(PassageiroDto::to)
                .findFirst()
                .orElseThrow();
    }

    @Override
    public void delete(Long id) {
        passageiroRepository.deleteById(id);
    }
}
