import React, { useEffect, useRef, useState } from "react";
import Event from "../../../utils/types/eventType/Event.types";
import SliderArrow from "../../_shared/icons/SliderArrow/SliderArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./slider.scss";

interface SliderProps {
  events?: Event[];
}

const Slider: React.FC<SliderProps> = ({ events }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const swiperRef = useRef<any>(null);

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!events) {
    return <div>Категория не найдена</div>;
  }

  return (
    <div className="slider_container">
      {!isMobile && (
        <>
          <button
            className="slider_button"
            onClick={() => swiperRef.current?.slidePrev()}
            style={{
              left: "-80px",
              opacity: isBeginning ? 0 : 1,
              pointerEvents: isBeginning ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            <SliderArrow style={{ color: "#3877EE" }} />
          </button>

          <button
            className="slider_button"
            onClick={() => swiperRef.current?.slideNext()}
            style={{
              right: "-80px",
              opacity: isEnd ? 0 : 1,
              pointerEvents: isEnd ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            <SliderArrow
              style={{ transform: "rotate(180deg)", color: "#3877EE" }}
            />
          </button>
        </>
      )}

      <Swiper
        modules={[Navigation, Mousewheel, FreeMode]}
        spaceBetween={isMobile ? 25 : 80}
        slidesPerView={isMobile ? 1.8 : 3}
        centeredSlides={isMobile}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        mousewheel={{
          forceToAxis: true,
        }}
        freeMode={{
          enabled: true,
          momentum: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
      >
        {events.map((event, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: isMobile ? "166px" : "320px",
              opacity: isMobile ? 0.5 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="slider_card">
              <h3>{event.date}</h3>
              <p>{event.info}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
