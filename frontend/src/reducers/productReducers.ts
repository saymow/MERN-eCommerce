import { ProductType } from "../@types/cart";
import { DefaultApiCall } from "../@types/redux";
import {
  ProductCreateAction,
  ProductCreateReviewAction,
  ProductCreateState,
  ProductDeleteAction,
  ProductListAction,
  ProductListState,
  ProductTopsAction,
  ProductUpdateAction,
  ProductUpdateState,
  SingleProductAction,
  SingleProductState,
} from "../@types/redux/product";

export const productListReducer = (
  state: ProductListState = { products: [] },
  action: ProductListAction
): ProductListState => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS": {
      const { products, page, pages } = action.payload;

      return { loading: false, products, page, pages };
    }
    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state: SingleProductState = { loading: true },
  action: SingleProductAction
): SingleProductState => {
  switch (action.type) {
    case "SINGLE_PRODUCT_REQUEST":
      return { ...state, loading: true };
    case "SINGLE_PRODUCT_SUCCESS":
      return { loading: false, product: action.payload.product };
    case "SINGLE_PRODUCT_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state: DefaultApiCall & { success?: boolean } = {},
  action: ProductDeleteAction
): DefaultApiCall & { success?: boolean } => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state: ProductCreateState = {},
  action: ProductCreateAction
): ProductCreateState => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };
    case "PRODUCT_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state: ProductUpdateState = {},
  action: ProductUpdateAction
): ProductUpdateState => {
  switch (action.type) {
    case "PRODUCT_UPDATE_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_UPDATE_SUCCESS":
      return { loading: false, success: true, product: action.payload };
    case "PRODUCT_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (
  state: DefaultApiCall = {},
  action: ProductCreateReviewAction
): DefaultApiCall => {
  switch (action.type) {
    case "PRODUCT_CREATE_REVIEW_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_CREATE_REVIEW_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_CREATE_REVIEW_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_CREATE_REVIEW_RESET":
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (
  state: ProductListState = { products: [] },
  action: ProductTopsAction
): ProductListState => {
  switch (action.type) {
    case "PRODUCT_TOP_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_TOP_SUCCESS":
      return { loading: false, success: true, products: action.payload };
    case "PRODUCT_TOP_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
