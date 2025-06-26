import { Component, Input } from '@angular/core';
import { navigation } from './nav-content';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-content',
  imports: [CommonModule,
   MatIconModule, MatButtonModule, MatMenuModule,
  ],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.css'
})
export class NavContentComponent {

  category: any ;
  @Input() selectedSection: any;

  ngOnInit() {
    this.category = navigation;
  }

  constructor(private router:Router){}

  handleNavigate=(path:any)=>{
    this.router.navigate([path])
  }

}
