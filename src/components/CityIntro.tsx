import type React from "react";
import CityBanner from "../assets/city/citybanner.svg";
import CityConvo from "../assets/city/cityconvo.svg";
import CityNpc from "../assets/city/citynpc.svg";
import ObjectiveBanner from "../assets/city/objectivebanner.svg";
import ObjectiveConvo from "../assets/city/objectiveconvo.svg";
import ObjectiveNpc from "../assets/city/objectivenpc.svg";
import PlayBtn from "../assets/forest/playbtn.svg";

const CityIntro = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      {currentPage === 1 && (
        <div className="relative bottom-15">
          <img src={CityBanner} aria-hidden={true} className="w-full"></img>
          <img
            src={CityConvo}
            aria-hidden={true}
            className="relative bottom-35"
          ></img>
          <img
            src={CityNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-float"
          ></img>
        </div>
      )}

      {currentPage === 2 && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative bottom-15">
            <img
              src={ObjectiveBanner}
              aria-hidden={true}
              className="w-full"
            ></img>
            <img
              src={ObjectiveConvo}
              aria-hidden={true}
              className="relative bottom-15"
            ></img>
            <img
              src={ObjectiveNpc}
              aria-hidden={true}
              className="relative bottom-20 npc-float"
            ></img>
          </div>
        </div>
      )}

      <button
        className="fixed bottom-5 right-10"
        onClick={() => {
          setCurrentPage((prev) => prev + 1);
        }}
      >
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );
};

export default CityIntro;
