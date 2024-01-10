import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStats } from "../hooks/useAuthStats";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStats();
  if (checkingStatus) {
    return <h3>Loading....</h3>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
