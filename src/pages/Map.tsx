import MapHeader from "../components/MapHeader";
import Background from "../assets/map/map.svg";
import Map1 from "../assets/map/map1.svg";
import Map2 from "../assets/map/map2.svg";
import Map3 from "../assets/map/map3.svg";
import Map4 from "../assets/map/map4.svg";
import Map5 from "../assets/map/map5.svg";
import Map6 from "../assets/map/map6.svg";
import { Link } from "react-router-dom";
import PlayBtn from "../assets/map/playbtn.svg";
import { useState } from "react";

const Map = () => {
  const [play, setPlay] = useState<boolean>(false);
  const progress = 3;

  const maps = {
    1: Map1,
    2: Map2,
    3: Map3,
    4: Map4,
    5: Map5,
    6: Map6,
  };

  const zones = [
    {
      id: 1,
      name: "Forest",
      to: "/forest",
      color: "from-emerald-500/80 to-lime-400/80",
    },
    {
      id: 2,
      name: "River",
      to: "/river",
      color: "from-sky-500/80 to-cyan-400/80",
    },
    {
      id: 3,
      name: "City",
      to: "/city",
      color: "from-slate-600/80 to-zinc-400/80",
    },
    {
      id: 4,
      name: "School",
      to: "/school",
      color: "from-amber-500/80 to-yellow-300/80",
    },
    {
      id: 5,
      name: "Beach",
      to: "/beach",
      color: "from-orange-400/80 to-amber-300/80",
    },
  ];

  return (
    <div className="relative w-screen min-h-screen ">
      <div className="fixed inset-0 -z-10">
        <img
          src={Background}
          aria-hidden={true}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <MapHeader />
      </div>
      <div>
        <div className="absolute top-0 left-0 w-full z-0">
          <img src={maps[progress]} aria-hidden={true} />
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex items-center justify-center py-5">
        <button
          className="relative flex items-center justify-center"
          onClick={() => setPlay(true)}
        >
          <img src={PlayBtn} aria-hidden={true} className="h-16 w-auto" />
          <span className="absolute tracking-wide"></span>
        </button>
      </div>

      {play && (
        <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm">
          <div className="mx-auto mt-20 w-[90%] max-w-xl rounded-2xl bg-white/90 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-800">
                Choose a Zone
              </h2>
              <button
                onClick={() => setPlay(false)}
                className="rounded-md bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-300"
              >
                Close
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {zones.map((zone) => {
                const locked = zone.id > progress;
                const baseClasses = `group relative overflow-hidden rounded-xl border border-white/40 bg-gradient-to-r ${zone.color} px-4 py-3 text-white shadow-md transition-all`;

                return locked ? (
                  <div
                    key={zone.name}
                    className={`${baseClasses} cursor-not-allowed opacity-60`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold tracking-wide">
                        {zone.name}
                      </span>
                      <span className="text-sm font-semibold">Locked 🔒</span>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={zone.name}
                    to={zone.to}
                    className={`${baseClasses} hover:-translate-y-0.5 hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold tracking-wide">
                        {zone.name}
                      </span>
                      <span className="text-sm font-semibold opacity-80 group-hover:opacity-100">
                        Enter →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
