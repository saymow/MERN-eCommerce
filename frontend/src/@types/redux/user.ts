import { ApiError, DefaultApiCall } from ".";

export interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

export interface UpdateUser {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export type UserLoginAction =
  | { type: "USER_LOGIN_REQUEST" }
  | {
      type: "USER_LOGIN_SUCCESS";
      payload: User;
    }
  | { type: "USER_LOGIN_FAIL"; payload: ApiError }
  | { type: "USER_LOGOUT" };

export type UserDetailsAction =
  | { type: "USER_DETAILS_REQUEST" }
  | {
      type: "USER_DETAILS_SUCCESS";
      payload: User;
    }
  | { type: "USER_DETAILS_FAIL"; payload: ApiError };

export type UserRegisterAction =
  | { type: "USER_REGISTER_REQUEST" }
  | {
      type: "USER_REGISTER_SUCCESS";
      payload: User;
    }
  | { type: "USER_REGISTER_FAIL"; payload: ApiError };

export type UserUpdateAction =
  | { type: "USER_UPDATE_PROFILE_REQUEST" }
  | {
      type: "USER_UPDATE_PROFILE_SUCCESS";
      payload: User;
    }
  | { type: "USER_UPDATE_PROFILE_FAIL"; payload: ApiError }
  | { type: "USER_UPDATE_PROFILE_RESET" };

export interface UserState extends DefaultApiCall {
  userInfo?: User;
}
