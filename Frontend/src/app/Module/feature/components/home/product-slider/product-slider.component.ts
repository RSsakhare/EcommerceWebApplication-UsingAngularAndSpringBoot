import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HomeProductCardComponent } from '../home-product-card/home-product-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product-slider',
  imports: [CommonModule,
     MatIconModule,
    MatButtonModule,
    MatMenuModule,
    HomeProductCardComponent,
   
  ],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent {
@Input() title:any
@Input() products:any
}
