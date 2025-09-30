import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { MessagesPage } from "../pages/MessagesPage/MessagesPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { EditMessagePage } from "../pages/EditMessagePage/EditMessagePage";
import { SingleMessagePage } from "../pages/SingleMessagePage/SingleMessagePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/messages",
    element: <MessagesPage />,
    loader: async () => "/messages/type/all", // Du kan också göra redirect i useEffect i MessagesPage
  },

  {
    path: "/messages/type/:type",
    element: <MessagesPage />,
  },
  {
    path: "/messages/id/:messageId",
    element: <SingleMessagePage />,
  },
  {
    path: "/messages/write",
    element: <EditMessagePage />,
  },
]);
