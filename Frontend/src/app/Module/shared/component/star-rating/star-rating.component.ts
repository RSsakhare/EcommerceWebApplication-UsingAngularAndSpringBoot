import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule,MatIconModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  maxRating: number = 5;
  initialRating: number = 3;

  stars:any;
  currentRating:number = 0;
rating: any;

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
    this.currentRating = this.initialRating || 0;
  }

  rate(rating: number) {
    this.currentRating = rating
  }
}
