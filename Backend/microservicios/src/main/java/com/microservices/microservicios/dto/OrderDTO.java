package com.microservices.microservicios.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private LocalDateTime createdAt;
    private BigDecimal subtotal;
    private BigDecimal discount;
    private BigDecimal total;
    private String customerName;
    private String customerLastName;
    private String shippingAddress;
    private String shippingApartment;
    private String shippingRegion;
    private String shippingCommune;
    private String shippingNotes;
    private List<OrderItemDTO> items;
}
