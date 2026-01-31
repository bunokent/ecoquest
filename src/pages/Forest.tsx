import { useEffect, useState } from "react";
import ZoneHeader from "../components/ZoneHeader";
import ForestIntro from "../components/ForestIntro";
import Background from "../assets/forest/background.svg";
import Background2 from "../assets/forest/background2.svg";
import Background3 from "../assets/forest/background3.svg";
import ForestFunFact from "../components/ForestFunFact";
import ForestQuestions from "../components/ForestQuestions";
import { useNavigate } from "react-router-dom";
import NoHeart from "../components/NoHeart";

const Forest = () => {
  let [currentLives, setCurrentLives] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  let currentBackground = Background;

  if (currentPage > 5 && currentPage < 8) {
    currentBackground = Background2;
  } else if (currentPage > 7) {
    currentBackground = Background3;
  }

  useEffect(() => {
    if (currentPage === 9 && currentLives > 0) {
      navigate("/forest/mini-games");
    }
  }, [currentPage]);

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
      {currentPage < 3 && (
        <ForestIntro
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {(currentPage === 3 || currentPage === 6 || currentPage === 8) && (
        <ForestQuestions
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setCurrentLives={setCurrentLives}
        />
      )}
      {(currentPage === 4 ||
        currentPage === 5 ||
        currentPage === 7 ||
        currentPage === 9) && (
        <ForestFunFact
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Forest;
