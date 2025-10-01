import { createBrowserRouter, Outlet } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { MessagesPage } from "../pages/MessagesPage/MessagesPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { EditMessagePage } from "../pages/EditMessagePage/EditMessagePage";
import { SingleMessagePage } from "../pages/SingleMessagePage/SingleMessagePage";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";

const RootLayout = () => <Outlet />;

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />, // gemensam felsida för alla child-routes
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/messages", element: <MessagesPage /> },
      { path: "/messages/type/:type", element: <MessagesPage /> },
      { path: "/messages/id/:messageId", element: <SingleMessagePage /> },
      { path: "/messages/write", element: <EditMessagePage /> },
      { path: "*", element: <ErrorPage /> }, // fångar odefinierade routes
    ],
  },
]);
