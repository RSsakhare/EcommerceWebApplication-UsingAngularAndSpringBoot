package com.shopy.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Size {

	private String name;
	private int quantity;
	
	public Size() {
		// TODO Auto-generated constructor stub
	}
	
	public Size(String name, int quantity) {
		super();
		this.name = name;
		this.quantity = quantity;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
