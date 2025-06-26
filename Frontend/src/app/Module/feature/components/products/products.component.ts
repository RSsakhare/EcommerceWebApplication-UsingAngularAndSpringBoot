import { Component } from '@angular/core';
import { filters, singleFilter } from './FilterData';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../../shared/component/product-card/product-card.component';
import {  MatButtonModule } from '@angular/material/button';
import { mensPantsPage1 } from '../../../../../Data/pants/MensPants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';




@Component({
  selector: 'app-products',
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    ProductCardComponent,
    
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  filterData:any;
  singleFilterData:any;
  menPants:any;
  products: any;
  levelThree: any;


  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private productService: ProductService,
    private store:Store<AppState>
    
  ) {}
    
  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter;
    this.menPants = mensPantsPage1;

    this.activatedRoute.paramMap.subscribe(
      (params)=>{
        this.levelThree=params.get('levelThree')
        var reqData={
          category: params.get("levelThree"),
          colors:[],
          sizes:[],
          minPrice:0,
          maxPrice:10000,
          minDiscount:0,
          pageNumber:0,
          pageSize:10,
          stock:null
        
        };
        this.productService.findProductByCategory(reqData);
      }
    );

    this.activatedRoute.queryParams.subscribe(
      (params)=>{
        const color = params["color"]
        const size = params['size']
        const price = params["price"]
        const discount = params['discount']
        const stock = params["stock"]
        const sort = params['sort']
        const pageNumber = params["pageNumber"]
        const minPrice = price?.split("-")[0];
        const maxPrice = price?.split("-")[1];
        

        var reqData={
          category: this.levelThree,
          colors:color? [color].join(","):[],
          sizes:size,
          minPrice:minPrice?minPrice:0,
          maxPrice:maxPrice?maxPrice:100000,
          minDiscount: discount?discount:0,
          pageNumber:pageNumber?pageNumber:0,
          pageSize:10,
          stock:null,
          sort:sort?sort:"price_low"
        
        };

        this.productService.findProductByCategory(reqData)

      }
    )

    this.store.pipe(select((store)=>store.product)).
    subscribe((product)=>{
      this.products = product?.products?.content;
      console.log("store data ", product.products.content)
    });
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = {...this.activatedRoute.snapshot.queryParams};
    const filterValues = queryParams[sectionId]? queryParams[sectionId].split(',') : [];

    console.log("query Params", queryParams);
    const valueIndex=filterValues.indexOf(value);

    if(valueIndex!=-1){
      filterValues.splice(valueIndex, 1);
    }
    else{
      filterValues.push(value);
    }

    if(filterValues.length>0){
      queryParams[sectionId] = filterValues.join(',');
    }
    else{
      delete queryParams[sectionId];
    }

    this.router.navigate([], {queryParams})

  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = {...this.activatedRoute.snapshot.queryParams};

    if(value){
      queryParams[sectionId] = value;
    }
    else{
      delete queryParams[sectionId];
    }

    this.router.navigate([], {queryParams});
  }

 
}
