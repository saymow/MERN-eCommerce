import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { TState } from "../../@types/redux";
import { UserState } from "../../@types/redux/user";

interface RestrictedRouteProps extends RouteProps {
  authenticated?: boolean;
  admin?: boolean;
  fallback: string;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  authenticated = false,
  admin = false,
  fallback,
  ...rest
}) => {
  const { userInfo } = useSelector<TState, UserState>(
    (state) => state.userLogin
  );

  // similar to xnor port;
  // auth && restricted => Route
  // !auth && restricted => Redirect
  // auth && !restricted => Redirect
  // !auth && !restricted => Route
  const ensureAuth = Boolean(userInfo);
  const hasAdminRights = userInfo?.isAdmin;
  const AuthRoute =
    ensureAuth === authenticated ? (
      <Route {...rest} />
    ) : (
      <Redirect to={fallback} />
    );

  return !admin ? (
    AuthRoute
  ) : hasAdminRights ? (
    AuthRoute
  ) : (
    <Redirect to={fallback} />
  );
};

export default RestrictedRoute;
