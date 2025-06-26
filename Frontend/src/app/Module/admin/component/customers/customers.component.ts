import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Customer {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-customers',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  ngOnInit() {
    // Example: Fetch customers from API here
    // For now, using static data for demonstration
    this.customers = [
      { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
    ];
  }

  editCustomer(customer: Customer) {
    // Implement edit logic here
    alert('Edit customer: ' + customer.name);
  }

  deleteCustomer(customer: Customer) {
    // Implement delete logic here
    if (confirm(`Are you sure you want to delete "${customer.name}"?`)) {
      this.customers = this.customers.filter(c => c !== customer);
    }
  }
}