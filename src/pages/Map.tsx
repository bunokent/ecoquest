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

import Zone1Btn from "../assets/map/zone1btn.svg";
import Zone2Btn from "../assets/map/zone2btn.svg";
import Zone3Btn from "../assets/map/zone3btn.svg";
import Zone4Btn from "../assets/map/zone4btn.svg";
import Zone5Btn from "../assets/map/zone5btn.svg";

import Zone2Lock from "../assets/map/zone2lock.svg";
import Zone3Lock from "../assets/map/zone3lock.svg";
import Zone4Lock from "../assets/map/zone4lock.svg";
import Zone5Lock from "../assets/map/zone5lock.svg";

import MapChar from "../assets/map/man.svg";
import ViewMap from "../assets/map/viewmapbtn.svg";

const Map = () => {
  const [play, setPlay] = useState<boolean>(false);
  const progress = parseInt(localStorage.getItem("progress") ?? "1", 10);

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

  const zoneButtons: Record<number, string> = {
    1: Zone1Btn,
    2: Zone2Btn,
    3: Zone3Btn,
    4: Zone4Btn,
    5: Zone5Btn,
  };

  const zoneLocks: Record<number, string> = {
    2: Zone2Lock,
    3: Zone3Lock,
    4: Zone4Lock,
    5: Zone5Lock,
  };

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
          <img src={PlayBtn} aria-hidden={true} className="h-24 w-auto" />
          <span className="absolute tracking-wide"></span>
        </button>
      </div>

      {play && (
        <div className="fixed inset-0 z-10 bg-transparent backdrop-blur-xs">
          <div className="mx-auto mt-4 w-[90%] max-w-xl rounded-2xl bg-white/60 p-6 shadow-xl">
            <div className="flex items-center justify-between mx-auto rounded-full max-w-md">
              <img src={MapChar} alt="Map Character" className="h-26 w-32" />
              <h2 className="text-lg font-bold text-slate-800">
                {progress >= 5
                  ? "🌟 All zones cleared! The island is fully restored!"
                  : progress > 1
                    ? "Great job! Keep restoring the island!"
                    : "Welcome to EcoQuest World! Help me restore the island."}
              </h2>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 place-items-center">
              {zones.map((zone) => {
                const locked = zone.id > progress;
                const btnImg = zoneButtons[zone.id];
                const lockImg = zoneLocks[zone.id];
                const isLast = zone.id === 5;

                return locked ? (
                  <div
                    key={zone.id}
                    className={`relative opacity-70 cursor-not-allowed ${
                      isLast ? "col-span-2 flex justify-center" : ""
                    }`}
                  >
                    <img
                      src={lockImg}
                      alt={`${zone.name} locked`}
                      className="w-32 h-auto"
                    />
                  </div>
                ) : (
                  <Link
                    key={zone.id}
                    to={zone.to}
                    className={`transition-transform hover:scale-105 active:scale-95 ${
                      isLast ? "col-span-2 flex justify-center" : ""
                    }`}
                  >
                    <img src={btnImg} alt={zone.name} className="w-32 h-auto" />
                  </Link>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setPlay(false)}
            className="rounded-md px-3 py-1 text-sm font-semibold text-slate-700 mx-auto w-full mt-6"
          >
            <img src={ViewMap} alt="ViewMap" className="mx-auto" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
