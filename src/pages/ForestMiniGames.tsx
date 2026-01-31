import { useState, useEffect } from "react";
import ZoneHeader from "../components/ZoneHeader";
import NoHeart from "../components/NoHeart";
import BadgeReward from "../components/BadgeReward";
import { useSlideTransition } from "../hooks/useSlideTransition";

import Background from "../assets/forest/minigamesbg.svg";
import MiniGame from "../assets/forest/minigamebanner.svg";
import MiniGameConvo from "../assets/forest/minigameconvo.svg";
import MinigameNpc from "../assets/forest/minigamenpc.svg";
import PlayBtn from "../assets/forest/playbtn.svg";
import SpellBanner from "../assets/forest/spellbanner.svg";
import CongratsBanner from "../assets/forest/congratsminigame.svg";
import CongratsConvo1 from "../assets/forest/minigameconvo1.svg";
import CongratsConvo2 from "../assets/forest/minigameconvo2.svg";
import ForestBadge from "../assets/badges/forestbadge.svg";

// Result assets
import Congrats from "../assets/congratsbanner.svg";
import CongratsConvo from "../assets/correct.svg";
import HappyNpc from "../assets/happynpc.svg";
import WrongBanner from "../assets/wrongbanner.svg";
import WrongAns from "../assets/wronganswer.svg";
import CryNpc from "../assets/crynpc.svg";

