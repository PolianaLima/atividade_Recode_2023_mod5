package com.br.agencia.backoffice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@EqualsAndHashCode
@Entity
@Table(name = "voos")
public class Voo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer numero;

    @ManyToOne
    @JoinColumn(name = "id_empresa", referencedColumnName = "id", nullable = false)
    private  EmpresaAerea empresaAerea;

    @ManyToOne
    @JoinColumn(name = "id_aeroporto_partida", nullable = false)
    private  Aeroporto aeroportoPartida;

    @ManyToOne
    @JoinColumn(name = "id_aeroporto_chegada", nullable = false)
    private Aeroporto aeroportoChegada;

    @Column(name="data_partida", nullable = false)
    private LocalDate dataPartida;

    @Column(name="hora_partida", nullable = false)
    private LocalTime horaPartida;

    @Column(nullable = false)
    private LocalTime duracao;

    @Column(name = "total_assentos", nullable = false)
    private Integer totalAssentos;

    @Column(nullable = false)
    private Double preco;

    private Double desconto;

}
