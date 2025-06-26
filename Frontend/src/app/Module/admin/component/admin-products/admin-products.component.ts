import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-admin-products',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];

  ngOnInit() {
    // Example: Fetch products from API here
    // For now, using static data for demonstration
    this.products = [
      {
        name: 'Sample Product 1',
        description: 'Description 1',
        price: 100,
        category: 'Category 1',
        imageUrl: 'https://via.placeholder.com/60'
      },
      {
        name: 'Sample Product 2',
        description: 'Description 2',
        price: 200,
        category: 'Category 2',
        imageUrl: 'https://via.placeholder.com/60'
      }
    ];
  }

  editProduct(product: Product) {
    // Implement edit logic here
    alert('Edit product: ' + product.name);
  }

  deleteProduct(product: Product) {
    // Implement delete logic here
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.products = this.products.filter(p => p !== product);
    }
  }
}