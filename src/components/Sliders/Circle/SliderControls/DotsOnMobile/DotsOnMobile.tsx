import React from "react";
import "./dotsOnMobile.scss";

interface DotsProps {
  total: number;
  active: number;
}

const Dots: React.FC<DotsProps> = ({ total, active }) => {
  return (
    <div className="dots_container">
      {Array.from({ length: total }).map((_, index) => (
        <div
          className="dot"
          key={index}
          style={{
            backgroundColor: index === active ? "#42567A" : "#a1abbd",
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
};

export default Dots;
