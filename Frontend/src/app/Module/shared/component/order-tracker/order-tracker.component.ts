import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-tracker',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,
    MatIconModule,MatDividerModule,
  ],
  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.css'
})
export class OrderTrackerComponent {

  @Input() activeStep:any;
  @Input() steps:any;

}
