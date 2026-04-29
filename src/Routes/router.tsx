import { createBrowserRouter, Navigate } from "react-router-dom";
import { Splash } from "../pages/app/Splash/SplashScreen";
import { Login } from "../pages/auth/Login/Login";
import { Categories } from "../pages/app/Categories/Categories";
import { Actions } from "../pages/app/Actions/Actions";
import { NotFound } from "../pages/404/NotFound";
import { MainLayout } from "../components/MainLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Register } from "../pages/auth/Register/Register";
import { ForgotPassword } from "../pages/auth/Forgot Password/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword/ResetPassword";
import Sentimento from "../pages/app/Categories/Sentimento/Sentimento";
import Diversao from "../pages/app/Categories/Diversao/Diversao";

export const router = createBrowserRouter([
  { path: "/", element: <Splash /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },

  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="categories" replace /> },
          { path: "categories", element: <Categories /> },
          { path: "categories/:categoryId/actions", element: <Actions /> },
          { path: "categories/sentimento/actions", element: <Sentimento /> },
          { path: "categories/diversao/actions", element: <Diversao /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);