import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Module/feature/components/home/home.component';
import { ProductsComponent } from './Module/feature/components/products/products.component';
import { CartComponent } from './Module/feature/components/cart/cart.component';
import { ProductDetailsComponent } from './Module/feature/components/product-details/product-details.component';
import { CheckoutComponent } from './Module/feature/components/checkout/checkout.component';
import { PaymentComponent } from './Module/feature/components/payment/payment.component';
import { PaymentSuccessComponent } from './Module/feature/components/payment-success/payment-success.component';
import { OrderComponent } from './Module/feature/components/order/order.component';
import { OrderDetailsComponent } from './Module/feature/components/order-details/order-details.component';
import { AdminComponent } from './Module/admin/admin.component';
import { DashboardComponent } from './Module/admin/component/dashboard/dashboard.component';
import { AdminProductsComponent } from './Module/admin/component/admin-products/admin-products.component';
import { OrdersTableComponent } from './Module/admin/component/orders-table/orders-table.component';
import { CustomersComponent } from './Module/admin/component/customers/customers.component';
import { CreateProductComponent } from './Module/admin/component/create-product/create-product.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"product",component:ProductsComponent},
    {path:"cart",component:CartComponent},
    {path:"product-details/:id",component:ProductDetailsComponent},
    {path:"checkout",component:CheckoutComponent},
    {path:"checkout/payment/:id",component:PaymentComponent},
    {path:"payment-success",component:PaymentSuccessComponent},
    {path:':lavelOne/:lavelTwo/:lavelThree',component:ProductsComponent},
    {path:"account/orders",component:OrderComponent},
    {path:"order/:id",component:OrderDetailsComponent},
    {path:"admin",component:AdminComponent,
      children:[{path:"admin-dashboard",component:DashboardComponent},
        {path:"products",component:AdminProductsComponent},
        {path:"orders",component:OrdersTableComponent},
        {path:"customers",component:CustomersComponent},
        {path:"create-product",component:CreateProductComponent}
      ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }