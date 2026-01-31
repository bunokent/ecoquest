import type React from "react";
import FunFactBanner from "../assets/forest/funfactbanner.svg";
import FunFactConvo1 from "../assets/city/funfact1.svg";
import FunFactConvo2 from "../assets/city/funfact2.svg";
import FunFactConvo3 from "../assets/city/funfact3.svg";
import FunFactNpc from "../assets/city/funfactnpc.svg";
import PlayBtn from "../assets/forest/playbtn.svg";

const CityFunFact = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      {currentPage === 4 && (
        <div className="relative bottom-15">
          <img src={FunFactBanner} aria-hidden={true} className="w-full"></img>
          <img
            src={FunFactConvo1}
            aria-hidden={true}
            className="relative bottom-35"
          ></img>
          <img
            src={FunFactNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-think"
          ></img>
        </div>
      )}

      {currentPage === 6 && (
        <div className="relative bottom-15">
          <img src={FunFactBanner} aria-hidden={true} className="w-full"></img>
          <img
            src={FunFactConvo2}
            aria-hidden={true}
            className="relative bottom-35"
          ></img>
          <img
            src={FunFactNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-think"
          ></img>
        </div>
      )}

      {currentPage === 8 && (
        <div className="relative bottom-15">
          <img src={FunFactBanner} aria-hidden={true} className="w-full"></img>
          <img
            src={FunFactConvo3}
            aria-hidden={true}
            className="relative bottom-35"
          ></img>
          <img
            src={FunFactNpc}
            aria-hidden={true}
            className="relative bottom-60 npc-think"
          ></img>
        </div>
      )}

      <button
        className="fixed bottom-5 right-10"
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );
};
export default CityFunFact;
