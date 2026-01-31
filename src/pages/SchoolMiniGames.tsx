import { useEffect, useState } from "react";
import ZoneHeader from "../components/ZoneHeader";
import NoHeart from "../components/NoHeart";
import BadgeReward from "../components/BadgeReward";

import Bg from "../assets/school-mg/02.svg";
import RecycleBin from "../assets/school-mg/recycle.svg";
import CompostBin from "../assets/school-mg/compost.svg";
import TrashBin from "../assets/school-mg/trash.svg";
import HazardBin from "../assets/school-mg/hazardous.svg";

import Bottle from "../assets/school-mg/bottle.svg";
import Paper from "../assets/school-mg/paper.svg";
import Banana from "../assets/school-mg/banana.svg";
import TrashBag from "../assets/school-mg/trashbag.svg";
import Battery from "../assets/school-mg/battery.svg";
import Glass from "../assets/school-mg/glass.svg";

import C1 from "../assets/school/c2.svg";
import bg from "../assets/school-mg/bg.svg";
import badge from "../assets/badges/schoolbadge.png";
import Congrats01 from "../assets/school-mg/03.svg";
import Congrats02 from "../assets/school-mg/04.svg";
import NextButton from "../assets/river/nextbtn.svg";

type BinType = "recycle" | "compost" | "trash" | "hazardous";

const ITEM_POOL: { src: string; type: BinType; name?: string }[] = [
  { src: Bottle, type: "recycle", name: "Bottle" },
  { src: Paper, type: "recycle", name: "Paper" },
  { src: Glass, type: "recycle", name: "Glass" },
  { src: Banana, type: "compost", name: "Food waste" },
  { src: TrashBag, type: "trash", name: "Plastic wrap" },
  { src: Battery, type: "hazardous", name: "Battery" },
];

const BIN_ASSETS: { type: BinType; src: string; label: string }[] = [
  { type: "recycle", src: RecycleBin, label: "Recycle" },
  { type: "compost", src: CompostBin, label: "Compost" },
  { type: "trash", src: TrashBin, label: "Trash" },
  { type: "hazardous", src: HazardBin, label: "Hazardous" },
];

const roundsTotal = 6;

// spawn area control (edit these to control where trashes appear)
const SPAWN_AREA = {
  xMin: 8, // percent from left
  xMax: 92, // percent from left
  yTop: 30, // percent from top (start of spawn box)
  height: 50, // percent height of spawn box (so spawn area is yTop .. yTop+height)
};

type ScatteredItem = {
  id: number;
  src: string;
  type: BinType;
  name?: string;
  x: number; // percent
  y: number; // percent
  collected?: boolean;
};

const RESULT_PAGES = [Congrats01, Congrats02];

