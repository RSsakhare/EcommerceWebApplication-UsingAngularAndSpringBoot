import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './Module/shared/component/navbar/navbar.component';
import { ProductsComponent } from './Module/feature/components/products/products.component';
import { FooterComponent } from './Module/shared/component/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './State/User/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from './Models/AppState';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CartService } from './State/Cart/cart.service';



@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,
     MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NavbarComponent,
    //ProductsComponent,
    FooterComponent,
    

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce';

  userProfile:any;

   constructor(private router:Router, private dialog : MatDialog,
    private userService:UserService,
    private store: Store<AppState>,
    private cartService:CartService,
  ){}

  ngOnInit(){
      if(localStorage.getItem("jwt")) 
        { this.userService.getUserProfile()
          this.cartService.getCart()}
  
      this.store.pipe(select((store)=>store.auth)).subscribe((user)=>{
          this.userService.getUserProfile()
          this.cartService.getCart()
          console.log("store",user)
      })
  }
}

