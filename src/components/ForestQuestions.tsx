import ForestQuestion1 from "../assets/forest/question1banner.svg";
import ForestQuestion2 from "../assets/forest/question2banner.svg";
import ForestQuestion3 from "../assets/forest/question3banner.svg";
import { useState } from "react";
import CorrectAnswer from "./CorrectAnswer";
import WrongAnswer from "./WrongAnswer";

const ForestQuestions = ({
  currentPage,
  setCurrentPage,
  setCurrentLives,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLives: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleContinue = () => {
    setShowResult(false);
    setSelectedIndex(null);
    setCurrentPage((prev) => prev + 1);
  };

  const answers = {
    1: [
      {
        answer: "Pour Chemicals",
        correct: false,
      },
      {
        answer: "Give the plant enough water and add compost to the soil.",
        correct: true,
      },
      {
        answer: "Add boiling water to the plant.",
        correct: false,
      },
    ],
    2: [
      {
        answer: "They release gas.",
        correct: false,
      },
      {
        answer: "They release chemical.",
        correct: false,
      },
      {
        answer: "They release oxygen during photosynthesis.",
        correct: true,
      },
    ],
    3: [
      {
        answer: "Cutting more trees to create shade.",
        correct: false,
      },
      {
        answer: "Leave the area and hope the trees will grow naturally.",
        correct: false,
      },
      {
        answer: "Plant new trees in the empty area.",
        correct: true,
      },
    ],
  };
  return (
    <div>
      {showResult ? (
        isCorrect ? (
          <CorrectAnswer onContinue={handleContinue} />
        ) : (
          <WrongAnswer
            onContinue={handleContinue}
            setCurrentLives={setCurrentLives}
          />
        )
      ) : (
        <>
          {currentPage === 3 && (
            <div className="relative bottom-15 z-50">
              <img
                src={ForestQuestion1}
                aria-hidden={true}
                className="w-full"
              ></img>
              <div className="flex items-center w-full justify-center">
                <div className="rounded w-[90%] bg-white/50 text-black text-center text-lg p-5 relative bottom-12">
                  <p className="font-bold">
                    The plants in the forest are turning yellow and being eaten
                    by insects.
                  </p>
                  <br />
                  <p className="font-bold">
                    Which action will BEST help the plant to grow healthy again?
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {answers[1].map((answer, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        className={`rounded-md border px-3 py-2 text-left transition-all ${
                          selectedIndex === i
                            ? "border-emerald-600 bg-emerald-100 text-emerald-900"
                            : "border-transparent bg-white/70 hover:bg-white"
                        }`}
                      >
                        {answer.answer}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={selectedIndex === null}
                    className={`mt-4 w-full rounded-md px-4 py-2 font-bold uppercase transition-all ${
                      selectedIndex === null
                        ? "cursor-not-allowed bg-slate-300 text-slate-600"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                    onClick={() => {
                      if (selectedIndex !== null) {
                        const correct = answers[1][selectedIndex].correct;
                        setIsCorrect(correct);
                        setShowResult(true);
                      }
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage === 6 && (
            <div className="relative bottom-15 z-50">
              <img
                src={ForestQuestion2}
                aria-hidden={true}
                className="w-full"
              ></img>
              <div className="flex items-center w-full justify-center">
                <div className="rounded w-[90%] bg-white/50 text-black font-semibold text-center text-lg p-5 relative bottom-12">
                  <p className="font-bold">
                    As you stroll in the forest, you notice that the number of
                    plants is lesser than expected, making the temperature
                    hotter.
                  </p>
                  <br />
                  <p className="font-bold">
                    How do plants help improve air temperature in the
                    environment?
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {answers[2].map((answer, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        className={`rounded-md border px-3 py-2 text-left transition-all ${
                          selectedIndex === i
                            ? "border-emerald-600 bg-emerald-100 text-emerald-900"
                            : "border-transparent bg-white/70 hover:bg-white"
                        }`}
                      >
                        {answer.answer}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={selectedIndex === null}
                    className={`mt-4 w-full rounded-md px-4 py-2 font-bold uppercase transition-all ${
                      selectedIndex === null
                        ? "cursor-not-allowed bg-slate-300 text-slate-600"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                    onClick={() => {
                      if (selectedIndex !== null) {
                        const correct = answers[2][selectedIndex].correct;
                        setIsCorrect(correct);
                        setShowResult(true);
                      }
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage === 8 && (
            <div className="relative bottom-15 z-50">
              <img
                src={ForestQuestion3}
                aria-hidden={true}
                className="w-full"
              ></img>
              <div className="flex items-center w-full justify-center">
                <div className="rounded w-[90%] bg-white/50 text-black font-semibold text-center text-lg p-5 relative bottom-12">
                  <p className="font-bold">
                    You wanted to take a rest but there is no shade due to trees
                    being cut down.
                  </p>
                  <br />
                  <p className="font-bold">
                    Which action will be the BEST choice to restore the shade in
                    the forest?
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {answers[3].map((answer, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        className={`rounded-md border px-3 py-2 text-left transition-all ${
                          selectedIndex === i
                            ? "border-emerald-600 bg-emerald-100 text-emerald-900"
                            : "border-transparent bg-white/70 hover:bg-white"
                        }`}
                      >
                        {answer.answer}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={selectedIndex === null}
                    className={`mt-4 w-full rounded-md px-4 py-2 font-bold uppercase transition-all ${
                      selectedIndex === null
                        ? "cursor-not-allowed bg-slate-300 text-slate-600"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                    onClick={() => {
                      if (selectedIndex !== null) {
                        const correct = answers[3][selectedIndex].correct;
                        setIsCorrect(correct);
                        setShowResult(true);
                      }
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ForestQuestions;
