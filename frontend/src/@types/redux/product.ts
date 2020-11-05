import { ApiError, DefaultApiCall } from ".";
import { ProductType } from "../cart";

export interface SingleProductState extends DefaultApiCall {
  product?: ProductType;
}

export type SingleProductAction =
  | { type: "SINGLE_PRODUCT_REQUEST" }
  | { type: "SINGLE_PRODUCT_SUCCESS"; payload: { product: ProductType } }
  | { type: "SINGLE_PRODUCT_FAIL"; payload: ApiError };

export interface ProductListState extends DefaultApiCall {
  products: ProductType[];
  pages?: number;
  page?: number;
}

export type ProductListAction =
  | {
      type: "PRODUCT_LIST_REQUEST";
    }
  | {
      type: "PRODUCT_LIST_SUCCESS";
      payload: {
        products: ProductType[];
        page: number;
        pages: number;
      };
    }
  | { type: "PRODUCT_LIST_FAIL"; payload: ApiError };

export type ProductDeleteAction =
  | {
      type: "PRODUCT_DELETE_REQUEST";
    }
  | { type: "PRODUCT_DELETE_SUCCESS" }
  | { type: "PRODUCT_DELETE_FAIL"; payload: ApiError };

export type ProductCreateAction =
  | {
      type: "PRODUCT_CREATE_REQUEST";
    }
  | { type: "PRODUCT_CREATE_SUCCESS"; payload: ProductType }
  | { type: "PRODUCT_CREATE_FAIL"; payload: ApiError }
  | { type: "PRODUCT_CREATE_RESET" };

export interface ProductCreateState extends DefaultApiCall {
  success?: boolean;
  product?: ProductType;
}

export type ProductUpdateAction =
  | {
      type: "PRODUCT_UPDATE_REQUEST";
    }
  | { type: "PRODUCT_UPDATE_SUCCESS"; payload: ProductType }
  | { type: "PRODUCT_UPDATE_FAIL"; payload: ApiError }
  | { type: "PRODUCT_UPDATE_RESET" };

export type ProductCreateReviewAction =
  | {
      type: "PRODUCT_CREATE_REVIEW_REQUEST";
    }
  | { type: "PRODUCT_CREATE_REVIEW_SUCCESS" }
  | { type: "PRODUCT_CREATE_REVIEW_FAIL"; payload: ApiError }
  | { type: "PRODUCT_CREATE_REVIEW_RESET" };

export type ProductTopsAction =
  | {
      type: "PRODUCT_TOP_REQUEST";
    }
  | { type: "PRODUCT_TOP_SUCCESS"; payload: ProductType[] }
  | { type: "PRODUCT_TOP_FAIL"; payload: ApiError };

export interface ProductUpdateState extends DefaultApiCall {
  success?: boolean;
  product?: ProductType;
}
