import { ApiError } from ".";
import { ProductType } from "../cart";

interface DefaultApiCall {
  error?: ApiError;
  loading: boolean;
}

export interface SingleProductState extends DefaultApiCall {
  product?: ProductType;
}

export type SingleProductAction =
  | { type: "SINGLE_PRODUCT_REQUEST" }
  | { type: "SINGLE_PRODUCT_SUCCESS"; payload: { product: ProductType } }
  | { type: "SINGLE_PRODUCT_FAIL"; payload: ApiError };

export interface ProductListState extends DefaultApiCall {
  products: ProductType[];
}

export type ProductListAction =
  | {
      type: "PRODUCT_LIST_REQUEST";
    }
  | { type: "PRODUCT_LIST_SUCCESS"; payload: ProductType[] }
  | { type: "PRODUCT_LIST_FAIL"; payload: ApiError };
