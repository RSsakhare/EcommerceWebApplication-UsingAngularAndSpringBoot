import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home-product-card',
  imports: [CommonModule,
     MatIconModule,
    MatButtonModule,
    MatMenuModule,
    
  ],
  templateUrl: './home-product-card.component.html',
  styleUrl: './home-product-card.component.css'
})
export class HomeProductCardComponent {

  @Input() product: any;
}
