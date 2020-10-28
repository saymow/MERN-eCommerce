import { CartState } from "./cart";
import { OrderDetailsState, OrderlistState, OrderState } from "./order";
import { ProductListState, SingleProductState } from "./product";
import {
  UserDeletedState,
  UserListState,
  UserState,
  UserUpdateAsAdminState,
} from "./user";

export interface TState {
  productList: ProductListState;
  productDetails: SingleProductState;
  cart: CartState;
  userLogin: UserState;
  userRegister: UserState;
  userDetails: UserState;
  userUpdateProfile: UserState & { success: true };
  userList: UserListState;
  userDelete: UserDeletedState;
  userUpdate: UserUpdateAsAdminState;
  orderCreate: OrderState;
  orderDetails: OrderDetailsState;
  orderPay: DefaultApiCall;
  orderMyList: OrderlistState;
}

export interface DefaultApiCall {
  error?: ApiError;
  loading?: boolean;
}

export interface ApiError {
  message: string;
}
