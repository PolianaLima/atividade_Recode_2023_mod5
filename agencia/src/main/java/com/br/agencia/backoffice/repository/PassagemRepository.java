package com.br.agencia.backoffice.repository;

import com.br.agencia.backoffice.model.Passagem;
import com.br.agencia.backoffice.model.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassagemRepository extends JpaRepository<Passagem, Long> {
    List<Passagem> findByUsuarioId(Long usuarioId);
}
