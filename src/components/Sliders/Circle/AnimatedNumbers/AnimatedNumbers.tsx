import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./animatedNumbers.scss";

interface AnimatedNumbersProps {
  firstNumber: number;
  secondNumber: number;
}

const AnimatedNumbers: React.FC<AnimatedNumbersProps> = ({
  firstNumber,
  secondNumber,
}) => {
  const [currentFirst, setCurrentFirst] = useState(firstNumber);
  const [currentSecond, setCurrentSecond] = useState(secondNumber);

  const firstNumberRef = useRef<HTMLSpanElement>(null);
  const secondNumberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to(
      { value: currentFirst },
      {
        duration: 1,
        value: firstNumber,
        onUpdate: function () {
          setCurrentFirst(Math.round(this.targets()[0].value));
        },
      }
    );
    gsap.to(
      { value: currentSecond },
      {
        duration: 1,
        value: secondNumber,
        onUpdate: function () {
          setCurrentSecond(Math.round(this.targets()[0].value));
        },
      }
    );
  }, [firstNumber, secondNumber]);

  return (
    <div className="numbers_container">
      <span
        className="date_number"
        ref={firstNumberRef}
        style={{
          color: "#5d5fef",
        }}
      >
        {currentFirst}
      </span>
      <span
        className="date_number"
        ref={secondNumberRef}
        style={{
          color: "#ef5da8",
        }}
      >
        {currentSecond}
      </span>
    </div>
  );
};

export default AnimatedNumbers;
