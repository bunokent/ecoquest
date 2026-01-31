import { useState } from "react";
import type React from "react";
import type { SetStateAction } from "react";

interface MatchingGameProps {
  columnA: { [key: number]: string };
  columnB: { [key: number]: string };
  answers: { [key: number]: number };
  onComplete: () => void;
  setCurrentLives: React.Dispatch<SetStateAction<number>>;
}

const MatchingGame = ({
  columnA,
  columnB,
  answers,
  onComplete,
  setCurrentLives,
}: MatchingGameProps) => {
  const [selectedA, setSelectedA] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">(
    "",
  );
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [correctFlash, setCorrectFlash] = useState<boolean>(false);

  const handleSelectA = (id: number) => {
    if (matchedPairs.includes(id)) return;
    setSelectedA(selectedA === id ? null : id);
  };

  const handleSelectB = (id: number) => {
    if (selectedA === null) return;

    const isCorrectMatch = answers[selectedA] === id;

    if (isCorrectMatch) {
      setMatchedPairs([...matchedPairs, selectedA]);
      setFeedbackType("success");
      setFeedback("Perfect match!");
      setCorrectFlash(true);

      setTimeout(() => {
        setCorrectFlash(false);
        setFeedback("");
        setFeedbackType("");
        setSelectedA(null);

        if (matchedPairs.length + 1 === Object.keys(columnA).length) {
          setTimeout(() => {
            onComplete();
          }, 500);
        }
      }, 1000);
    } else {
      setFeedbackType("error");
      setFeedback("Incorrect match. Try again!");
      setWrongFlash(true);
      setCurrentLives((prev) => Math.max(0, prev - 1));

      setTimeout(() => {
        setWrongFlash(false);
        setFeedback("");
        setFeedbackType("");
        setSelectedA(null);
      }, 1500);
    }
  };

  return (
    <div className="flex items-center w-full justify-center relative bottom-20">
      <div className="rounded-lg w-[95%] max-w-2xl bg-transparent text-black p-8 relative bottom-12 transition-all duration-300">
        {/* Progress */}
        <div className="mb-6 text-center text-sm font-semibold text-white bg-gray-800/80 py-2 rounded-lg">
          Matched: {matchedPairs.length} / {Object.keys(columnA).length}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-semibold transition-all ${
              feedbackType === "success"
                ? "bg-green-500/80 text-white border-2 border-green-400"
                : "bg-red-500/80 text-white border-2 border-red-400"
            }`}
          >
            {feedbackType === "success"
              ? "Matched! This pair is complete."
              : "Not a match! Try another pair."}
          </div>
        )}

        <div className="space-y-8">
          {/* Column A */}
          <div>
            <h3 className="text-center font-bold text-lg mb-4 text-white bg-gray-800/80 py-2 rounded-lg">
              Column A (Object)
            </h3>
            <div className="flex flex-col gap-3">
              {Object.entries(columnA).map(([key, value]) => {
                const id = parseInt(key);
                const isMatched = matchedPairs.includes(id);
                const isSelected = selectedA === id;

                return (
                  <button
                    key={id}
                    onClick={() => handleSelectA(id)}
                    disabled={isMatched}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                      isMatched
                        ? "bg-gray-800/40 border-gray-600 cursor-not-allowed opacity-60"
                        : isSelected && correctFlash
                          ? "bg-green-500/60 border-green-400 shadow-[0_0_15px_5px_rgba(34,197,94,0.6)] scale-105"
                          : isSelected && wrongFlash
                            ? "bg-red-500/60 border-red-400 shadow-[0_0_15px_5px_rgba(239,68,68,0.6)] scale-105"
                            : isSelected
                              ? "bg-amber-700/60 border-amber-600 shadow-lg scale-105"
                              : "bg-white/70 border-transparent hover:bg-white/90 hover:shadow-md"
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        isMatched
                          ? "line-through text-gray-500"
                          : isSelected
                            ? "text-white"
                            : "text-gray-900"
                      }`}
                    >
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column B */}
          <div>
            <h3 className="text-center font-bold text-lg mb-4 text-white bg-gray-800/80 py-2 rounded-lg">
              Column B (Scientific Role)
            </h3>
            <div className="flex flex-col gap-3">
              {Object.entries(columnB).map(([key, value]) => {
                const id = parseInt(key);
                const isMatchedWithA = Object.entries(answers).some(
                  ([aId, bId]) =>
                    bId === id && matchedPairs.includes(parseInt(aId)),
                );

                return (
                  <button
                    key={id}
                    onClick={() => handleSelectB(id)}
                    disabled={isMatchedWithA}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                      isMatchedWithA
                        ? "bg-gray-800/40 border-gray-600 cursor-not-allowed opacity-60"
                        : selectedA !== null
                          ? "bg-white/70 border-transparent hover:bg-white/90 hover:shadow-md hover:scale-105"
                          : "bg-white/70 border-transparent hover:bg-white/90 hover:shadow-md"
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        isMatchedWithA
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;
