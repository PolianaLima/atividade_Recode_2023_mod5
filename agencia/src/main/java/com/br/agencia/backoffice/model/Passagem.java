package com.br.agencia.backoffice.model;

import com.br.agencia.backoffice.model.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "passagens")
public class Passagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "voo_id", referencedColumnName = "id", nullable = false)
    private Voo voo;

    @ManyToOne
    @JoinColumn(name = "passageiro_id", referencedColumnName = "id", nullable = false)
    private Passageiro passageiro;

    private Integer bilhete;
}
