import { Component } from '@angular/core';
import { OrderService } from '../../../../State/Order/order.service';
import { PaymentService } from '../../../../State/Payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from "../../../shared/component/address-card/address-card.component";

@Component({
  selector: 'app-payment-success',
  imports: [CommonModule, AddressCardComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
 
  orderId: any;
  paymentId:any;
  order:any;

  constructor(
    private orderService:OrderService,
    private paymentService:PaymentService,
    private route:ActivatedRoute,
    private store:Store<AppState>
  ){}

  ngOnInit(){
    this.route.queryParams.subscribe((params)=>{
      this.orderId = params["order_id"]
      this.paymentId = params["razorpay_payment_id"]
    })
    this.orderService.getOrderById(this.orderId);
    const reqData={
       orderId:this.orderId,
      paymentId:this.paymentId,
    }
    this.paymentService.updatePayment(reqData)

    this.store.pipe(select(store=>store.order)).subscribe((order)=>{
      this.order=order.order
    })
  }

}
