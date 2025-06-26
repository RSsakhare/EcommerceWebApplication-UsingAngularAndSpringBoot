package com.shopy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopy.exception.CartItemException;
import com.shopy.exception.UserException;
import com.shopy.model.CartItem;
import com.shopy.model.User;
import com.shopy.response.ApiResponse;
import com.shopy.service.CartItemService;
import com.shopy.service.UserService;

@RestController
@RequestMapping("/cart_item")
public class CartItemController {

	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private UserService userService;
	
	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItemId,
			@RequestHeader("Authorization") String jwt) throws UserException, CartItemException{
		
		User user = userService.findUserProfileByJwt(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);
		
		ApiResponse res = new ApiResponse();
		res.setMessage("delete item from cart");
		res.setStatus(true);
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	
	@PutMapping("/{cartItemId}")
	public ResponseEntity<ApiResponse> updateCartItemQuantity(
	        @PathVariable Long cartItemId,
	        @RequestHeader("Authorization") String jwt,
	        @RequestParam CartItem quantity) throws UserException, CartItemException {

	    User user = userService.findUserProfileByJwt(jwt);
	    cartItemService.updateCartItem(user.getId(), cartItemId, quantity);

	    ApiResponse res = new ApiResponse("Cart item updated successfully", true);
	    return new ResponseEntity<>(res, HttpStatus.OK);
	}

}
