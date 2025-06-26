package com.shopy.service;

import java.util.List;

import com.shopy.exception.ProductException;
import com.shopy.model.Rating;
import com.shopy.model.User;
import com.shopy.request.RatingRequest;

public interface RatingService {

	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating> getProductsRating(Long productId);
}
