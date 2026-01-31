import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import Map from "./pages/Map";
import Forest from "./pages/Forest";
import ForestMiniGames from "./pages/ForestMiniGames";
import River from "./pages/River";
import RiverMiniGames from "./pages/RiverMiniGames";
import School from "./pages/School";
import SchoolMiniGames from "./pages/SchoolMiniGames";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/start",
      element: <Start />,
    },
    {
      path: "/map",
      element: <Map />,
    },
    {
      path: "/forest",
      element: <Forest />,
    },
    {
      path: "/forest/mini-games",
      element: <ForestMiniGames />,
    },
    {
      path: "/river",
      element: <River />,
    },
    {
      path: "/river/mini-games",
      element: <RiverMiniGames />,
    },
    {
      path: "/school",
      element: <School />,
    },
    {
      path: "/school/mini-games",
      element: <SchoolMiniGames />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
