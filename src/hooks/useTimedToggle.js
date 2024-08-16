import { useRef, useState, useEffect } from "react";

function useTimedToggle(duration = 3000) {
  const [isActive, setIsActive] = useState(false);
  const isMessageShown = useRef(false);

  useEffect(() => {
    console.debug("useTimedToggle useEffect triggered", "isActive=", isActive);

    if (isActive && !isMessageShown.current) {
      isMessageShown.current = true;

      const timerId = setTimeout(() => {
        setIsActive(false);
        isMessageShown.current = false;
      }, duration);

      return () => clearTimeout(timerId);
    }
  }, [isActive, duration]);

  return [isActive, setIsActive];
}

export default useTimedToggle;
