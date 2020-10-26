import { ApiError, DefaultApiCall } from ".";

export interface OrderState extends DefaultApiCall {
  success?: boolean;
  order?: any;
}

export type OrderActions =
  | {
      type: "ORDER_CREATE_REQUEST";
    }
  | {
      type: "ORDER_CREATE_SUCCESS";
      payload: any;
    }
  | {
      type: "ORDER_CREATE_FAIL";
      payload: ApiError;
    };
