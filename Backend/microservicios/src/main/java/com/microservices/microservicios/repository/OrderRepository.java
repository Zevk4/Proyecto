package com.microservices.microservicios.repository;

import com.microservices.microservicios.model.Order;
import com.microservices.microservicios.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
}