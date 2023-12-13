package com.br.agencia.backoffice.repository;

import com.br.agencia.backoffice.model.EmpresaAerea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaAereaRepository extends JpaRepository<EmpresaAerea, Long>, PagingAndSortingRepository<EmpresaAerea, Long> {
}
