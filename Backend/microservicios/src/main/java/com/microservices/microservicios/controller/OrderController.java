package com.microservices.microservicios.controller;

import com.microservices.microservicios.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(Authentication authentication) {
        String email = authentication.getName(); // Obtenemos el email del token
        orderService.createOrder(email);
        return ResponseEntity.ok("Orden creada con éxito");
    }
}