import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
    {
      title: 'Products',
      text: 'Manage all products in your store.',
      link: '/admin/products',
      bgClass: 'text-bg-primary'
    },
    {
      title: 'Customers',
      text: 'View and manage your customers.',
      link: '/admin/customers',
      bgClass: 'text-bg-success'
    },
    {
      title: 'Orders',
      text: 'Track and manage orders.',
      link: '/admin/orders',
      bgClass: 'text-bg-warning'
    }
  ];
}
