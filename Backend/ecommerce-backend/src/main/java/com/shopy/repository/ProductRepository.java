package com.shopy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shopy.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	@Query("SELECT p FROM Product p"+
	" WHERE (p.category.name=:category OR :category='')"+
	"AND ((:minPrice is NULL AND :maxPrice is NULL)OR(p.discountedPrice BETWEEN :minPrice AND :maxPrice))"+
	"AND (:minDiscount is NULL OR p.discountPersent >=:minDiscount)"+
	"ORDER BY "+
	"CASE WHEN :sort= 'price_low' THEN p.discountedPrice END ASC,"+
	"CASE WHEN :sort= 'price_high' THEN p.discountedPrice END DESC"
			)
	public List<Product> filterProducts(@Param("category") String category,
			@Param("minPrice") Integer minPrice,
			@Param("maxPrice") Integer maxPrice,
			@Param("minDiscount") Integer minDiscount,
			@Param("sort") String sort);
	
	
}
