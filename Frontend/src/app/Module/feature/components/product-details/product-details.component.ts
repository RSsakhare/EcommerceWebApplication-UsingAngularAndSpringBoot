import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';
import { lehngacholiPage2 } from '../../../../../Data/Saree/lenghaCholiPage2';
import { ProductCardComponent } from '../../../shared/component/product-card/product-card.component';
import { StarRatingComponent } from "../../../shared/component/star-rating/star-rating.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';
import { CartService } from '../../../../State/Cart/cart.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule, ProductReviewCardComponent, MatProgressBarModule, ProductCardComponent, StarRatingComponent,StarRatingComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent {

  selectedSize:any;
  reviews=[1,1,1,1,1];
  relatedProducts:any;
  product:any;
  productId:any;

  constructor(private router: Router, 
    private productService:ProductService,
    private cartService:CartService,
    private store:Store<AppState>,
  private activatedRoute:ActivatedRoute) { }
  
  ngOnInit() {
    this.relatedProducts=lehngacholiPage2;
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.findProductById(id);
    this.productId=id;

     this.store.pipe(select((store)=>store.product)).
        subscribe((product)=>{
          this.product = product?.product;
          console.log("store data ", product.product)
        });
  }

  
  

  handleAddToCart() {

    console.log("selected size",this.selectedSize)

    const data={size:this.selectedSize,productId:this.productId}

    this.cartService.addItemToCart(data)
    this.cartService.getCart()
    this.router.navigate(['cart']);
}

}
