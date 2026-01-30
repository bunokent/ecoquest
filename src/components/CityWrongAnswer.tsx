import WrongBanner from "../assets/wrongbanner.svg";
import WrongAns from "../assets/wronganswer.svg";
import CryNpc from "../assets/city/crynpc.svg";
import PlayBtn from "../assets/forest/playbtn.svg";
import type React from "react";
import type { SetStateAction } from "react";

const CityWrongAnswer = ({
  onContinue,
  setCurrentLives,
}: {
  onContinue: () => void;
  setCurrentLives: React.Dispatch<SetStateAction<number>>;
}) => {
  const handleContinue = () => {
    setCurrentLives((prev) => Math.max(0, prev - 1));
    onContinue();
  };

  return (
    <div>
      <img
        src={WrongBanner}
        aria-hidden={true}
        className="w-full relative "
      ></img>
      <img
        src={WrongAns}
        aria-hidden={true}
        className="relative bottom-20"
      ></img>
      <img src={CryNpc} aria-hidden={true} className="relative bottom-40" />
      <button className="fixed bottom-5 right-10" onClick={handleContinue}>
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );
};

export default CityWrongAnswer;
