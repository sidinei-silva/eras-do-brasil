import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { HomePage } from "./pages/home/Home.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
