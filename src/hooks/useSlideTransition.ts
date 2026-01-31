import { useState } from "react";

export const useSlideTransition = () => {
  const [isSliding, setIsSliding] = useState(false);

  const triggerSlide = (callback: () => void) => {
    setIsSliding(true);
    setTimeout(() => {
      callback();
      setIsSliding(false);
    }, 600);
  };

  return { isSliding, triggerSlide };
};
