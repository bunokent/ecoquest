import { useState } from "react";
import ZoneHeader from "../components/ZoneHeader";

const Forest = () => {
  let [currentLives, setCurrentLives] = useState<number>(2);
  return (
    <div>
      <ZoneHeader currentLives={currentLives} />
    </div>
  );
};

export default Forest;
