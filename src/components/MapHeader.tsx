import Woodbox from "../assets/map/woodbox.svg";
import Croco from "../assets/start/crocodile.svg";
import Deer from "../assets/start/deer.svg";
import Dog from "../assets/start/dog.svg";
import Elephant from "../assets/start/elephant.svg";

const MapHeader = () => {
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
      <button className="relative w-fit bottom-5">
        <img src={Woodbox} aria-hidden={true} className="object-fill" />
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <img src={animals[character]} alt={character} width={50} />
          <p className="capitalize text-black text-xl font-bold">{name}</p>
        </div>
      </button>
    </div>
  );
};

export default MapHeader;
