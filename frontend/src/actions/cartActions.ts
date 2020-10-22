import { CartAction } from "../@types/redux/cart";
import api from "../services/api";

export const addToCart = (id: string, qty: number) => async (
  dispatch: (arg0: CartAction) => void,
  getState: any
) => {
  try {
    const { data } = await api.get(`products/${id}`);

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {}
};

export const removeFromCart = (id: string) => async (
  dispatch: (arg0: CartAction) => void,
  getState: any
) => {
  dispatch({
    type: "CART_REMOVE_ITEM",
    payload: {
      _id: id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
