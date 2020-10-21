import {
  ProductListAction,
  SingleProductAction,
} from "../@types/redux/product";
import api from "../services/api";

export const listProducts = () => async (
  dispatch: (arg0: ProductListAction) => void
) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    const { data } = await api.get("/products");

    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};

export const getSingleProduct = (id: string) => async (
  dispatch: (arg0: SingleProductAction) => void
) => {
  try {
    dispatch({
      type: "SINGLE_PRODUCT_REQUEST",
    });

    const { data } = await api.get(`products/${id}`);

    dispatch({
      type: "SINGLE_PRODUCT_SUCCESS",
      payload: { product: data },
    });
  } catch (err) {
    dispatch({
      type: "SINGLE_PRODUCT_FAIL",
      payload: {
        message: err.response.data.message
          ? err.response.data.message
          : err.message,
      },
    });
  }
};
