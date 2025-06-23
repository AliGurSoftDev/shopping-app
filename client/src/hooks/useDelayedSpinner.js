import { useEffect, useState } from "react";

export function useDelayedSpinner(loading, delay = 200) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => setShowSpinner(true), delay);
    } else {
      setShowSpinner(false);
    }
    return () => {
      clearTimeout(timer);
    }; //Required to clear the timer when loading changes
  }, [loading, delay]);

  return showSpinner;
}
