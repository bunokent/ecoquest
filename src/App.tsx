import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import Map from "./pages/Map";
import Forest from "./pages/Forest";
import ForestMiniGames from "./pages/ForestMiniGames";
import River from "./pages/River";
import RiverMiniGames from "./pages/RiverMiniGames";
import City from "./pages/City";
import CityMiniGames from "./pages/CityMiniGames";

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
      path: "/city",
      element: <City />,
    },
    {
      path: "/city/mini-games",
      element: <CityMiniGames />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
