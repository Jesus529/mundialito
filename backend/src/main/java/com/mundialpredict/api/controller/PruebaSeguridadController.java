package com.mundialpredict.api.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class PruebaSeguridadController {

    @GetMapping("/api/privado/prueba")
    public Map<String, Object> probar(Authentication authentication) {
        return Map.of(
                "mensaje", "Acceso autorizado a MundialPredict",
                "usuario", authentication.getName(),
                "estado", "AUTENTICADO"
        );
    }
}