import Congrats from "../assets/congratsbanner.svg";
import CongratsConvo from "../assets/correct.svg";
import HappyNpc from "../assets/city/happynpc.svg";
import PlayBtn from "../assets/forest/playbtn.svg";

const CityCorrectAnswer = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div>
      <img
        src={Congrats}
        aria-hidden={true}
        className="w-full relative bottom-15"
      ></img>
      <img
        src={CongratsConvo}
        aria-hidden={true}
        className="relative bottom-55"
      ></img>
      <img src={HappyNpc} aria-hidden={true} className="relative bottom-75" />

      <button className="fixed bottom-5 right-10" onClick={onContinue}>
        <img src={PlayBtn} alt="Play" />
      </button>
    </div>
  );
};

export default CityCorrectAnswer;
