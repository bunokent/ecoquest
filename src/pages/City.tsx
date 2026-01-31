import { useNavigate } from "react-router-dom";
import Background1 from "../assets/city/background1.svg";
import Background2 from "../assets/city/background2.svg";
import Background3 from "../assets/city/background3.svg";
import Background4 from "../assets/city/background4.svg";
import { useEffect, useState } from "react";
import ZoneHeader from "../components/ZoneHeader";
import CityIntro from "../components/CityIntro";
import CityQuestions from "../components/CityQuestions";
import CityFunFact from "./CityFunFact";
import NoHeart from "../components/NoHeart";

const City = () => {
  let [currentLives, setCurrentLives] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage === 9 && currentLives > 0) {
      navigate("/city/mini-games");
    }
  }, [currentPage]);

  let currentBackground = Background1;

  if (currentPage > 2 && currentPage < 5) {
    currentBackground = Background2;
  } else if (currentPage > 4 && currentPage < 7) {
    currentBackground = Background3;
  } else if (currentPage > 7) {
    currentBackground = Background4;
  }

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
      {currentPage < 3 && (
        <CityIntro currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      {(currentPage === 3 || currentPage === 5 || currentPage === 7) && (
        <CityQuestions
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setCurrentLives={setCurrentLives}
        />
      )}
      {(currentPage === 4 || currentPage === 6 || currentPage === 8) && (
        <CityFunFact
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default City;
