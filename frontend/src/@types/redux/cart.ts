export interface CartProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface ShippingAddress {
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export type PaymentMethods = "PayPal" | "Stripe";

export type CartAction =
  | {
      type: "CART_ADD_ITEM";
      payload: CartProduct;
    }
  | { type: "CART_REMOVE_ITEM"; payload: { _id: string } }
  | {
      type: "CART_SAVE_SHIPPING_ADDRESS";
      payload: ShippingAddress;
    }
  | { type: "CART_SAVE_PAYMENT_METHOD"; payload: { method: PaymentMethods } };

export interface CartState {
  cartItems: CartProduct[];
  shippingAddress?: ShippingAddress;
  paymentMethod?: {
    method: PaymentMethods;
  };
}
