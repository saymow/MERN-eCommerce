export interface CartProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export type CartAction =
  | {
      type: "CART_ADD_ITEM";
      payload: CartProduct;
    }
  | { type: "CART_REMOVE_ITEM"; payload: { _id: string } };

export interface CartState {
  cartItems: CartProduct[];
}
