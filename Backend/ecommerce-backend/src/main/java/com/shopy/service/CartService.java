package com.shopy.service;

import com.shopy.exception.ProductException;
import com.shopy.model.Cart;
import com.shopy.model.User;
import com.shopy.request.AddItemRequest;

public interface CartService {

	public Cart createCart(User user);
	
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);
	
	
}
