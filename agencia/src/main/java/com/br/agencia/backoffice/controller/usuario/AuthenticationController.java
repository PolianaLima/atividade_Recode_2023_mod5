package com.br.agencia.backoffice.controller.usuario;

import com.br.agencia.backoffice.controller.usuario.dto.AuthenticationDTO;
import com.br.agencia.backoffice.controller.usuario.dto.LoginResponseDto;
import com.br.agencia.backoffice.controller.usuario.dto.RegisterDto;
import com.br.agencia.backoffice.model.usuario.Usuario;
import com.br.agencia.backoffice.repository.UsuarioRepository;
import com.br.agencia.infra.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Validated AuthenticationDTO data) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);


        var usuario = ((Usuario) auth.getPrincipal());
        var token = tokenService.generateToken(usuario);

        var loginResponseDto = new LoginResponseDto(token, usuario);

        return ResponseEntity.ok(loginResponseDto);
    }

    @PostMapping("/register")
    public ResponseEntity registrer(@RequestBody @Validated RegisterDto data) {
        if (this.usuarioRepository.findByLogin(data.login()) != null) ResponseEntity.ok().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());

        Usuario newUsuario = new Usuario(data.nome(), data.login(), encryptedPassword, data.role());

        this.usuarioRepository.save(newUsuario);

        return ResponseEntity.ok().build();
    }
}
