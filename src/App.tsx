import { useEffect, useRef } from "react";
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
import BackgroundMusic from "./assets/musics/bgmusic.mp3";
import ButtonClickMusic from "./assets/musics/buttonclick.mp3";

function App() {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const isButton = target?.closest("button, a, [role='button']");

      if (isButton && clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        void clickAudioRef.current.play();
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

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
  return (
    <>
      <audio src={BackgroundMusic} autoPlay loop />
      <audio ref={clickAudioRef} src={ButtonClickMusic} preload="auto" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
