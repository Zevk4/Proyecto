package com.microservices.microservicios.dto.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CheckoutRequestDTO {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    private String customerName;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50, message = "El apellido no puede tener más de 50 caracteres")
    private String customerLastName;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe ser válido")
    private String customerEmail;

    @NotBlank(message = "La dirección de envío es obligatoria")
    @Size(max = 200, message = "La dirección no puede tener más de 200 caracteres")
    private String shippingAddress;

    @Size(max = 50, message = "El departamento no puede tener más de 50 caracteres")
    private String shippingApartment;

    @NotBlank(message = "La región es obligatoria")
    private String shippingRegion;

    @NotBlank(message = "La comuna es obligatoria")
    private String shippingCommune;

    @Size(max = 500, message = "Las notas no pueden tener más de 500 caracteres")
    private String shippingNotes;
}
