// src/hooks/useAnimatedNumber.js
import { useState, useEffect } from "react";

export const useAnimatedNumber = (target, duration = 300, precision = 2) => {
  const [animatedValue, setAnimatedValue] = useState(target);

  useEffect(() => {
    const start = animatedValue;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = start + (target - start) * progress;
      setAnimatedValue(parseFloat(eased.toFixed(precision)));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, precision]);

  return animatedValue;
};
