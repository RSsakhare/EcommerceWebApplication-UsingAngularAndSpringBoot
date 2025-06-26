import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule,
     MatIconModule,
    MatButtonModule,
    MatMenuModule,
   
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: any;

  constructor(private router: Router) { }

   navigate() {
    this.router.navigate([`/product-details/${this.product.id}`]);
  }
}
