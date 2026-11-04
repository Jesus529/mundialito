package com.mundialpredict.api.service;

import com.mundialpredict.api.entity.Usuario;
import com.mundialpredict.api.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public Map<String, Object> iniciarSesion(String correo, String password) {

        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() ->
                        new IllegalArgumentException("Correo o password incorrectos"));

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new IllegalArgumentException("Correo o password incorrectos");
        }

        String token = jwtService.generarToken(usuario.getCorreo());

        return Map.of(
                "mensaje", "Inicio de sesion exitoso",
                "token", token,
                "tipo", "Bearer",
                "usuario", Map.of(
                        "id", usuario.getId(),
                        "nombre", usuario.getNombre(),
                        "correo", usuario.getCorreo(),
                        "rol", usuario.getRol()
                )
        );
    }
}