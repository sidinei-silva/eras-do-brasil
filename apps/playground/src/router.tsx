import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { CombatPage } from "./pages/combat/Combat.page";
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
      {
        path: "/combate",
        element: <CombatPage />,
      },
    ],
  },
]);
