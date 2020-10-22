import { CartAction, CartState } from "../@types/redux/cart";

export const cartReducer = (
  state: CartState = { cartItems: [] },
  action: CartAction
): CartState => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;

      const existItem = state.cartItems.find(
        (product) => product._id === item._id
      );

      if (existItem) {
        const newCartItems = state.cartItems.map((product) =>
          product._id === item._id ? item : product
        );

        return {
          ...state,
          cartItems: newCartItems,
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    case "CART_REMOVE_ITEM":
      const newCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      return {
        ...state,
        cartItems: newCartItems,
      };

    default:
      return state;
  }
};
