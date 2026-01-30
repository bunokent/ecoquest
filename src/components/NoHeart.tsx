import NoHeartIcon from '../assets/noheart/no-heart.svg';
import ForestZone from '../assets/noheart/forest-bg.svg';
import RiverZone from '../assets/noheart/river-bg.svg';
import CityZone from '../assets/noheart/city-bg.svg';
import SchoolZone from '../assets/noheart/school-bg.svg';
import BeachZone from '../assets/noheart/beach-bg.svg';
import ReturnBtn from '../assets/noheart/returnbtn.svg';
import TryAgainBtn from '../assets/noheart/tryagainbtn.svg';

import { useNavigate } from "react-router-dom";

const NoHeart = ({ zone }: { zone: "forest" | "river" | "city" | "school" | "beach" }) => {
  const backgrounds = {
    forest: ForestZone,
    river: RiverZone,
    city: CityZone,
    school: SchoolZone,
    beach: BeachZone,
  };

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <img
        src={backgrounds[zone]}
        className="absolute inset-0 w-full h-full object-cover"
      />

        <div className="relative rounded-xl text-center">
            <img src={NoHeartIcon} className="w-full h-full object-cover mb-10" />
            <button
                onClick={() => navigate("/map")}
            >
                <img src={ReturnBtn} alt="Return" />
            </button>
            <button onClick={() => window.location.reload()}>
                <img src={TryAgainBtn} alt="Try Again" />
            </button>
        </div>
    </div>
  );
};

export default NoHeart;