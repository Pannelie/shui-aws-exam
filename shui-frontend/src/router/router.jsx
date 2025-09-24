import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { MyMessagesPage } from "../pages/MyMessagesPage/MyMessagesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/messages",
    element: <MyMessagesPage />,
  },
]);
