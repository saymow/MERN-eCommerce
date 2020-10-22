import { CartState } from "./cart";
import { ProductListState, SingleProductState } from "./product";

export interface TState {
  productList: ProductListState;
  productDetails: SingleProductState;
  cart: CartState;
}

export interface DefaultApiCall {
  error?: ApiError;
  loading: boolean;
}

export interface ApiError {
  message: string;
}
