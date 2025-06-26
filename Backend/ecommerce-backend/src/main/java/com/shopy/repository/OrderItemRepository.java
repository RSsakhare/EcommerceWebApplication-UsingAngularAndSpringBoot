package com.shopy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopy.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

	
}
