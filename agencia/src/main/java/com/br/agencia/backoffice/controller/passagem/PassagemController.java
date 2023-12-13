package com.br.agencia.backoffice.controller.passagem;

import com.br.agencia.backoffice.controller.passagem.dto.PassagemDto;
import com.br.agencia.backoffice.model.usuario.Usuario;
import com.br.agencia.backoffice.ports.PassagemUseCase;
import com.br.agencia.backoffice.util.GeradorNumeroAutomatico;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class PassagemController {

    private final PassagemUseCase passagemUseCase;
    @GetMapping("/passagens")
    public List<PassagemDto> getAllPassagens(){
        return passagemUseCase.get();
    }

    @GetMapping("/passagens/{id}")
    public PassagemDto getPassagemId(@PathVariable  Long id){
        return passagemUseCase.get(id);
    }

    @GetMapping("/passagemusuario/{id}")
    public List<PassagemDto> getPassagemIdUsuario(@PathVariable  Long id){
        return passagemUseCase.getByUsuario(id);
    }

    @PostMapping("/passagens")
    public PassagemDto createPassagem(@RequestBody PassagemDto passagemDto){

        return passagemUseCase.save(passagemDto);
    }

    @PutMapping("/passagens/{id}")
    public PassagemDto update(@PathVariable Long id, @RequestBody PassagemDto passagemDto){
        return passagemUseCase.update(id, passagemDto);
    }

    @DeleteMapping("/passagens/{id}")
    public void delete(@PathVariable Long id){
        passagemUseCase.delete(id);
    }
}
