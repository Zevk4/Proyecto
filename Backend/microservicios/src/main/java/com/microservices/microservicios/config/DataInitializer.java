package com.microservices.microservicios.config;

import com.microservices.microservicios.enums.UserRole;
import com.microservices.microservicios.model.User;
import com.microservices.microservicios.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@levelup.cl";
            
            // Verificamos si ya existe para no duplicarlo
            if (!userRepository.existsByEmail(adminEmail)) {
                User admin = new User();
                admin.setNombre("Admin");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("12345678")); 
                admin.setRole(UserRole.ADMIN); 

                userRepository.save(admin);
                System.out.println(" Usuario ADMIN creado automáticamente: " + adminEmail);
            }
        };
    }
}