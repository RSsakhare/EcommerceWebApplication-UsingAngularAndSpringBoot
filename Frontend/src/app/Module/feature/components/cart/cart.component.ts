import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartItemComponent } from "../../../shared/component/cart-item/cart-item.component";
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CartService } from '../../../../State/Cart/cart.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItemComponent,MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart=[1,1,1];
  cartItems:any;

  constructor(private router: Router,
    private cartService:CartService,
  private store:Store<AppState>) {

  }

  ngOnInit(){
    this.cartService.getCart()

    this.store.pipe(select((store)=>store.cart)).
            subscribe((cart)=>{
              this.cartItems = cart?.cartItems;
              console.log("cart store ", cart.cartItems)
    });
  }

  navigateToCheckOut() {
    this.router.navigate(['checkout']);
  }
}
