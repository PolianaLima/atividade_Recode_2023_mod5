package com.br.agencia.backoffice.repository;

import com.br.agencia.backoffice.model.Voo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VooRepository extends JpaRepository<Voo, Long>, PagingAndSortingRepository<Voo, Long> {
}
