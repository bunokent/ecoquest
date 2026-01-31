import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ZoneHeader from "../components/ZoneHeader";
import NoHeart from "../components/NoHeart";
import { useSlideTransition } from "../hooks/useSlideTransition";

// Backgrounds
import Background from "../assets/forest/background.svg";
import Background2 from "../assets/forest/background2.svg";
import Background3 from "../assets/forest/background3.svg";
import CorrectBackground from "../assets/forest/minigamesbg.svg";

// Intro assets
import ForestBanner from "../assets/forest/forestbanner.svg";
import ForestConvo from "../assets/forest/forestconvo.svg";
import ForestNpc from "../assets/forest/forestnpc.svg";
import ObjectiveBanner from "../assets/forest/objectivebanner.svg";
import ObjectiveConvo from "../assets/forest/objectiveconvo.svg";
import ObjectiveNpc from "../assets/forest/objectivenpc.svg";

// Question assets
import ForestQuestion1 from "../assets/forest/question1banner.svg";
import ForestQuestion2 from "../assets/forest/question2banner.svg";
import ForestQuestion3 from "../assets/forest/question3banner.svg";

// Fun fact assets
import FunFactBanner from "../assets/forest/funfactbanner.svg";
import FunFactConvo1 from "../assets/forest/funfactconvo1.svg";
import FunFactConvo2 from "../assets/forest/funfactconvo2.svg";
import FunFactConvo3 from "../assets/forest/funfactconvo3.svg";
import FunFactConvo4 from "../assets/forest/funfactconvo4.svg";
import FunFactNpc from "../assets/forest/funfactnpc.svg";

// Result assets
import Congrats from "../assets/congratsbanner.svg";
import CongratsConvo from "../assets/correct.svg";
import HappyNpc from "../assets/happynpc.svg";
import WrongBanner from "../assets/wrongbanner.svg";
import WrongAns from "../assets/wronganswer.svg";
import CryNpc from "../assets/crynpc.svg";

// Buttons
import PlayBtn from "../assets/forest/playbtn.svg";

const Forest = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSliding, triggerSlide } = useSlideTransition();

  let currentBackground = Background;

  if (showResult && isCorrect) {
    currentBackground = CorrectBackground;
  } else if (currentPage > 5 && currentPage < 8) {
    currentBackground = Background2;
  } else if (currentPage > 7) {
    currentBackground = Background3;
  }

  useEffect(() => {
    if (currentPage === 9 && currentLives > 0) {
      navigate("/forest/mini-games");
    }
  }, [currentPage, currentLives, navigate]);

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
      <img
        src={HappyNpc}
        aria-hidden={true}
        className="relative bottom-75 npc-float"
      />
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
      <img
        src={CryNpc}
        aria-hidden={true}
        className="relative bottom-40 npc-float"
      />
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
          <img src={ForestBanner} aria-hidden={true} className="w-full" />
          <img
            src={ForestConvo}
            aria-hidden={true}
            className="relative bottom-35"
          />
          <img
            src={ForestNpc}
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

      {currentPage === 5 && (
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

      {currentPage === 7 && (
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

      {currentPage === 9 && (
        <div className="relative bottom-15">
          <img src={FunFactBanner} aria-hidden={true} className="w-full" />
          <img
            src={FunFactConvo4}
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

    const questionNumber = currentPage === 3 ? 1 : currentPage === 6 ? 2 : 3;
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
              "The plants in the forest are turning yellow and being eaten by insects.",
            question:
              "Which action will BEST help the plant to grow healthy again?",
          }
        : questionNumber === 2
          ? {
              title:
                "As you stroll in the forest, you notice that the number of plants is lesser than expected, making the temperature hotter.",
              question:
                "How do plants help improve air temperature in the environment?",
            }
          : {
              title:
                "You wanted to take a rest but there is no shade due to trees being cut down.",
              question:
                "Which action will be the BEST choice to restore the shade in the forest?",
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
                        ? "border-emerald-600 bg-emerald-100 text-emerald-900"
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
                  ? "cursor-not-allowed bg-slate-300 text-slate-600"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
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
    <div className="overflow-hidden max-h-screen">
      <div className="-z-10 absolute top-0  left-0 w-screen h-screen">
        <img
          src={currentBackground}
          aria-hidden={true}
          className="object-cover w-full  h-full"
        />
      </div>
      {currentLives === 0 && <NoHeart zone="forest" />}
      <ZoneHeader currentLives={currentLives} />

      {currentPage < 3 && renderIntro()}

      {(currentPage === 3 || currentPage === 6 || currentPage === 8) &&
        renderQuestions()}

      {(currentPage === 4 ||
        currentPage === 5 ||
        currentPage === 7 ||
        currentPage === 9) &&
        renderFunFact()}
    </div>
  );
};

export default Forest;
