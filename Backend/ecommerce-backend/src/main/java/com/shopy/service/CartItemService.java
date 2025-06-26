package com.shopy.service;

import com.shopy.exception.CartItemException;
import com.shopy.exception.UserException;
import com.shopy.model.Cart;
import com.shopy.model.CartItem;
import com.shopy.model.Product;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;
	
	public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId );
	
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException,UserException;
	
	public CartItem findCartItemBy(Long cartItemId) throws CartItemException;
	
	
}

