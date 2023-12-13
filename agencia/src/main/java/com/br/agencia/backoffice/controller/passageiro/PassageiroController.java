package com.br.agencia.backoffice.controller.passageiro;

import com.br.agencia.backoffice.controller.passageiro.dto.PassageiroDto;
import com.br.agencia.backoffice.model.Passageiro;
import com.br.agencia.backoffice.ports.PassageiroUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class PassageiroController {

    private final PassageiroUseCase passageiroUseCase;
    @GetMapping("/passageiros")
    List<PassageiroDto> getAllPassageiros(){
        return passageiroUseCase.get();
    }

    @GetMapping("/passageiros/{id}")
    PassageiroDto getPassageiroId(@PathVariable Long id){
        return passageiroUseCase.get(id);
    }

    @PostMapping("/passageiros")
    private PassageiroDto createPassageiro(@RequestBody PassageiroDto passageiroDto){
        return passageiroUseCase.save(passageiroDto);
    }

    @PutMapping("/passageiros/{id}")
    private PassageiroDto updatePassageiro(@PathVariable Long id, @RequestBody PassageiroDto passageiroDto){
        return passageiroUseCase.update(id, passageiroDto);
    }

    @DeleteMapping("/passageiros/{id}")
    private void deletePassageiro(@PathVariable Long id){
        passageiroUseCase.delete(id);
    }
}
