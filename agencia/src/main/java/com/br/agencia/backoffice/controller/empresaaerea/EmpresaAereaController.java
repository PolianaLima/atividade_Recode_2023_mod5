package com.br.agencia.backoffice.controller.empresaaerea;

import com.br.agencia.backoffice.controller.empresaaerea.dto.EmpresaAereaDto;
import com.br.agencia.backoffice.ports.EmpresaAereaUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class EmpresaAereaController {
    private final EmpresaAereaUseCase empresaAereaUseCase;

    @GetMapping("/empresasaereasLista")
    public List<EmpresaAereaDto> getAllEmpresasAereas(){
        return empresaAereaUseCase.get();
    }


    @GetMapping("/empresasaereas")
    public Page<EmpresaAereaDto> getAllEmpresasAereas(Pageable pageable){
        return empresaAereaUseCase.get(pageable);
    }

    @GetMapping("/empresasaereas/{id}")
    public EmpresaAereaDto getEmpresaAereaId(@PathVariable Long id){
        return empresaAereaUseCase.get(id);
    }


    @PostMapping("/empresasaereas")
    public EmpresaAereaDto createEmpresaAerea(@RequestBody EmpresaAereaDto empresaAereaDto){
        return empresaAereaUseCase.save(empresaAereaDto);
    }

    @PutMapping("/empresasaereas/{id}")
    public EmpresaAereaDto updateEmpresaAerea(@PathVariable Long id, @RequestBody EmpresaAereaDto empresaAereaDto){
        return empresaAereaUseCase.update(id, empresaAereaDto);
    }

    @DeleteMapping("/empresasaereas/{id}")
    public void  deleteEmpresaAerea(@PathVariable Long id){
        empresaAereaUseCase.delete(id);
    }
}
