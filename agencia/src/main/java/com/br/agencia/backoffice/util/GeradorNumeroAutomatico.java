package com.br.agencia.backoffice.util;

import java.util.Random;

public class GeradorNumeroAutomatico {
    public static int gerarNumeroAleatorio(int minimo, int maximo){
        if (minimo >= maximo) {
            throw new IllegalArgumentException("O valor mínimo deve ser menor que o valor máximo.");
        }

        Random random = new Random();
        // A fórmula abaixo gera um número aleatório entre minimo (incluindo) e maximo (excluindo).
        return random.nextInt(maximo - minimo) + minimo;
    }
}
