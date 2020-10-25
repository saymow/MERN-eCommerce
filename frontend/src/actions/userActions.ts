import {
  UserDetailsAction,
  UserLoginAction,
  UserRegisterAction,
  User,
  UserUpdateAction,
  UpdateUser,
} from "../@types/redux/user";
import api from "../services/api";

export const login = (email: string, password: string) => async (
  dispatch: (arg0: UserLoginAction) => void
) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.post(
      "/users/login",
      { email, password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const register = (
  name: string,
  email: string,
  password: string
) => async (dispatch: (arg0: UserRegisterAction | UserLoginAction) => void) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.post(
      "/users",
      { name, email, password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};
export const userDetails = (id?: string) => async (
  dispatch: (arg0: UserDetailsAction | UserLoginAction) => void,
  getState: any
) => {
  try {
    dispatch({ type: "USER_DETAILS_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.get(`/users/${id ? id : ""}`, config);

    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "USER_DETAILS_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const updateUserProfile = (user: UpdateUser) => async (
  dispatch: (arg0: UserUpdateAction | UserLoginAction) => void,
  getState: any
) => {
  try {
    dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put(
      "/users",
      {
        ...user,
        id: undefined,
      },
      config
    );

    console.log(data);

    dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: data });
  } catch (err) {
    console.error(err.response.data);

    dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload: { message: err?.response?.data?.message || err.message },
    });
  }
};

export const logout = () => async (
  dispatch: (arg0: UserLoginAction) => void
) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: "USER_LOGOUT" });
};
