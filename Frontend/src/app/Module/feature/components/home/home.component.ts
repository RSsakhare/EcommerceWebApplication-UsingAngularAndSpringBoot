import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { menJeans } from '../../../../../Data/Men/men_jeans';
import { lengha_page1 } from '../../../../../Data/Women/LenghaCholi';
import { gounsPage1 } from '../../../../../Data/Gouns/gouns';
import { kurtaPage1 } from '../../../../../Data/Kurta/kurta';
import { mensShoesPage1 } from '../../../../../Data/shoes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  imports: [CommonModule,
     MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MainCarouselComponent,
    ProductSliderComponent,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
menJeans:any
womenGouns:any
lenghacholi:any
mensKurta:any
mensShoes:any
ngOnInit(){
  this.menJeans=menJeans.slice(0,5)
  this.womenGouns=gounsPage1.slice(0,5)
  this.lenghacholi=lengha_page1.slice(0,5)
  this.mensKurta=kurtaPage1.slice(0,5)
  this.mensShoes=mensShoesPage1.slice(0,5)
}
}