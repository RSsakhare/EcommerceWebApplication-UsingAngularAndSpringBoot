package com.shopy.service;

import com.shopy.exception.UserException;
import com.shopy.model.User;


public interface UserService {

	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
}
