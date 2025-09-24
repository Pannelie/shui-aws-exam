import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

export default function App() {
  return (
    <section className="app">
      <RouterProvider router={router} />
    </section>
  );
}
