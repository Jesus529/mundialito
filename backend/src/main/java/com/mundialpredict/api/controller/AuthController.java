package com.mundialpredict.api.controller;

import com.mundialpredict.api.entity.Usuario;
import com.mundialpredict.api.service.AuthService;
import com.mundialpredict.api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final AuthService authService;

    public AuthController(
            UsuarioService usuarioService,
            AuthService authService) {
        this.usuarioService = usuarioService;
        this.authService = authService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@Valid @RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.registrar(usuario);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "mensaje", "Usuario registrado correctamente",
                            "id", nuevoUsuario.getId(),
                            "nombre", nuevoUsuario.getNombre(),
                            "correo", nuevoUsuario.getCorreo()
                    )
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {
        try {
            String correo = datos.get("correo");
            String password = datos.get("password");

            if (correo == null || correo.isBlank()
                    || password == null || password.isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of("error", "Correo y contraseña son obligatorios")
                );
            }

            return ResponseEntity.ok(
                    authService.iniciarSesion(correo, password)
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("error", e.getMessage())
            );
        }
    }
}