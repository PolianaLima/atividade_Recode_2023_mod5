package com.br.agencia.backoffice.controller.aeroporto;

import com.br.agencia.backoffice.controller.aeroporto.dto.AeroportoDto;
import com.br.agencia.backoffice.ports.AeroportoUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AeroportoController {
    private final AeroportoUseCase aeroportoUseCase;

    @GetMapping("/aeroportoslista")
    public List<AeroportoDto> getAllAeroportos() {
        return aeroportoUseCase.get();
    }

    @GetMapping("/aeroportos")
    public Page<AeroportoDto> getAllAeroportos(Pageable pageable) {
        return aeroportoUseCase.get(pageable);
    }

    @GetMapping("/aeroportos/{id}")
    public AeroportoDto getAeroportoId(@PathVariable Long id){
        return aeroportoUseCase.get(id);
    }

    @PostMapping("/aeroportos")
    public AeroportoDto createAeroporto(@RequestBody AeroportoDto aeroportoDto) {
        return aeroportoUseCase.save(aeroportoDto);
    }

    @PutMapping("/aeroportos/{id}")
    public AeroportoDto updateAeroporto(@PathVariable Long id, @RequestBody AeroportoDto aeroportoDto) {
        return aeroportoUseCase.update(id, aeroportoDto);
    }


    @DeleteMapping("/aeroportos/{id}")
    public void deleteAeroporto(@PathVariable Long id) {
        aeroportoUseCase.delete(id);
    }


}
