import { createReducer, on } from '@ngrx/store';
// Make sure the file './order.actions.ts' exists in the same folder as this reducer.
// If it does not exist, create it or update the path below to the correct location.
import * as OrderActions from './order.action';


export interface OrderState {
    orders: any[];
    order:any|null;
    loading: boolean;
    error: string | null;
}

export const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    order:null,
};

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.createOrderRequest, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(OrderActions.createOrderSuccess, (state, { order }) => ({
        ...state,
        order,
        loading: false,
    
    })),
    on(OrderActions.createOrderFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
   
     on(OrderActions.getOrderByIdRequest, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(OrderActions.getOrderByIdSuccess, (state, { order }) => ({
        ...state,
        order,
        loading: false,
    
    })),
    on(OrderActions.getOrderByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

     on(OrderActions.getOrderHistoryRequest, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(OrderActions.getOrderHistorySuccess, (state, { orders }) => ({
        ...state,
        orders,
        loading: false,
    
    })),
    on(OrderActions.createOrderFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
);