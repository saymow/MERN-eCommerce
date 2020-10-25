import { CartState } from "./cart";
import { ProductListState, SingleProductState } from "./product";
import { UserState } from "./user";

export interface TState {
  productList: ProductListState;
  productDetails: SingleProductState;
  cart: CartState;
  userLogin: UserState;
  userRegister: UserState;
  userDetails: UserState;
  userUpdateProfile: UserState & { success: true };
}

export interface DefaultApiCall {
  error?: ApiError;
  loading?: boolean;
}

export interface ApiError {
  message: string;
}
