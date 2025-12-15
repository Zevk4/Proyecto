package com.microservices.microservicios.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal subtotal;

    private BigDecimal discount;

    private BigDecimal total;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    // Información del cliente y envío
    private String customerName;
    private String customerLastName;
    private String shippingAddress;
    private String shippingApartment;
    private String shippingRegion;
    private String shippingCommune;
    private String shippingNotes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public void addOrderItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}
