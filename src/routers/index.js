import React from "react";
import { createBrowserRouter } from "react-router-dom";

import SignUpForm from "../components/SignUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";
import ProtectedRouted from "../routers/ProtectedRoute";
import PropertyForm from "../components/admin/PropertyForm";
import DashboardPage from "../pages/Dashboardpage";
import {
  SIGN_UP,
  ADMIN_DASHBOARD,
  USER_DASHBOARD,
  EDIT_PROPERTIES,
  ADD_NEW_PROPERTY,
  PROPERTY_DETAILS,
  FAVORITES_PAGE,
} from "./routes";
import ProductDetailPage from "../pages/ProductDetailPage";
import FavoritesPage from "../pages/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <SignInForm />,
  },
  {
    path: SIGN_UP,
    element: <SignUpForm />,
  },
  {
    path: ADMIN_DASHBOARD,
    element: (
      <ProtectedRouted allowedRoles={["Admin", "User"]}>
        <DashboardPage />
      </ProtectedRouted>
    ),
  },
  {
    path: EDIT_PROPERTIES,
    element: (
      <ProtectedRouted allowedRoles={["Admin"]}>
        <PropertyForm isEdit={true} />
      </ProtectedRouted>
    ),
  },
  {
    path: ADD_NEW_PROPERTY,
    element: (
      <ProtectedRouted allowedRoles={["Admin"]}>
        <PropertyForm />
      </ProtectedRouted>
    ),
  },
  {
    path: USER_DASHBOARD,
    element: (
      <ProtectedRouted allowedRoles={["Admin", "User"]}>
        <DashboardPage />
      </ProtectedRouted>
    ),
  },
  {
    path: PROPERTY_DETAILS,
    element: (
      <ProtectedRouted allowedRoles={["User"]}>
        <ProductDetailPage />
      </ProtectedRouted>
    ),
  },
  {
    path: FAVORITES_PAGE,
    element: (
      <ProtectedRouted allowedRoles={["User"]}>
        <FavoritesPage />
      </ProtectedRouted>
    ),
  },
]);
export default router;
