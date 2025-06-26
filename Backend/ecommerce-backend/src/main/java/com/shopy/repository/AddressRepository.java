package com.shopy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopy.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

}
