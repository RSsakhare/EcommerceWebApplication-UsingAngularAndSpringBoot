import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BASE_API_URL } from '../../config/api';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import {
  addItemToCartFailure,
  addItemToCartSuccess,
  getCartFailure,
  getCartSuccess,
  removeCartItemFailure,
  removeCartItemSuccess,
  updateCartItemFailure,
  updateCartItemSuccess,
} from './cart.action';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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

  addItemToCart(reqData: any) {
    if (!this.isBrowser) return;
    const url = `${this.API_BASE_URL}/api/cart/add`;
    const headers = this.getAuthHeaders();

    this.http
      .put(url, reqData, { headers })
      .pipe(
        map((data: any) => addItemToCartSuccess({ payload: data })),
        catchError((error: any) =>
          of(
            addItemToCartFailure(
              error.response?.data?.message || error.message
            )
          )
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getCart() {
    if (!this.isBrowser) return;
    const url = `${this.API_BASE_URL}/api/cart`;
    const headers = this.getAuthHeaders();

    this.http
      .get(url, { headers })
      .pipe(
        map((data: any) => getCartSuccess({ payload: data })),
        catchError((error: any) =>
          of(getCartFailure(error.response?.data?.message || error.message))
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  removeCartItem(cartItemId: number) {
    if (!this.isBrowser) return;
    const url = `${this.API_BASE_URL}/api/cart_items/${cartItemId}`;
    const headers = this.getAuthHeaders();

    this.http
      .delete(url, { headers })
      .pipe(
        map(() => removeCartItemSuccess({ cartItemId })),
        catchError((error: any) =>
          of(removeCartItemFailure(error.response?.data?.message || error.message))
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updateCartItem(reqData: any) {
    if (!this.isBrowser) return;
    const url = `${this.API_BASE_URL}/api/cart_items/${reqData.cartItemId}`;
    const headers = this.getAuthHeaders();

    this.http
      .put(url, reqData.data, { headers })
      .pipe(
        map((data: any) => updateCartItemSuccess({ payload: data })),
        catchError((error: any) =>
          of(updateCartItemFailure(error.response?.data?.message || error.message))
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }
}
