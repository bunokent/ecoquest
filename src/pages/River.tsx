import { useState } from "react";
import Storyline from "../assets/river/01.svg";
import Objective from "../assets/river/02.svg";
import FF1 from "../assets/river/04.svg";
import Q1 from "../assets/river/03.svg";
import Q2 from "../assets/river/05.svg";
import Q3 from "../assets/river/07.svg";
import FF2 from "../assets/river/06.svg";
import FF3 from "../assets/river/08.svg";
import NextButton from "../assets/river/nextbtn.svg";
import SubmitButton from "../assets/river/submitbtn.svg";
import CheckAns from "../assets/river/check.svg";
import WrongAns from "../assets/river/wrong.svg";
import CheckChar from "../assets/river/check-char.svg";
import WrongChar from "../assets/river/wrong-char.svg";
import C1 from "../assets/river/c1.svg";
import C2 from "../assets/river/c2.svg";
import C3 from "../assets/river/c3.svg";
import C6 from "../assets/river/c6.svg";
import C8 from "../assets/river/c8.svg";
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
      "People in the community throw plastic bags, bottles, and food wrappers into the river. After some time, the water becomes dirty and smelly, and fish can no longer live safely in the river. Which action will BEST help reduce water pollution in the river?",
    options: [
      "Properly disposing of waste and recycling plastics.",
      "Throwing more waste into the river.",
      "Washing garbage into the river during rain."
    ],
    correct: 0
  },
  { bg: FF1, char: C3, type: "funfact" },
  {
    bg: Q2,
    char: null,
    type: "question",
    question:
      "The river smells bad and people are getting sick.Why is clean water important?",
    options: [
      "For throwing waste.",
      "For decoration.",
      "For drinking, cleaning, and living things."
    ],
    correct: 2
  },
  { bg: FF2, char: C6, type: "funfact" },
  {
    bg: Q3,
    char: null,
    type: "question",
    question:
      " A sea turtle is found trapped in plastic waste floating in the ocean. The plastic makes it hard for the turtle to swim and breathe. Which action BEST helps protect marine animals?",
    options: [
      "Using reusable bags and bottles.",
      "Throwing plastic into the sea.",
      "Burning plastic near the shore."
    ],
    correct: 0
  },
  { bg: FF3, char: C8, type: "funfact" }
];

// ---------- COMPONENT ----------
const River = () => {
  const [currentLives, setCurrentLives] = useState<number>(2);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResult>(null);

  const page = pages[pageIndex];

  const navigate = useNavigate();

  const handleNext = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex(p => p + 1);
    } else {
    // Redirect to /river/mini-games
    navigate("/river/mini-games");
  }
  };

  const handleSubmit = () => {
    if (page.type === "question" && selected !== null) {
      if (selected === page.correct) {
        setAnswerResult("correct");
      } else {
        setAnswerResult("wrong");
        setCurrentLives(l => l - 1);
      }
    }
  };

  const handleResultNext = () => {
    setAnswerResult(null);
    setSelected(null);
    setPageIndex(p => p + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-100">
        <ZoneHeader currentLives={currentLives} />
      </div>

      {/* overlay */}
      {currentLives <= 0 && <NoHeart zone="river" />}

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
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 w-[95%] space-y-4 bg-white/30 backdrop-blur-md py-6 rounded-xl">
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

export default River;
