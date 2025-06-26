import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../Auth/auth.reducer';
import { userReducer } from '../User/user.reducer';
import { productReducer } from '../Product/product.reducer';
import { cartReducer } from '../Cart/cart.reducer';
import { orderReducer } from '../Order/order.reducer';

export interface AppState {
  auth: ReturnType<typeof authReducer>;
  user: ReturnType<typeof userReducer>;
  product: ReturnType<typeof productReducer>;
  cart: ReturnType<typeof cartReducer>;
  order: ReturnType<typeof orderReducer>;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  user: userReducer,
  product:productReducer,
  cart:cartReducer,
  order:orderReducer
};
