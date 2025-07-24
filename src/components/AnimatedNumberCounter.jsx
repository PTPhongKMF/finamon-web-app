import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

function AnimatedNumberCounter({ count, countName = "count" }) {
  const [showRealCount, setShowRealCount] = useState(false);
  const fakePeak = 99;
  const threshold = 100;

  useEffect(() => {
    if (count < threshold) {
      const timer = setTimeout(() => {
        setShowRealCount(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShowRealCount(true);
    }
  }, [count]);

  return (
    <div className="text-3xl font-bold text-gray-800">
      {showRealCount ? (
        <CountUp
          start={count < threshold ? fakePeak : 0}
          end={count}
          duration={1.5}
        />
      ) : (
        <CountUp start={0} end={fakePeak} duration={1} />
      )}
      <span className="ml-2 text-lg font-medium text-gray-600">{countName}</span>
    </div>
  );
};

export default AnimatedNumberCounter;
