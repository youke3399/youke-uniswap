import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Swap from "../pages/Swap";

export default function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/swap", element: <Swap /> },
  ]);

  return routes;
}
