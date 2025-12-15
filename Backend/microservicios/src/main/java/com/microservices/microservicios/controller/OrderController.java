package com.microservices.microservicios.controller;

import com.microservices.microservicios.dto.OrderDTO;
import com.microservices.microservicios.dto.requests.CheckoutRequestDTO;
import com.microservices.microservicios.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<OrderDTO> createOrder(Authentication authentication, @Valid @RequestBody CheckoutRequestDTO checkoutRequest) {
        String email = authentication.getName(); // Obtenemos el email del token
        OrderDTO newOrder = orderService.createOrder(email, checkoutRequest);
        return ResponseEntity.ok(newOrder);
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getUserOrders(Authentication authentication) {
        String email = authentication.getName();
        List<OrderDTO> orders = orderService.getOrdersByUser(email);
        return ResponseEntity.ok(orders);
    }
}