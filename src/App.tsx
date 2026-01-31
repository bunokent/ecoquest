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
import Beach from "./pages/Beach";
import BeachMiniGames from "./pages/BeachMiniGames";
import School from "./pages/School";
import SchoolMiniGames from "./pages/SchoolMiniGames";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/start",
      element: <ProtectedRoute element={<Start />} requireAuth={false} />,
    },
    {
      path: "/map",
      element: <ProtectedRoute element={<Map />} requireAuth={true} />,
    },
    {
      path: "/forest",
      element: <ProtectedRoute element={<Forest />} requireAuth={true} />,
    },
    {
      path: "/forest/mini-games",
      element: (
        <ProtectedRoute element={<ForestMiniGames />} requireAuth={true} />
      ),
    },
    {
      path: "/river",
      element: (
        <ProtectedRoute
          element={<River />}
          requireAuth={true}
          requiredProgress={2}
        />
      ),
    },
    {
      path: "/river/mini-games",
      element: (
        <ProtectedRoute
          element={<RiverMiniGames />}
          requireAuth={true}
          requiredProgress={2}
        />
      ),
    },
    {
      path: "/city",
      element: (
        <ProtectedRoute
          element={<City />}
          requireAuth={true}
          requiredProgress={3}
        />
      ),
    },
    {
      path: "/city/mini-games",
      element: (
        <ProtectedRoute
          element={<CityMiniGames />}
          requireAuth={true}
          requiredProgress={3}
        />
      ),
    },
    {
      path: "/beach",
      element: (
        <ProtectedRoute
          element={<Beach />}
          requireAuth={true}
          requiredProgress={5}
        />
      ),
    },
    {
      path: "/beach/mini-games",
      element: (
        <ProtectedRoute
          element={<BeachMiniGames />}
          requireAuth={true}
          requiredProgress={5}
        />
      ),
    },
    {
      path: "/school",
      element: (
        <ProtectedRoute
          element={<School />}
          requireAuth={true}
          requiredProgress={4}
        />
      ),
    },
    {
      path: "/school/mini-games",
      element: (
        <ProtectedRoute
          element={<SchoolMiniGames />}
          requireAuth={true}
          requiredProgress={4}
        />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
