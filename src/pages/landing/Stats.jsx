import React, { useState } from "react";
import CountUp from "react-countup";
import { FaPencilRuler, FaUsers } from "react-icons/fa";
import { FcReading } from "react-icons/fc";
import { LiaAwardSolid } from "react-icons/lia";
import ScrollTrigger from "react-scroll-trigger";

const Stats = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => {
        setCounterOn(true);
      }}
      onExit={() => {
        setCounterOn(false);
      }}
    >
        <div className="min-h-[70vh] w-full bg-gray-800 p-10 max-sm:p-8 text-white text-3xl max-sm:flex-col max-sm:justify-center gap-5 flex justify-between items-center">
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <FaUsers className="text-yellow-200 text-5xl" />
            <h1>{counterOn && <CountUp start={0} end={1200} delay={0} duration={3} />} +</h1>
            <p>Students Enrolled</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <LiaAwardSolid className="text-yellow-200 text-5xl" />
            <h1>{counterOn && <CountUp start={0} end={378} delay={0} duration={3} />} +</h1>
            <p>Best Awards Won</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <FaPencilRuler className="text-yellow-200 text-5xl" />
            <h1>{counterOn && <CountUp start={0} end={184} delay={0} duration={3} />} +</h1>
            <p>Classes Completed</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <FcReading className="text-yellow-200 text-5xl" />
            <h1>{counterOn && <CountUp start={0} end={320} delay={0} duration={3} />} +</h1>
            <p>Our Total Courses</p>
          </div>
        </div>
    </ScrollTrigger>
  );
};

export default Stats;
