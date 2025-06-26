import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Order {
  id: string;
  customer: string;
  date: Date;
  status: string;
  total: number;
}

@Component({
  selector: 'app-orders-table',
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {
  orders: Order[] = [];

  ngOnInit() {
    // Example: Fetch orders from API here
    // For now, using static data for demonstration
    this.orders = [
      {
        id: 'ORD-001',
        customer: 'John Doe',
        date: new Date('2024-06-01'),
        status: 'Pending',
        total: 150.5
      },
      {
        id: 'ORD-002',
        customer: 'Jane Smith',
        date: new Date('2024-06-02'),
        status: 'Completed',
        total: 299.99
      }
    ];
  }

  viewOrder(order: Order) {
    // Implement view logic here
    alert('View order: ' + order.id);
  }

  deleteOrder(order: Order) {
    // Implement delete logic here
    if (confirm(`Are you sure you want to delete order "${order.id}"?`)) {
      this.orders = this.orders.filter(o => o !== order);
    }
  }
}