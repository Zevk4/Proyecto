package com.microservices.microservicios.service;

import com.microservices.microservicios.dto.CartItemDTO;
import com.microservices.microservicios.dto.OrderDTO;
import com.microservices.microservicios.dto.OrderItemDTO;
import com.microservices.microservicios.dto.requests.CheckoutRequestDTO;
import com.microservices.microservicios.model.Order;
import com.microservices.microservicios.model.OrderItem;
import com.microservices.microservicios.model.Product;
import com.microservices.microservicios.model.User;
import com.microservices.microservicios.repository.OrderRepository;
import com.microservices.microservicios.repository.ProductRepository;
import com.microservices.microservicios.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    public OrderDTO createOrder(String email, CheckoutRequestDTO checkoutRequest) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<CartItemDTO> cartItems = cartService.getCartByUser(email);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        Order order = new Order();
        order.setUser(user);

        // Copiar información de envío desde el DTO
        order.setCustomerName(checkoutRequest.getCustomerName());
        order.setCustomerLastName(checkoutRequest.getCustomerLastName());
        order.setShippingAddress(checkoutRequest.getShippingAddress());
        order.setShippingApartment(checkoutRequest.getShippingApartment());
        order.setShippingRegion(checkoutRequest.getShippingRegion());
        order.setShippingCommune(checkoutRequest.getShippingCommune());
        order.setShippingNotes(checkoutRequest.getShippingNotes());

        // Crear OrderItems y calcular subtotal
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CartItemDTO cartItemDto : cartItems) {
            Product product = productRepository.findById(cartItemDto.getProduct().getCodigo())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + cartItemDto.getProduct().getNombre()));
            
            BigDecimal priceAtPurchase = product.getPrecio();
            OrderItem orderItem = new OrderItem(null, order, product, cartItemDto.getQuantity(), priceAtPurchase);
            order.addOrderItem(orderItem);

            subtotal = subtotal.add(priceAtPurchase.multiply(BigDecimal.valueOf(cartItemDto.getQuantity())));
        }

        order.setSubtotal(subtotal);

        // Calcular descuento
        BigDecimal discount = BigDecimal.ZERO;
        if (user.getEmail().endsWith("@duocuc.cl")) {
            discount = subtotal.multiply(new BigDecimal("0.20"));
        }
        order.setDiscount(discount);

        // Calcular total
        BigDecimal total = subtotal.subtract(discount);
        order.setTotal(total);

        // Guardar la orden y sus items
        Order savedOrder = orderRepository.save(order);

        // Vaciar el carrito
        cartService.clearCart(email);

        return convertToDTO(savedOrder);
    }

    public List<OrderDTO> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        List<Order> orders = orderRepository.findByUserOrderByCreatedAtDesc(user);
        
        return orders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> itemDTOs = order.getItems().stream().map(item -> new OrderItemDTO(
                item.getProduct().getCodigo(),
                item.getProduct().getNombre(),
                item.getProduct().getImagen(),
                item.getQuantity(),
                item.getPrice()
        )).collect(Collectors.toList());

        return new OrderDTO(
                order.getId(),
                order.getCreatedAt(),
                order.getSubtotal(),
                order.getDiscount(),
                order.getTotal(),
                order.getCustomerName(),
                order.getCustomerLastName(),
                order.getShippingAddress(),
                order.getShippingApartment(),
                order.getShippingRegion(),
                order.getShippingCommune(),
                order.getShippingNotes(),
                itemDTOs
        );
    }
}