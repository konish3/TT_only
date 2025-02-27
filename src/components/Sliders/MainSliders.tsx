import React, { useState } from "react";
import { EVENTS } from "../../utils/events.constant";
import Slider from "./Slider/Slider";
import SliderWithCircle from "./Circle/SliderWithCircle";
import "./mainSliders.scss";

const MainSliders: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
  const activeCategory = EVENTS.find((event) => event.id === activeCategoryId);
  return (
    <div className="sliders_wrapper">
      <SliderWithCircle setActiveCategoryId={setActiveCategoryId} />
      <Slider events={activeCategory?.events} />
    </div>
  );
};

export default MainSliders;
