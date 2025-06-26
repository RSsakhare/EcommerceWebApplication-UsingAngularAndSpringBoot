import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BASE_API_URL } from '../../config/api';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { createPaymentFailure, createPaymentSuccess, updatePaymentFailure, updatePaymentSuccess } from './payment.action';


@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private API_BASE_URL = BASE_API_URL;
  private isBrowser: boolean;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.isBrowser ? localStorage.getItem('jwt') : '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  createPayment(orderId: any) {
    if (!this.isBrowser) return;
    const url = `${this.API_BASE_URL}/api/payments/${orderId}`;
    const headers = this.getAuthHeaders();

    this.http
      .post(url, {}, { headers })
      .pipe(
        map((data: any) => { 
            console.log("created payment link",data);
            if(data.payment_link_url){
                window.location.href = data.payment_link_url;
            }
            return createPaymentSuccess({ payload: data })
    }),
        catchError((error: any) =>
          of(
            createPaymentFailure(
              error.response?.data?.message || error.message
            )
          )
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updatePayment(reqData: any) {
    if (!this.isBrowser) return;
    const url = `${this.API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}
    &order_id=${reqData.orderId}`;
    const headers = this.getAuthHeaders();

    this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => { 
            console.log("update payment ",data);
            if(data.payment_link_url){
                window.location.href = data.payment_link_url;
            }
            return updatePaymentSuccess({ payload: data })
    }),
        catchError((error: any) =>
          of(
            updatePaymentFailure(
              error.response?.data?.message || error.message
            )
          )
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

}