import Croco from "../assets/start/crocodile.svg";
import Deer from "../assets/start/deer.svg";
import Dog from "../assets/start/dog.svg";
import Elephant from "../assets/start/elephant.svg";
import Heart from "../assets/heart.svg";
import EmptyHeart from "../assets/emptyheart.svg";

const ZoneHeader = ({ currentLives }: { currentLives: number }) => {
  const lives = currentLives;
  const character = localStorage.getItem("character");
  const name = localStorage.getItem("name");
  const animals = {
    deer: Deer,
    crocodile: Croco,
    dog: Dog,
    elephant: Elephant,
  };

  return (
    <div>
      <div className="flex justify-between px-2 pt-1">
        <div className="flex items-center">
          <img src={animals[character]} width={60} alt={character} />
          <p className="text-xl text-white font-bold capitalize">{name}</p>
        </div>
        <div className="flex gap-2 items-center">
          {(() => {
            const results = [];
            for (let i = 0; i < 3; i++) {
              if (lives > i) {
                results.push(
                  <img src={Heart} width={40} alt="Heart" key={i}></img>,
                );
                continue;
              }
              results.push(
                <img
                  src={EmptyHeart}
                  width={40}
                  alt="Empty Heart"
                  key={i}
                ></img>,
              );
            }
            return results;
          })()}
        </div>
      </div>
    </div>
  );
};

export default ZoneHeader;
