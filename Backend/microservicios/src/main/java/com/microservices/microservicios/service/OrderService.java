package com.microservices.microservicios.service;

import com.microservices.microservicios.dto.CartItemDTO;
import com.microservices.microservicios.model.Order;
import com.microservices.microservicios.model.User;
import com.microservices.microservicios.repository.OrderRepository;
import com.microservices.microservicios.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService; // <--- Inyectamos tu servicio de carrito

    public void createOrder(String email) {
        // 1. Obtener usuario
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Obtener los items actuales del carrito
        List<CartItemDTO> cartItems = cartService.getCartByUser(email);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        // 3. Calcular el total
        BigDecimal total = cartItems.stream()
                .map(CartItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. Crear y Guardar la Orden
        Order order = new Order();
        order.setUser(user);
        order.setTotal(total);
        orderRepository.save(order);

        // 5. ¡AQUÍ ESTÁ LA SOLUCIÓN! Vaciar el carrito
        cartService.clearCart(email);
    }
}