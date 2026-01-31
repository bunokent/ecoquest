import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ZoneHeader from "../components/ZoneHeader";
import NoHeart from "../components/NoHeart";
import { useSlideTransition } from "../hooks/useSlideTransition";

// Backgrounds
import Background1 from "../assets/city/background1.svg";
import Background2 from "../assets/city/background2.svg";
import Background3 from "../assets/city/background3.svg";
import Background4 from "../assets/city/background4.svg";

// Intro assets
import CityBanner from "../assets/city/citybanner.svg";
import CityConvo from "../assets/city/cityconvo.svg";
import CityNpc from "../assets/city/citynpc.svg";
import ObjectiveBanner from "../assets/city/objectivebanner.svg";
import ObjectiveConvo from "../assets/city/objectiveconvo.svg";
import ObjectiveNpc from "../assets/city/objectivenpc.svg";

// Question assets
import ForestQuestion1 from "../assets/forest/question1banner.svg";
import ForestQuestion2 from "../assets/forest/question2banner.svg";
import ForestQuestion3 from "../assets/forest/question3banner.svg";

// Fun fact assets
import FunFactBanner from "../assets/forest/funfactbanner.svg";
import FunFactConvo1 from "../assets/city/funfact1.svg";
import FunFactConvo2 from "../assets/city/funfact2.svg";
import FunFactConvo3 from "../assets/city/funfact3.svg";
import FunFactNpc from "../assets/city/funfactnpc.svg";

// Result assets
import Congrats from "../assets/congratsbanner.svg";
import CongratsConvo from "../assets/correct.svg";
import HappyNpc from "../assets/city/happynpc.svg";
import WrongBanner from "../assets/wrongbanner.svg";
import WrongAns from "../assets/wronganswer.svg";
import CryNpc from "../assets/city/crynpc.svg";

// Buttons
import PlayBtn from "../assets/forest/playbtn.svg";

const City = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSliding, triggerSlide } = useSlideTransition();

  useEffect(() => {
    if (currentPage === 9 && currentLives > 0) {
      navigate("/city/mini-games");
    }
  }, [currentPage, currentLives, navigate]);

  let currentBackground = Background1;

  if (currentPage > 2 && currentPage < 5) {
    currentBackground = Background2;
  } else if (currentPage > 4 && currentPage < 7) {
    currentBackground = Background3;
  } else if (currentPage > 7) {
    currentBackground = Background4;
  }

  const handleContinue = () => {
    triggerSlide(() => {
      setShowResult(false);
      setSelectedIndex(null);
      setCurrentPage((prev) => prev + 1);
    });
  };

  const handleWrongContinue = () => {
    triggerSlide(() => {
      setCurrentLives((prev) => Math.max(0, prev - 1));
      setShowResult(false);
      setSelectedIndex(null);
      setCurrentPage((prev) => prev + 1);
    });
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

  // Render Intro
  const renderIntro = () => (
    <div className={isSliding ? "animate-slide-out" : ""}>
      {currentPage === 1 && (
        <div className="relative bottom-15">
          <img src={CityBanner} aria-hidden={true} className="w-full" />
          <img
            src={CityConvo}
            aria-hidden={true}
            className="relative bottom-35"
          />
          <img
            src={CityNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-float"
          />
        </div>
      )}

      {currentPage === 2 && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative bottom-15">
            <img src={ObjectiveBanner} aria-hidden={true} className="w-full" />
            <img
              src={ObjectiveConvo}
              aria-hidden={true}
              className="relative bottom-15"
            />
            <img
              src={ObjectiveNpc}
              aria-hidden={true}
              className="relative bottom-20 npc-float"
            />
          </div>
        </div>
      )}

      <button
        className="fixed bottom-5 right-10"
        onClick={() => triggerSlide(() => setCurrentPage((prev) => prev + 1))}
      >
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );

  // Render Fun Facts
  const renderFunFact = () => (
    <div className={isSliding ? "animate-slide-out" : ""}>
      {currentPage === 4 && (
        <div className="relative bottom-15">
          <img src={FunFactBanner} aria-hidden={true} className="w-full" />
          <img
            src={FunFactConvo1}
            aria-hidden={true}
            className="relative bottom-35"
          />
          <img
            src={FunFactNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-think"
          />
        </div>
      )}

      {currentPage === 6 && (
        <div className="relative bottom-15">
          <img src={FunFactBanner} aria-hidden={true} className="w-full" />
          <img
            src={FunFactConvo2}
            aria-hidden={true}
            className="relative bottom-35"
          />
          <img
            src={FunFactNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-think"
          />
        </div>
      )}

      {currentPage === 8 && (
        <div className="relative bottom-15">
          <img src={FunFactBanner} aria-hidden={true} className="w-full" />
          <img
            src={FunFactConvo3}
            aria-hidden={true}
            className="relative bottom-35"
          />
          <img
            src={FunFactNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-think"
          />
        </div>
      )}

      <button
        className="fixed bottom-5 right-10"
        onClick={() => triggerSlide(() => setCurrentPage((prev) => prev + 1))}
      >
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );

  // Render Questions
  const renderQuestions = () => {
    if (showResult) {
      return isCorrect ? renderCorrectAnswer() : renderWrongAnswer();
    }

    const questionNumber = currentPage === 3 ? 1 : currentPage === 5 ? 2 : 3;
    const questionImage =
      questionNumber === 1
        ? ForestQuestion1
        : questionNumber === 2
          ? ForestQuestion2
          : ForestQuestion3;

    const questionText =
      questionNumber === 1
        ? {
            title:
              "The sun is hitting the metal roof of the Sports Center, making the room inside dangerously hot for the players.",
            question:
              "Which material should be placed under the roof to block the heat from entering the room?",
          }
        : questionNumber === 2
          ? {
              title:
                "A streetlight in the city went dark because its battery ran out. You need to replace it so people can safely walk and drive at night.",
              question:
                "What energy transformation occurs when the battery makes the bulb light up?",
            }
          : {
              title:
                "A wire in the City Hall's generator snapped. To fix the flow of electricity, you need a material that lets energy pass.",
              question:
                "Which material is the best conductor to use to reconnect the broken wire?",
            };

    return (
      <div className="relative bottom-15 z-50">
        <img src={questionImage} aria-hidden={true} className="w-full" />
        <div className="flex items-center w-full justify-center">
          <div className="rounded w-[90%] bg-white/50 text-black text-center text-lg p-5 relative bottom-12">
            <p className="font-bold">{questionText.title}</p>
            <br />
            <p className="font-bold">{questionText.question}</p>
            <div className="mt-4 flex flex-col gap-2">
              {answers[questionNumber as keyof typeof answers].map(
                (answer, i) => (
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
                ),
              )}
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
                  const correct =
                    answers[questionNumber as keyof typeof answers][
                      selectedIndex
                    ].correct;
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
    );
  };

  return (
    <div className="overflow-hidden h-screen">
      <div className="-z-10 fixed inset-0 w-screen h-screen">
        <img
          src={currentBackground}
          aria-hidden={true}
          className="object-cover w-full"
        />
      </div>
      {currentLives === 0 && <NoHeart zone="city" />}
      <ZoneHeader currentLives={currentLives} />

      {currentPage < 3 && renderIntro()}

      {(currentPage === 3 || currentPage === 5 || currentPage === 7) &&
        renderQuestions()}

      {(currentPage === 4 || currentPage === 6 || currentPage === 8) &&
        renderFunFact()}
    </div>
  );
};

export default City;
