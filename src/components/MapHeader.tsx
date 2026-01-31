import Woodbox from "../assets/map/woodbox.png";
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
  const characterKey =
    character && character in animals
      ? (character as keyof typeof animals)
      : null;

  return (
    <div>
      <button className="relative w-fit bottom-5">
        <img src={Woodbox} aria-hidden={true} className="object-fill" />
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          {characterKey && (
            <img src={animals[characterKey]} alt={characterKey} width={50} />
          )}
          <p className="capitalize text-black text-xl font-bold">{name}</p>
        </div>
      </button>
    </div>
  );
};

export default MapHeader;
