import React from "react";
import SliderArrow from "../../../_shared/icons/SliderArrow/SliderArrow";
import Dots from "./DotsOnMobile/DotsOnMobile";
import "./sliderConrols.scss";

interface SliderControlsProps {
  activeIndex: number;
  totalPoints: number;
  onPrev: () => void;
  onNext: () => void;
  isMobile: boolean;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  activeIndex,
  totalPoints,
  onPrev,
  onNext,
  isMobile,
}) => {
  const formattedCurrent = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalPoints).padStart(2, "0");

  return (
    <div className="controls_container">
      <div>
        <span className="total_points">
          {formattedCurrent}/{formattedTotal}
        </span>
        <div className="buttons_container">
          <button
            className="circle_slider_button"
            onClick={onPrev}
            disabled={activeIndex === 0}
          >
            <SliderArrow
              style={{
                color: `${activeIndex === 0 ? "#a1abbd" : ""}`,
              }}
            />
          </button>

          <button
            className="circle_slider_button"
            onClick={onNext}
            disabled={activeIndex === totalPoints - 1}
          >
            <SliderArrow
              style={{
                transform: "rotate(180deg)",
                color: `${activeIndex === totalPoints - 1 ? "#a1abbd" : ""}`,
              }}
            />
          </button>
        </div>
      </div>
      {isMobile && <Dots total={totalPoints} active={activeIndex} />}
    </div>
  );
};

export default SliderControls;
