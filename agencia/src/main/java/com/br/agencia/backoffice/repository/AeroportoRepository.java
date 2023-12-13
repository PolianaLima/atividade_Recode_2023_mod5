package com.br.agencia.backoffice.repository;

import com.br.agencia.backoffice.model.Aeroporto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AeroportoRepository extends JpaRepository<Aeroporto, Long>, PagingAndSortingRepository<Aeroporto, Long> {
}
