import { useState } from "react";
import ZoneHeader from "../components/ZoneHeader";
import Background from "../assets/forest/background3.svg";
import MiniGame from "../assets/forest/minigamebanner.svg";
import MiniGameConvo from "../assets/forest/minigameconvo.svg";
import MinigameNpc from "../assets/forest/minigamenpc.svg";
import PlayBtn from "../assets/forest/playbtn.svg";
import CorrectAnswer from "../components/CorrectAnswer";
import WrongAnswer from "../components/WrongAnswer";
import SpellBanner from "../assets/forest/spellbanner.svg";
import CongratsBanner from "../assets/forest/congratsminigame.svg";
import CongratsConvo1 from "../assets/forest/minigameconvo1.svg";
import CongratsConvo2 from "../assets/forest/minigameconvo2.svg";

const ForestMiniGames = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const questions = {
    1: {
      question: "This means protecting the forest.",
      answer: "Conservation",
    },
    2: {
      question: "Plants make food and oxygen through this process",
      answer: "photosynthesis",
    },
    3: {
      question: "This helps plants make their own food.",
      answer: "sun",
    },
  };

  const handleContinue = () => {
    setShowResult(false);
    setUserAnswer("");
    setCurrentPage((prev) => prev + 1);
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
    setShowResult(false);
    setUserAnswer("");
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <div>
      <div>
        <div className="-z-10 fixed inset-0 w-screen h-screen">
          <img
            src={Background}
            aria-hidden={true}
            className="object-cover w-full"
          />
        </div>
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
      {showResult &&
        (isCorrect ? (
          <CorrectAnswer onContinue={handleContinue} />
        ) : (
          <WrongAnswer
            onContinue={handleWrongContinue}
            setCurrentLives={setCurrentLives}
          />
        ))}

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
    </div>
  );
};

export default ForestMiniGames;
