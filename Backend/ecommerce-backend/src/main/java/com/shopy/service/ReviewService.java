package com.shopy.service;

import java.util.List;

import com.shopy.exception.ProductException;
import com.shopy.model.Review;
import com.shopy.model.User;
import com.shopy.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req, User user) throws ProductException;
	
	public List<Review> getAllReview(Long productId);
}
