package com.mundialpredict.api.config;

import com.mundialpredict.api.entity.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class AdminPasswordInitializer implements ApplicationRunner {

    private static final Logger logger =
            LoggerFactory.getLogger(AdminPasswordInitializer.class);

    @PersistenceContext
    private EntityManager entityManager;

    private final PasswordEncoder passwordEncoder;

    public AdminPasswordInitializer(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {

        String nuevaPassword = System.getenv("ADMIN_INITIAL_PASSWORD");

        if (nuevaPassword == null || nuevaPassword.isBlank()) {
            logger.info("No se solicitó actualizar las contraseñas de administradores.");
            return;
        }

        List<Usuario> administradores = entityManager.createQuery(
                "SELECT u FROM Usuario u WHERE UPPER(u.rol) = 'ADMIN'",
                Usuario.class
        ).getResultList();

        if (administradores.isEmpty()) {
            logger.warn("No se encontraron usuarios con rol ADMIN.");
            return;
        }

        String passwordCifrada = passwordEncoder.encode(nuevaPassword);

        for (Usuario admin : administradores) {
            admin.setPassword(passwordCifrada);
        }

        entityManager.flush();

        logger.info(
                "Contraseña actualizada para {} cuenta(s) ADMIN.",
                administradores.size()
        );
    }
}