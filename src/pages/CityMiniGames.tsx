import { useState } from "react";
import ZoneHeader from "../components/ZoneHeader";
import NoHeart from "../components/NoHeart";
import MatchingGame from "../components/MatchingGame";
import { useSlideTransition } from "../hooks/useSlideTransition";

import Background from "../assets/city/background4.svg";
import MiniGame from "../assets/forest/minigamebanner.svg";
import MiniGameConvo from "../assets/city/minigameconvo.svg";
import MinigameNpc from "../assets/city/minigamenpc.svg";
import PlayBtn from "../assets/forest/playbtn.svg";
import MatchType from "../assets/city/matchtype.svg";

// Result assets
import Congrats from "../assets/congratsbanner.svg";
import CongratsConvo from "../assets/correct.svg";
import HappyNpc from "../assets/city/happynpc.svg";

const CityMiniGames = () => {
  const [currentLives, setCurrentLives] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isSliding, triggerSlide } = useSlideTransition();

  const columna = {
    1: "Rubber boots",
    2: "Copper wiring",
    3: "Fresh battery",
  };

  const columnb = {
    1: "A Conductor that allows electricity to flow easily",
    2: "Changes Light Energy into Sound Energy.",
    3: "An insulator that protects you from electric shock.",
    4: "Stores Chemical Energy to be used as Electricity.",
  };

  const answers = {
    1: 3,
    2: 1,
    3: 4,
  };

  const handleMatchingComplete = () => {
    setCurrentPage(3);
  };

  const handleContinue = () => {
    triggerSlide(() => {
      setCurrentPage((prev) => prev + 1);
    });
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
      {currentLives === 0 && <NoHeart zone="city" />}
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
      {currentPage === 2 && (
        <>
          <img
            src={MatchType}
            aria-hidden={true}
            className="w-full relative bottom-15"
          />
          <MatchingGame
            columnA={columna}
            columnB={columnb}
            answers={answers}
            onComplete={handleMatchingComplete}
            setCurrentLives={setCurrentLives}
          />
        </>
      )}
      {currentPage === 3 && renderCorrectAnswer()}

      {currentPage === 1 && (
        <button className="fixed bottom-5 right-10">
          <img
            src={PlayBtn}
            alt="Play"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          />
        </button>
      )}
    </div>
  );
};

export default CityMiniGames;
