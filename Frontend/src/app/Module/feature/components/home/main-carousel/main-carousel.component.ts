import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { homeCarouselData } from '../../../../../../Data/mainCarousel';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-main-carousel',
  imports: [CommonModule,
     MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    
  ],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css'
})
export class MainCarouselComponent {
  carouselData:any

  currentSlide=0;
  interval:any;

  ngOnInit(){
    this.carouselData=homeCarouselData;
    this.autoPlay();
  }

  autoPlay(){
    setInterval(()=>{
      this.nextSlide();
    },2000)
  }

  nextSlide(){
    this.currentSlide=(this.currentSlide+1) % this.carouselData.length;

  }
}
