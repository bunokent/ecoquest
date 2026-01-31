import { Link } from "react-router-dom";
import BackgroundVideo from "../assets/home/home.mp4";
import StartBtn from "../assets/home/startbtn.svg";

const Home = () => {
  return (
    <div>
      <div className="w-screen h-screen absolute top-0 left-0 -z-10">
        <video
          src={BackgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
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
