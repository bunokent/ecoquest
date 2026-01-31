import { useEffect, useState } from "react";

// ---------- ASSETS ----------
import Storyline from "../assets/river-mg/01.svg";
import Congrats01 from "../assets/river-mg/03.svg";
import Congrats02 from "../assets/river-mg/04.svg";
import MiniGBG from "../assets/river-mg/02.svg";

import C1 from "../assets/river-mg/c1.svg";

import NextButton from "../assets/river/nextbtn.svg";
import SubmitBtn from "../assets/river-mg/submitbtn.svg";
import CheckAns from "../assets/river/check.svg";
import WrongAns from "../assets/river/wrong.svg";
import CheckChar from "../assets/river/check-char.svg";
import WrongChar from "../assets/river/wrong-char.svg";

import Background from "../assets/river-mg/riverbadgebg.svg";
import RiverBadge from "../assets/map/zone2btn.svg";

import ZoneHeader from "../components/ZoneHeader";

import NoHeart from "../components/NoHeart";
import BadgeReward from "../components/BadgeReward";
import { useSlideTransition } from "../hooks/useSlideTransition";

// ---------- TYPES ----------
type StoryPage = {
  bg: string;
  char: string;
  type: "story";
};

type QuestionPage = {
  bg: string;
  char: null;
  type: "question";
  question: string;
  answer: string; // lowercase
};

type Page = StoryPage | QuestionPage;
type AnswerResult = "correct" | "wrong" | null;

// ---------- DATA ----------
const pages: Page[] = [
  { bg: Storyline, char: C1, type: "story" },

  {
    bg: MiniGBG,
    char: null,
    type: "question",
    question: "Throwing trash into the river causes________",
    answer: "water pollution",
  },

  {
    bg: MiniGBG,
    char: null,
    type: "question",
    question: "Plastic waste blocks sunlight and __________ needed by fish.",
    answer: "oxygen",
  },

  {
    bg: MiniGBG,
    char: null,
    type: "question",
    question:
      "Plastic waste can stay in rivers and oceans for __________ of years.",
    answer: "hundreds",
  },

  { bg: Congrats01, char: C1, type: "story" },
  { bg: Congrats02, char: C1, type: "story" },
];

// ---------- COMPONENT ----------
const RiverMiniGames = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [answerResult, setAnswerResult] = useState<AnswerResult>(null);

  const page = pages[pageIndex];

  const { isSliding } = useSlideTransition();

  // ---------- HANDLERS ----------
  const [showReward, setShowReward] = useState(false);

  const handleNext = () => {
    if (isLastPage) {
      setShowReward(true); // only show reward after click
    } else {
      setPageIndex((p) => p + 1);
    }
  };

  const handleSubmit = () => {
    if (page.type === "question") {
      const user = userAnswer.trim().toLowerCase();
      const correct = page.answer.trim().toLowerCase();

      if (user === correct) {
        setAnswerResult("correct");
      } else {
        setAnswerResult("wrong");
        setCurrentLives((l) => l - 1);
      }
    }
  };

  const handleResultNext = () => {
    setAnswerResult(null);
    setUserAnswer("");
    setPageIndex((p) => p + 1);
  };

  const isLastPage = pageIndex === pages.length - 1;

  useEffect(() => {
    if (isLastPage) {
      const currentProgress = parseInt(
        localStorage.getItem("progress") || "1",
        10,
      );
      if (currentProgress === 2) {
        localStorage.setItem("progress", "3");
      }
    }
  }, [isLastPage]);

  // ---------- RENDER ----------
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-100">
        <ZoneHeader currentLives={currentLives} />
      </div>

      {/* overlay */}
      {currentLives <= 0 && <NoHeart zone="river" />}

      {/* Background */}
      <img src={page.bg} className="w-full h-full object-cover" alt="scene" />

      {/* Character */}
      {page.type === "story" && (
        <img
          src={page.char}
          className="absolute bottom-2 right-8 z-10 npc-float"
          alt="character"
        />
      )}

      {/* STORY MODE */}
      {page.type === "story" && (
        <div
          className={`absolute right-10 z-20 flex space-x-4 ${
            showReward ? "bottom-0" : "bottom-10"
          }`}
        >
          {!showReward && (
            <button onClick={handleNext}>
              <img src={NextButton} alt="next" />
            </button>
          )}

          {showReward && (
            <BadgeReward
              background={Background}
              badge={RiverBadge}
              nextZone="city"
              zoneName="River"
              isSliding={isSliding}
            />
          )}
        </div>
      )}

      {/* QUESTION MODE */}
      {page.type === "question" && !answerResult && (
        <div
          className="absolute top-[50%] left-1/2 -translate-x-1/2 z-20 
        w-[95%] space-y-4 bg-white/30 backdrop-blur-md py-6 rounded-xl"
        >
          <div className="text-black text-lg text-center font-bold px-4">
            {page.question}
          </div>

          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-[90%] mx-auto block p-3 rounded-lg 
            text-center text-md font-semibold border border-gray-300"
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              // className={!userAnswer ? "opacity-50" : ""}
            >
              <img src={SubmitBtn} alt="submit" />
            </button>
          </div>
        </div>
      )}

      {/* RESULT SCREEN */}
      {answerResult && (
        <div className="absolute inset-0 z-50">
          <img
            src={answerResult === "correct" ? CheckAns : WrongAns}
            className="w-full h-full object-cover"
            alt="result"
          />

          <img
            src={answerResult === "correct" ? CheckChar : WrongChar}
            className="absolute bottom-2 right-8 z-10 npc-float"
            alt="character"
          />

          <div className="absolute bottom-10 right-10 z-20">
            <button onClick={handleResultNext}>
              <img src={NextButton} alt="next" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiverMiniGames;
