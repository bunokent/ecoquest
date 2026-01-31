import { useState } from "react";
import Storyline from "../assets/beach/01.svg";
import Objective from "../assets/beach/02.svg";
import FF1 from "../assets/beach/04.svg";
import FF2 from "../assets/beach/05.svg";
import Q1 from "../assets/beach/03.svg";
import Q2 from "../assets/beach/06.svg";
import Q3 from "../assets/beach/08.svg";
// import FF2 from "../assets/river/06.svg";
import FF3 from "../assets/beach/07.svg";
import FF4 from "../assets/beach/09.svg";
import NextButton from "../assets/river/nextbtn.svg";
import SubmitButton from "../assets/river/submitbtn.svg";
import CheckAns from "../assets/beach/check.svg";
import WrongAns from "../assets/beach/wrong.svg";
import CheckChar from "../assets/beach/c2.svg";
import WrongChar from "../assets/beach/wrong-char.svg";
import C1 from "../assets/beach/c1.svg";
import C2 from "../assets/beach/c2.svg";
import C3 from "../assets/beach/c4-5.svg";
// import C6 from "../assets/river/c6.svg";
import C7 from "../assets/beach/c7.svg";
import ZoneHeader from "../components/ZoneHeader";

import { useNavigate } from "react-router-dom";
import NoHeart from "../components/NoHeart";

// ---------- TYPES ----------
type StoryPage = {
  bg: string;
  char: string;
  type: "story";
};

type FunFactPage = {
  bg: string;
  char: string;
  type: "funfact";
};

type QuestionPage = {
  bg: string;
  char: null;
  type: "question";
  question: string;
  options: string[];
  correct: number;
};

type Page = StoryPage | FunFactPage | QuestionPage;
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
      "Do you see small fish swimming near the shore? Some students try to catch the fish to play with them, which scares the fish and disrupts their habitat. Which shows a safe way for students to enjoy this habitat?",
    options: [
      "Observe the fish without touching them.",
      "Splash water to scare the fish .",
      "Catch the fish.",
    ],
    correct: 0,
  },
  { bg: FF1, char: C3, type: "funfact" },
  { bg: FF2, char: C3, type: "funfact" },
  {
    bg: Q2,
    char: null,
    type: "question",
    question:
      "Do you notice plastic bottles and wrappers floating near the shore? What should students do to help protect marine life?",
    options: [
      "Leave the plastic where it is.",
      "Throw more trash into the water .",
      "Collect the plastic and place it in recycling bins.",
    ],
    correct: 2,
  },
  { bg: FF3, char: C7, type: "funfact" },
  {
    bg: Q3,
    char: null,
    type: "question",
    question:
      " After a beach trip, students see plastic cups, straw, and snack wrappers left on the seabed. What should students do before leaving the beach?",
    options: [
      "Bury the trash in the sand..",
      "Collect all trash and bring it to proper trash cans..",
      "Push it into the water.",
    ],
    correct: 1,
  },
  { bg: FF4, char: C7, type: "funfact" },
];

// ---------- COMPONENT ----------
const Beach = () => {
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
      // Redirect to /river/mini-games
      navigate("/beach/mini-games");
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

      {/* overlay */}
      {currentLives <= 0 && <NoHeart zone="beach" />}

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

      {/* Character */}
      {page.type === "funfact" && (
        <img
          src={page.char}
          className="absolute bottom-2 right-8 z-10 npc-think"
          alt="character"
        />
      )}

      {/* STORY MODE */}
      {(page.type === "story" || page.type === "funfact") && (
        <div className="absolute bottom-10 right-10 z-20">
          <button onClick={handleNext}>
            <img src={NextButton} alt="next" />
          </button>
        </div>
      )}

      {/* QUESTION MODE */}
      {page.type === "question" && !answerResult && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 w-[95%] space-y-4 bg-white/30 backdrop-blur-md py-6 rounded-xl">
          <div className="text-black text-lg text-center font-bold px-4">
            {page.question}
          </div>

          {page.options.map((opt, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`
                p-4 rounded-xl cursor-pointer text-center text-md font-semibold
                transition-all duration-200 mx-2
                ${
                  selected === i
                    ? "bg-[#F5E9C3] border border-green-500"
                    : "bg-white border border-white/50"
                }
              `}
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
              className="absolute bottom-2 right-8 z-10 npc-float"
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

export default Beach;
