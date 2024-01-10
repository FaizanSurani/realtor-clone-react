import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStats } from "../hooks/useAuthStats";
import Loader from "./Loader";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStats();
  if (checkingStatus) {
    return <Loader />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
