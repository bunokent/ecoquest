import { Link } from "react-router-dom";
import Background from "../assets/home/home.svg";
import StartBtn from "../assets/home/startbtn.svg";

const Home = () => {
  return (
    <div>
      <div className="w-screen h-screen absolute top-0 left-0 -z-10">
        <img src={Background} alt="Home Background" className="w-full h-full object-cover md:object-contain md:mx-auto md:bg-[#1B4A6D]" />
      </div>
      <div className="w-screen h-screen flex items-center justify-center">
        <Link to={"/start"} className="mt-160">
          <img
            src={StartBtn}
            aria-hidden={true}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
