import {
  ProductListAction,
  ProductListState,
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
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };
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
