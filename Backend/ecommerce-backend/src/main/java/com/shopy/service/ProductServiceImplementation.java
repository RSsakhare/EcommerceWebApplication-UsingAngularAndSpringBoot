package com.shopy.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shopy.exception.ProductException;
import com.shopy.model.Category;
import com.shopy.model.Product;
import com.shopy.repository.CategoryRepository;
import com.shopy.repository.ProductRepository;
import com.shopy.request.CreateProductRequest;

@Service
@SuppressWarnings("unused")
public class ProductServiceImplementation implements ProductService{

	private ProductRepository productRepository;
	private UserService userService;
	private CategoryRepository categoryRepository;
	
	public ProductServiceImplementation(ProductRepository productRepository,UserService userService,
			CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
		this.productRepository = productRepository;
		this.userService = userService;
	}
	
	
	@Override
	public Product createProduct(CreateProductRequest req) {

		Category topLevel = categoryRepository.findByName(req.getTopLevelCategory());
		
		if(topLevel==null) {
			Category topLevelCategory = new Category();
			topLevelCategory.setName(req.getTopLevelCategory());
			topLevelCategory.setLevel(1);
			
			topLevel = categoryRepository.save(topLevelCategory);
			
		}
		
		Category secondLevel = categoryRepository.
				findByNameAndParent(req.getSecondLevelCategory(), topLevel.getName());
		if(secondLevel==null) {
			
			Category secondLevelCategory = new Category();
			secondLevelCategory.setName(req.getSecondLevelCategory());
			secondLevelCategory.setParentCategory(topLevel);
			secondLevelCategory.setLevel(2);
			
			secondLevel = categoryRepository.save(secondLevelCategory);
		}
		
		Category thirdLevel = categoryRepository.findByNameAndParent(req.getThirdLevelCategory(),
				secondLevel.getName());
		if(thirdLevel==null) {
			Category thirdLevelCategory = new Category();
			thirdLevelCategory.setName(req.getThirdLevelCategory());
			thirdLevelCategory.setParentCategory(secondLevel);
			thirdLevelCategory.setLevel(3);
			
			thirdLevel = categoryRepository.save(thirdLevelCategory);
		}
		
		Product product = new Product();
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setDescription(req.getDescription());
		product.setDiscountedPrice(req.getDiscountedPrice());
		product.setDiscountPersent(req.getDiscountPersent());
		product.setImageUrl(req.getImageUrl());
		product.setBrand(req.getBrand());
		product.setPrice(req.getPrice());
		product.setSizes(req.getSize());
		product.setQuantity(req.getQuantity());
		product.setCategory(thirdLevel);
		product.setCreatedAt(LocalDateTime.now());
		
		Product savedProduct = productRepository.save(product);
		
		return savedProduct;
	}

	@Override
	public String deleteProduct(Long productId) throws ProductException {
		Product product = findProductById(productId);
		product.getSizes().clear();
		productRepository.delete(product);
		return "Product deleted Successfully";
	}

	@Override
	public Product updateProduct(Long productId, Product req) throws ProductException {
		Product product = findProductById(productId);
		if(req.getQuantity()!=0) {
			product.setQuantity(req.getQuantity());
		}
		
		
		return productRepository.save(product);
	}

	@Override
	public Product findProductById(Long id) throws ProductException {
		Optional<Product> opt = productRepository.findById(id);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		
		throw new ProductException("Product not found with id-"+id);
	}

	@Override
	public List<Product> findProductByCategory(String category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Product> getAllProduct(String category, List<String> colors, List<String> sizes, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
		
		Pageable pageble = PageRequest.of(pageNumber, pageSize);
		List<Product> products = productRepository.filterProducts(category, minPrice, maxPrice, minDiscount, sort);
		
		if(colors.isEmpty()) {
			products = products.stream().filter(p->colors.stream().anyMatch(c->c.equalsIgnoreCase(p.getColor())))
					.collect(Collectors.toList());
		}
		if(stock!=null) {
			if(stock.equals("in_stock")){
				products = products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
			}
			else if(stock.equals("out_of_stock")) {
				products = products.stream().filter(p->p.getQuantity()<1).collect(Collectors.toList());
			}
		}
		
		int startIndex = (int) pageble.getOffset();
		int endIndex = Math.min(startIndex+pageble.getPageSize(),products.size());
		
		List<Product> pageContent = products.subList(startIndex, endIndex);
		
		Page<Product> filteredProducts = new PageImpl<>(pageContent,pageble,products.size());
		
		return filteredProducts;
	}


	@Override
	public List<Product> findAllProducts() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}


}
