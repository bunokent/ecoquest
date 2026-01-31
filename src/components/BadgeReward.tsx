import { Link } from "react-router-dom";

interface BadgeRewardProps {
  background: string;
  badge: string;
  nextZone?: string;
  zoneName: string;
}

const BadgeReward = ({
  background,
  badge,
  nextZone,
  zoneName,
}: BadgeRewardProps) => {
  const progress = parseInt(localStorage.getItem("progress") || "1", 10);

  const canGoNext = progress < 5;

  return (
    <div>
      <div className="-z-10 fixed inset-0 w-screen h-screen">
        <img
          src={background}
          aria-hidden={true}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center h-screen animate-fade-in relative bottom-20">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
            Congratulations!
          </h1>
          <p className="text-2xl text-white drop-shadow-md">
            You've completed the {zoneName} zone!
          </p>
        </div>

        <div className="relative animate-bounce-slow mb-12">
          <img
            src={badge}
            alt={`${zoneName} Badge`}
            className="w-50 h-64 drop-shadow-2xl transform hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        </div>

        <div className="flex gap-3 items-center justify-center">
          <Link
            to="/map"
            className="bg-gradient-to-b from-gray-400 to-gray-500 p-3 px-6 rounded-lg text-white font-bold text-sm uppercase shadow-lg hover:shadow-2xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Back to Map
          </Link>

          {nextZone && canGoNext && (
            <Link
              to={`/${nextZone}`}
              className="bg-gradient-to-b from-green-400 to-green-500 p-3 px-6 rounded-lg text-white font-bold text-sm uppercase shadow-lg hover:shadow-2xl hover:from-green-500 hover:to-green-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Next Zone
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeReward;
