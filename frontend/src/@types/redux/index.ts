import { CartState } from "./cart";
import { OrderDetailsState, OrderlistState, OrderState } from "./order";
import {
  ProductCreateState,
  ProductListState,
  ProductUpdateState,
  SingleProductState,
} from "./product";
import {
  UserDeletedState,
  UserListState,
  UserState,
  UserUpdateAsAdminState,
} from "./user";

export interface TState {
  productList: ProductListState;
  productDetails: SingleProductState;
  productDelete: DefaultApiCall;
  productCreate: ProductCreateState;
  productUpdate: ProductUpdateState;
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
  orderList: OrderlistState;
  orderDeliver: DefaultApiCall;
}

export interface DefaultApiCall {
  error?: ApiError;
  success?: boolean;
  loading?: boolean;
}

export interface ApiError {
  message: string;
}