const ForestMiniGames = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const { isSliding, triggerSlide } = useSlideTransition();

  const questions = {
    1: {
      question: "This means protecting the forest. \n (CONERSAVIOTN)",
      answer: "Conservation",
    },
    2: {
      question:
        "Plants make food and oxygen through this process \n POHTOSNYTHISES",
      answer: "photosynthesis",
    },
    3: {
      question: "This helps plants make their own food. \n UNS",
      answer: "sun",
    },
  };

  const handleContinue = () => {
    triggerSlide(() => {
      setShowResult(false);
      setUserAnswer("");
      setCurrentPage((prev) => prev + 1);
    });
  };

  const handleSubmit = () => {
    const questionNum = currentPage - 1;
    const correct =
      userAnswer.trim().toLowerCase() ===
      questions[questionNum as keyof typeof questions].answer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleWrongContinue = () => {
    triggerSlide(() => {
      setCurrentLives((prev) => Math.max(0, prev - 1));
      setShowResult(false);
      setUserAnswer("");
      setCurrentPage((prev) => prev + 1);
    });
  };

  // Increment progress when reaching congratulations page
  useEffect(() => {
    if (currentPage === 5) {
      const currentProgress = parseInt(
        localStorage.getItem("progress") || "1",
        10,
      );
      if (currentProgress === 1) {
        localStorage.setItem("progress", "2");
      }
    }
  }, [currentPage]);

  // Render Correct Answer
  const renderCorrectAnswer = () => (
    <div className={isSliding ? "animate-slide-out" : ""}>
      <img
        src={Congrats}
        aria-hidden={true}
        className="w-full relative bottom-15"
      />
      <img
        src={CongratsConvo}
        aria-hidden={true}
        className="relative bottom-55"
      />
      <img src={HappyNpc} aria-hidden={true} className="relative bottom-75" />
      <button className="fixed bottom-5 right-10" onClick={handleContinue}>
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );

  // Render Wrong Answer
  const renderWrongAnswer = () => (
    <div className={isSliding ? "animate-slide-out" : ""}>
      <img src={WrongBanner} aria-hidden={true} className="w-full relative " />
      <img src={WrongAns} aria-hidden={true} className="relative bottom-20" />
      <img src={CryNpc} aria-hidden={true} className="relative bottom-40" />
      <button className="fixed bottom-5 right-10" onClick={handleWrongContinue}>
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );
  return (
    <div className="max-h-screen  overflow-hidden">
      <div>
        <div className="-z-10 fixed inset-0 w-screen h-screen">
          <img
            src={Background}
            aria-hidden={true}
            className="object-cover w-full"
          />
        </div>
        {currentLives === 0 && <NoHeart zone="forest" />}
      </div>
      <ZoneHeader currentLives={currentLives} />
      {currentPage === 1 && (
        <>
          <img
            src={MiniGame}
            aria-hidden={true}
            className="w-full relative bottom-15"
          />

          <img
            src={MiniGameConvo}
            aria-hidden={true}
            className="relative bottom-60 left-5"
          />

          <img
            src={MinigameNpc}
            aria-hidden={true}
            className=" relative bottom-80 npc-float"
          />
        </>
      )}
      {currentPage === 2 && !showResult && (
        <>
          <img
            src={SpellBanner}
            aria-hidden={true}
            className="w-full relative bottom-15"
          />
          <div className="flex items-center w-full justify-center">
            <div className="rounded-lg w-[90%] max-w-md bg-white/90 text-black font-semibold text-center p-6 relative bottom-12 shadow-lg">
              <p className="text-lg mb-4">{questions[1].question}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full rounded-md px-4 py-2 border-2 border-emerald-400 focus:outline-none focus:border-emerald-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userAnswer.trim()) handleSubmit();
                }}
              />
              <button
                disabled={!userAnswer.trim()}
                className={`mt-4 w-full rounded-md px-4 py-2 font-bold uppercase transition-all ${
                  !userAnswer.trim()
                    ? "cursor-not-allowed bg-slate-300 text-slate-600"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                }`}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      {currentPage === 3 && !showResult && (
        <>
          <img
            src={SpellBanner}
            aria-hidden={true}
            className="w-full relative bottom-15"
          />
          <div className="flex items-center w-full justify-center">
            <div className="rounded-lg w-[90%] max-w-md bg-white/90 text-black font-semibold text-center p-6 relative bottom-12 shadow-lg">
              <p className="text-lg mb-4">{questions[2].question}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full rounded-md px-4 py-2 border-2 border-emerald-400 focus:outline-none focus:border-emerald-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userAnswer.trim()) handleSubmit();
                }}
              />
              <button
                disabled={!userAnswer.trim()}
                className={`mt-4 w-full rounded-md px-4 py-2 font-bold uppercase transition-all ${
                  !userAnswer.trim()
                    ? "cursor-not-allowed bg-slate-300 text-slate-600"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                }`}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      {currentPage === 4 && !showResult && (
        <>
          <img
            src={SpellBanner}
            aria-hidden={true}
            className="w-full relative bottom-15"
          />
          <div className="flex items-center w-full justify-center">
            <div className="rounded-lg w-[90%] max-w-md bg-white/90 text-black font-semibold text-center p-6 relative bottom-12 shadow-lg">
              <p className="text-lg mb-4">{questions[3].question}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full rounded-md px-4 py-2 border-2 border-emerald-400 focus:outline-none focus:border-emerald-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userAnswer.trim()) handleSubmit();
                }}
              />
              <button
                disabled={!userAnswer.trim()}
                className={`mt-4 w-full rounded-md px-4 py-2 font-bold uppercase transition-all ${
                  !userAnswer.trim()
                    ? "cursor-not-allowed bg-slate-300 text-slate-600"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                }`}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      {showResult && (isCorrect ? renderCorrectAnswer() : renderWrongAnswer())}

      {currentPage === 1 && (
        <button className="fixed bottom-5 right-10">
          <img
            src={PlayBtn}
            alt="Play"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          />
        </button>
      )}
      {currentPage === 5 && (
        <>
          <img
            src={CongratsBanner}
            aria-hidden={true}
            className="w-full relative bottom-15"
          />
          <img
            src={CongratsConvo1}
            aria-hidden={true}
            className="relative bottom-60 left-5"
          />
          <img
            src={MinigameNpc}
            aria-hidden={true}
            className="relative bottom-80 npc-float"
          />
          <button className="fixed bottom-5 right-10">
            <img
              src={PlayBtn}
              alt="Play"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            />
          </button>
        </>
      )}
      {currentPage === 6 && (
        <>
          <img
            src={CongratsBanner}
            aria-hidden={true}
            className="w-full relative bottom-15"
          />
          <img
            src={CongratsConvo2}
            aria-hidden={true}
            className="relative bottom-60 left-5"
          />
          <img
            src={MinigameNpc}
            aria-hidden={true}
            className="relative bottom-80 npc-float"
          />
          <button className="fixed bottom-5 right-10">
            <img
              src={PlayBtn}
              alt="Play"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            />
          </button>
        </>
      )}
      {currentPage === 7 && (
        <BadgeReward
          background={Background}
          badge={ForestBadge}
          nextZone="river"
          zoneName="Forest"
          isSliding={isSliding}
        />
      )}
    </div>
  );
};

export default ForestMiniGames;
