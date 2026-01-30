import ForestQuestion1 from "../assets/forest/question1banner.svg";
import ForestQuestion2 from "../assets/forest/question2banner.svg";
import ForestQuestion3 from "../assets/forest/question3banner.svg";
import { useState } from "react";
import CityCorrectAnswer from "./CityCorrectAnswer";
import CityWrongAnswer from "./CityWrongAnswer";

const CityQuestions = ({
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
        answer: "Copper Sheets",
        correct: false,
      },
      {
        answer: "Coconut husk/ wood fiber",
        correct: true,
      },
      {
        answer: "Iron bars",
        correct: false,
      },
    ],
    2: [
      {
        answer: "Sound to Heat",
        correct: false,
      },
      {
        answer: "Chemical to Electrical to Light",
        correct: true,
      },
      {
        answer: "Mechanical to Sound",
        correct: false,
      },
    ],
    3: [
      {
        answer: "Rubber Band",
        correct: false,
      },
      {
        answer: "Plastic Straw",
        correct: false,
      },
      {
        answer: "Copper Wire",
        correct: true,
      },
    ],
  };
  return (
    <div>
      {showResult ? (
        isCorrect ? (
          <CityCorrectAnswer onContinue={handleContinue} />
        ) : (
          <CityWrongAnswer
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
                    The sun is hitting the metal roof of the Sports Center,
                    making the room inside dangerously hot for the players.
                  </p>
                  <br />
                  <p className="font-bold">
                    Which material should be placed under the roof to block the
                    heat from entering the room? 
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {answers[1].map((answer, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        className={`rounded-md border px-3 py-2 text-left transition-all ${
                          selectedIndex === i
                            ? "border-gray-800 bg-amber-100 text-gray-900"
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
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-gray-900 text-white hover:bg-black"
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
          {currentPage === 5 && (
            <div className="relative bottom-15 z-50">
              <img
                src={ForestQuestion2}
                aria-hidden={true}
                className="w-full"
              ></img>
              <div className="flex items-center w-full justify-center">
                <div className="rounded w-[90%] bg-white/50 text-black text-center text-lg p-5 relative bottom-12">
                  <p className="font-bold">
                    A streetlight in the city went dark because its battery ran
                    out. You need to replace it so people can safely walk and
                    drive at night.
                  </p>
                  <br />
                  <p className="font-bold">
                    What energy transformation occurs when the battery makes the
                    bulb light up?
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {answers[2].map((answer, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        className={`rounded-md border px-3 py-2 text-left transition-all ${
                          selectedIndex === i
                            ? "border-gray-800 bg-amber-100 text-gray-900"
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
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-gray-900 text-white hover:bg-black"
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
          {currentPage === 7 && (
            <div className="relative bottom-15 z-50">
              <img
                src={ForestQuestion3}
                aria-hidden={true}
                className="w-full"
              ></img>
              <div className="flex items-center w-full justify-center">
                <div className="rounded w-[90%] bg-white/50 text-black text-center text-lg p-5 relative bottom-12">
                  <p className="font-bold">
                    A wire in the City Hall’s generator snapped. To fix the flow
                    of electricity, you need a material that lets energy pass.
                  </p>
                  <br />
                  <p className="font-bold">
                    Which material is the best conductor to use to reconnect the
                    broken wire?
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {answers[3].map((answer, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedIndex(i)}
                        className={`rounded-md border px-3 py-2 text-left transition-all ${
                          selectedIndex === i
                            ? "border-gray-800 bg-amber-100 text-gray-900"
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
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-gray-900 text-white hover:bg-black"
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

export default CityQuestions;
