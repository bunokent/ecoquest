import { useState } from "react";
import Storyline from "../assets/school/01.svg";
import Objective from "../assets/school/02.svg";
import Q1 from "../assets/school/03.svg";
import FF1 from "../assets/school/04.svg";
import Q2 from "../assets/school/05.svg";
import FF2 from "../assets/school/06.svg";
import Q3 from "../assets/school/07.svg";
import FF3 from "../assets/school/08.svg";

import NextButton from "../assets/school/nextbtn.svg";
import SubmitButton from "../assets/school/submitbtn.svg";
import CheckAns from "../assets/school/check.svg";
import WrongAns from "../assets/school/wrong.svg";
import CheckChar from "../assets/school/check-char.svg";
import WrongChar from "../assets/school/wrong-char.svg";

import C1 from "../assets/school/c1.svg";
import C2 from "../assets/school/c2.svg";
import C3 from "../assets/school/c3.svg";
import ZoneHeader from "../components/ZoneHeader";
import { useNavigate } from "react-router-dom";

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
  options: string[];
  correct: number;
};

type Page = StoryPage | QuestionPage;
type AnswerResult = "correct" | "wrong" | null;

// ---------- DATA ----------
const pages: Page[] = [
  { bg: Storyline, char: C1, type: "story" },
  { bg: Objective, char: C2, type: "story" },
  {
    bg: Q1,
    char: null,
    type: "question",
    question:
      "The garbage mixed with floodwater entered the school ground. Plastics, cans, and food waste blocked the pathways making it hard to walk. \nWhat is the best way to stop this problem from happening again?",
    options: [
      "Throw all trash in one place.",
      "Burn the garbage near the plant.",
      "Segregate waste properly and ensure regular trash collection.",
    ],
    correct: 2,
  },
  { bg: FF1, char: C3, type: "story" },
  {
    bg: Q2,
    char: null,
    type: "question",
    question:
      "During lunch time, you notice that children left their leftovers and trash on their table. \nWhat action will you do to promote cleanliness in the cafeteria?",
    options: [
      "Continue to eat your lunch not minding the trash around.",
      "Tell them to practice the “Clean As You Go” policy.",
      "Look at the trash and wait for someone to clean it up.",
    ],
    correct: 1,
  },
  { bg: FF2, char: C3, type: "story" },
  {
    bg: Q3,
    char: null,
    type: "question",
    question:
      "Old batteries and broken gadgets were thrown with regular trash. Harmful chemicals leaked into the ground and damaged nearby electrical wires. \nWhere should these kinds of waste be thrown?",
    options: [
      "Add clear labeled bins and educate students on sorting.",
      "Put all recyclables in one garbage bin.",
      "Stop collecting recyclables altogether.",
    ],
    correct: 0,
  },
  { bg: FF3, char: C3, type: "story" },
];

// ---------- COMPONENT ----------
const School = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResult>(null);

  const page = pages[pageIndex];
  const navigate = useNavigate();

  const handleNext = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex((p) => p + 1);
    } else {
      navigate("/school/mini-games");
    }
  };

  const handleSubmit = () => {
    if (page.type === "question" && selected !== null) {
      if (selected === page.correct) {
        setAnswerResult("correct");
      } else {
        setAnswerResult("wrong");
        setCurrentLives((l) => l - 1);
      }
    }
  };

  const handleResultNext = () => {
    setAnswerResult(null);
    setSelected(null);
    setPageIndex((p) => p + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-100">
        <ZoneHeader currentLives={currentLives} />
      </div>

      {/* Background */}
      <img src={page.bg} className="w-full h-full object-cover" alt="scene" />

      {/* Character */}
      {page.type === "story" && (
        <img
          src={page.char}
          className="absolute bottom-2 right-20 npc-float"
          alt="character"
        />
      )}

      {/* STORY MODE */}
      {page.type === "story" && (
        <div className="absolute bottom-10 right-10 z-20">
          <button onClick={handleNext}>
            <img src={NextButton} alt="next" />
          </button>
        </div>
      )}

      {/* QUESTION MODE */}
      {page.type === "question" && !answerResult && (
        <div className="absolute bottom-30 left-1/2 -translate-x-1/2 z-20 w-[95%] space-y-4 bg-white/30 backdrop-blur-md py-6 rounded-xl">
          <div className="text-black text-sm text-center font-semibold px-4">
            {page.question.split("\n").map((part, i) => (
              <span key={i}>
                {part}
                <br />
                <br />
              </span>
            ))}
          </div>

          {page.options.map((opt, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`p-4 rounded-xl cursor-pointer text-center text-sm transition-all duration-200 mx-2 ${
                selected === i
                  ? "bg-[#F5E9C3] border border-green-500"
                  : "bg-white border border-white/50"
              }`}
            >
              {opt}
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={selected === null ? "opacity-50" : ""}
            >
              <img src={SubmitButton} alt="submit" />
            </button>
          </div>
        </div>
      )}

      {/* RESULT SCREEN */}
      {answerResult && (
        <div className="absolute inset-0 z-50">
          <div className="flex flex-col items-center space-y-6">
            <img
              src={answerResult === "correct" ? CheckAns : WrongAns}
              className="w-full h-full object-cover"
              alt="result"
            />
            <img
              src={answerResult === "correct" ? CheckChar : WrongChar}
              className="absolute bottom-2 right-40 z-10 npc-think "
              alt="character"
            />
            <div className="absolute bottom-10 right-10 z-20">
              <button onClick={handleResultNext}>
                <img src={NextButton} alt="next" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default School;
