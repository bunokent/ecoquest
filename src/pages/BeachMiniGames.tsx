import { useState } from "react";

// ---------- ASSETS ----------
import Storyline from "../assets/beach-mg/01.svg";
import Congrats01 from "../assets/river-mg/03.svg";
import Congrats02 from "../assets/river-mg/04.svg";
import MiniGBG from "../assets/beach-mg/02.svg";

import C1 from "../assets/beach/c2.svg";

import NextButton from "../assets/river/nextbtn.svg";
import SubmitBtn from "../assets/river-mg/submitbtn.svg";
import ReturnBtn from "../assets/river-mg/returnbtn.svg";
import NextZoneBtn from "../assets/river-mg/nextznbtn.svg";
import CheckAns from "../assets/beach/check.svg";
import WrongAns from "../assets/beach/wrong.svg";
import CheckChar from "../assets/beach/c2.svg";
import WrongChar from "../assets/beach/wrong-char.svg";

import ZoneHeader from "../components/ZoneHeader";

import { useNavigate } from "react-router-dom";
import NoHeart from "../components/NoHeart";

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
    question: "I am a group of plants with long roots that grow near the beach. I give fish a safe place to hide and grow.",
    answer: "mangroves"
  },

  {
    bg: MiniGBG,
    char: null,
    type: "question",
    question: "I look pretty on the sand, but I am not just decoration. Crabs and other animals use me as home.",
    answer: "shells"
  },

  {
    bg: MiniGBG,
    char: null,
    type: "question",
    question: "I start on land as bottles, wrappers, or straws. When left behind, I float into the sea and harm marine animals.",
    answer: "trash"
  },

  { bg: Congrats01, char: C1, type: "story" },
  { bg: Congrats02, char: C1, type: "story" },
];

// ---------- COMPONENT ----------
const BeachMiniGames = () => {
  const [currentLives, setCurrentLives] = useState<number>(2);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [answerResult, setAnswerResult] = useState<AnswerResult>(null);

  const page = pages[pageIndex];

  // ---------- HANDLERS ----------
  const handleNext = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex(p => p + 1);
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
        setCurrentLives(l => l - 1);
      }
    }
  };

  const handleResultNext = () => {
    setAnswerResult(null);
    setUserAnswer("");
    setPageIndex(p => p + 1);
  };

  const isLastPage = pageIndex === pages.length - 1;
  const navigate = useNavigate();

  // ---------- RENDER ----------
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-100">
        <ZoneHeader currentLives={currentLives} />
      </div>

      {/* overlay */}
      {currentLives <= 0 && <NoHeart zone="beach" />}

      {/* Background */}
      <img
        src={page.bg}
        className="w-full h-full object-cover"
        alt="scene"
      />

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
        <div className="absolute bottom-10 right-10 z-20 flex space-x-4">
          {!isLastPage && (
            <button onClick={handleNext}>
              <img src={NextButton} alt="next" />
            </button>
          )}
          {isLastPage && (
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate("/map")}>
                <img src={ReturnBtn} alt="return" />
              </button>
              <button onClick={() => navigate("/city")}>
                <img src={NextZoneBtn} alt="next zone" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* QUESTION MODE */}
      {page.type === "question" && !answerResult && (
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 z-20 
        w-[95%] space-y-4 bg-white/30 backdrop-blur-md py-6 rounded-xl">

          <div className="text-black text-lg text-center font-bold px-4">
            {page.question}
          </div>

          <input
            type="text"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
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

export default BeachMiniGames;
