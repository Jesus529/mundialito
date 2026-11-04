package com.mundialpredict.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class InicioController {

    @GetMapping("/api")
    public Map<String, String> inicio() {
        return Map.of(
            "proyecto", "MundialPredict",
            "mensaje", "API funcionando correctamente",
            "estado", "OK"
        );
    }
}