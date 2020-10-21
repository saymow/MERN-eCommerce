import { ProductListState, SingleProductState } from "./product";

export interface TState {
  productList: ProductListState;
  productDetails: SingleProductState;
}

export interface ApiError {
  message: string;
}
