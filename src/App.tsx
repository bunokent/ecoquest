import { useEffect, useMemo, useRef, useState } from "react";
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
import LoadingBg from "./assets/home/home.svg";

function App() {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const assetUrls = useMemo(() => {
    const assets = import.meta.glob("./assets/**/*", {
      as: "url",
      eager: true,
    }) as Record<string, string>;
    return Object.values(assets);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const total = assetUrls.length || 1;

    const preloadAsset = (url: string) =>
      new Promise<void>((resolve) => {
        const lower = url.toLowerCase();
        if (
          lower.endsWith(".mp3") ||
          lower.endsWith(".wav") ||
          lower.endsWith(".ogg")
        ) {
          const audio = new Audio();
          audio.preload = "auto";
          audio.oncanplaythrough = () => resolve();
          audio.onerror = () => resolve();
          audio.src = url;
          return;
        }

        if (lower.endsWith(".mp4") || lower.endsWith(".webm")) {
          const video = document.createElement("video");
          video.preload = "auto";
          video.onloadeddata = () => resolve();
          video.onerror = () => resolve();
          video.src = url;
          return;
        }

        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      });

    Promise.all(
      assetUrls.map((url) =>
        preloadAsset(url).then(() => {
          if (!cancelled) setLoadedCount((prev) => prev + 1);
        }),
      ),
    ).finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [assetUrls]);

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
  const progress = Math.min(
    100,
    Math.round((loadedCount / assetUrls.length) * 100),
  );

  return (
    <>
      <audio src={BackgroundMusic} autoPlay loop />
      <audio ref={clickAudioRef} src={ButtonClickMusic} preload="auto" />
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <img
            src={LoadingBg}
            aria-hidden={true}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-[85%] left-1/2 -translate-x-1/2 z-10 w-[80%] max-w-xl">
            <div className="h-4 w-full rounded-full bg-white/40 backdrop-blur-sm overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-white font-bold drop-shadow-lg">
              Loading... {progress}%
            </p>
          </div>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