const SchoolMiniGames = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [items, setItems] = useState<ScatteredItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);

  const [showResult, setShowResult] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  // helpers
  function shuffle<T>(arr: T[]) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randomPosition(existing: ScatteredItem[]) {
    for (let attempt = 0; attempt < 20; attempt++) {
      const x =
        SPAWN_AREA.xMin + Math.random() * (SPAWN_AREA.xMax - SPAWN_AREA.xMin);
      const y = SPAWN_AREA.yTop + Math.random() * SPAWN_AREA.height;
      const ok = existing.every(
        (it) => Math.hypot(it.x - x, it.y - y) > 12, // percent distance
      );
      if (ok) return { x, y };
    }
    return {
      x: SPAWN_AREA.xMin + Math.random() * (SPAWN_AREA.xMax - SPAWN_AREA.xMin),
      y: SPAWN_AREA.yTop + Math.random() * SPAWN_AREA.height,
    };
  }

  useEffect(() => {
    const pool = shuffle(ITEM_POOL).slice(0, roundsTotal);
    const scattered: ScatteredItem[] = [];
    pool.forEach((p, i) => {
      const pos = randomPosition(scattered);
      scattered.push({
        id: i + 1,
        src: p.src,
        type: p.type,
        name: p.name,
        x: pos.x,
        y: pos.y,
      });
    });
    setItems(scattered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const remaining = items.filter((i) => !i.collected).length;
    if (items.length > 0 && remaining === 0) {
      setTimeout(() => setShowResult(true), 400);
    }
    if (currentLives <= 0) {
      // keep showing NoHeart overlay
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, currentLives]);

  useEffect(() => {
    if (showBadge) {
      const currentProgress = parseInt(
        localStorage.getItem("progress") || "1",
        10,
      );
      if (currentProgress === 4) {
        localStorage.setItem("progress", "5");
      }
    }
  }, [showBadge]);

  const handleSelectItem = (id: number) => {
    if (feedback) return;
    const it = items.find((i) => i.id === id);
    if (!it || it.collected) return;
    setSelectedItemId(id);
  };

  const handlePickBin = (bin: BinType) => {
    if (!selectedItemId || feedback) return;
    const it = items.find((i) => i.id === selectedItemId);
    if (!it) return;

    if (bin === it.type) {
      setFeedback("correct");
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, collected: true } : p)),
      );
      setTimeout(() => {
        setFeedback(null);
        setSelectedItemId(null);
      }, 700);
    } else {
      setFeedback("wrong");
      setCurrentLives((l) => Math.max(0, l - 1));
      setTimeout(() => {
        setFeedback(null);
        setSelectedItemId(null);
        setItems((prev) =>
          prev.map((p) => (p.id === it.id ? { ...p, collected: true } : p)),
        );
      }, 900);
    }
  };

  const handleResultNext = () => {
    if (resultIndex < RESULT_PAGES.length - 1) {
      setResultIndex((i) => i + 1);
    } else {
      // after last result page show BadgeReward (stays on same route)
      setShowBadge(true);
    }
  };

  // show BadgeReward after results
  if (showBadge) {
    return (
      <BadgeReward
        background={bg}
        badge={badge}
        nextZone="beach"
        zoneName="School"
      />
    );
  }

  if (showResult) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="fixed top-0 left-0 w-full z-100">
          <ZoneHeader currentLives={currentLives} />
        </div>

        {/* overlay */}
        {currentLives <= 0 && <NoHeart zone="school" />}

        <img
          src={RESULT_PAGES[resultIndex]}
          className="w-full h-full object-cover"
          alt="result"
        />

        {/* character on result page */}
        <img
          src={C1}
          className="absolute bottom-10 right-35 z-10 npc-float"
          alt="character"
        />

        <div className="absolute bottom-8 right-8 z-20">
          <button onClick={handleResultNext}>
            <img src={NextButton} alt="next" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-100">
        <ZoneHeader currentLives={currentLives} />
      </div>

      {/* overlay */}
      {currentLives <= 0 && <NoHeart zone="school" />}

      {/* Background */}
      <img
        src={Bg}
        className="w-full h-full object-cover"
        alt="school background"
      />

      {/* Score HUD */}
      <div className="absolute top-20 left-4 z-40 text-white">
        <div className="bg-black/50 px-3 py-1 rounded-md">
          Items left: {items.filter((i) => !i.collected).length} /{" "}
          {items.length}
        </div>
      </div>

      {/* Scattered items */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {items.map((it) =>
          it.collected ? null : (
            <button
              key={it.id}
              onClick={() => handleSelectItem(it.id)}
              style={{
                left: `${it.x}%`,
                top: `${it.y}%`,
                transform: "translate(-50%,-50%)",
              }}
              className={`absolute w-20 h-20 p-2 bg-white/70 rounded-full flex items-center justify-center pointer-events-auto transition-transform ${
                selectedItemId === it.id
                  ? "scale-110 ring-4 ring-yellow-300"
                  : ""
              }`}
            >
              <img
                src={it.src}
                alt={it.name || "item"}
                className="w-full h-full object-contain"
              />
            </button>
          ),
        )}
      </div>

      {/* Shelf behind bins */}
      <div className="absolute bottom-14 left-0 right-0 flex justify-center z-30 pointer-events-none">
        <div className="w-[86%] h-24 bg-[#3b2a1f]/85 rounded-2xl shadow-inner border-t-4 border-yellow-200/20 mx-auto" />
      </div>

      {/* Bins with shared fading background */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-40 px-4 pointer-events-none">
        <div className="w-full max-w-4xl mx-auto px-6 py-3 rounded-xl bg-gradient-to-t from-black/75 via-black/40 to-transparent backdrop-blur-sm flex justify-center gap-6 pointer-events-auto">
          {BIN_ASSETS.map((b) => {
            const highlight = selectedItemId !== null;
            return (
              <button
                key={b.type}
                onClick={() => handlePickBin(b.type)}
                className={`flex flex-col items-center gap-2 transition-all pointer-events-auto ${
                  highlight ? "scale-105 ring-4 ring-yellow-400" : ""
                }`}
              >
                <img
                  src={b.src}
                  alt={b.label}
                  className="w-20 h-20 object-contain"
                />
                <span className="text-xs text-white/90">{b.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback overlay */}
      {feedback && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className={`px-6 py-4 rounded-lg text-white text-lg font-bold pointer-events-none ${
              feedback === "correct" ? "bg-green-600/90" : "bg-red-600/90"
            }`}
          >
            {feedback === "correct" ? "Correct!" : "Wrong"}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolMiniGames;
