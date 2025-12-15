package com.microservices.microservicios.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private String productCodigo;
    private String productName;
    private String productImagen;
    private int quantity;
    private BigDecimal price;
}
