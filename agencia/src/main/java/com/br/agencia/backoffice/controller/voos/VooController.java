package com.br.agencia.backoffice.controller.voos;

import com.br.agencia.backoffice.controller.voos.dto.VooDto;
import com.br.agencia.backoffice.ports.VooUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class VooController {
    private final VooUseCase vooUseCase;
    @GetMapping("/voos")
    public Page<VooDto>getAllVoos(Pageable pageable){
        return vooUseCase.get(pageable);
    }

    @GetMapping("/voosLista")
    public List<VooDto>getAllVoos(){
        return vooUseCase.get();
    }

    @GetMapping("/voos/{id}")
    public VooDto getVoosId(@PathVariable Long id){
        return vooUseCase.get(id);
    }

    @PostMapping("/voos")
    public VooDto createVoo(@RequestBody VooDto vooDto){
        return vooUseCase.save(vooDto);
    }

    @PutMapping("/voos/{id}")
    public VooDto updateVoo(@PathVariable Long id, @RequestBody VooDto vooDto){
        return vooUseCase.update(id, vooDto);
    }

    @DeleteMapping("/voos/{id}")
    public void deleteVoo(@PathVariable Long id){
        vooUseCase.delete(id);
    }

}
