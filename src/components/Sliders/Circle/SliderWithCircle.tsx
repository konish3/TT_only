import React, { useEffect, useRef, useState } from "react";
import AnimatedNumbers from "./AnimatedNumbers/AnimatedNumbers";
import SliderControls from "./SliderControls/SliderControls";
import { EVENTS } from "../../../utils/events.constant";
import { gsap } from "gsap";
import "./sliderWithCircle.scss";

interface Props {
  setActiveCategoryId: (id: number) => void;
}

const SliderWithCircle: React.FC<Props> = ({ setActiveCategoryId }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentNumbers, setCurrentNumbers] = useState<{
    first: number;
    second: number;
  }>({
    first: EVENTS[0].dateInterval[0],
    second: EVENTS[0].dateInterval[1],
  });

  const circleRef = useRef<SVGCircleElement>(null);
  const pointsRef = useRef<(SVGCircleElement | null)[]>([]);
  const groupsRef = useRef<(SVGGElement | null)[]>([]);

  const circleRadius = 265;
  const centerX = 265;
  const centerY = 265;
  const dotRadius = 3;
  const angleStep = (2 * Math.PI) / EVENTS.length;
  const horizontalLineLength = 1440;
  const verticalLineLength = window.screen.height;

  const lineColor = "rgba(66, 86, 122, 0.1)";

  const targetAngle = -Math.PI / 3;

  const getInitialPointCoordinates = (index: number) => {
    const offsetAngle = targetAngle - angleStep * 0;

    const angle = angleStep * index + offsetAngle;

    const x = centerX + circleRadius * Math.cos(angle);
    const y = centerY + circleRadius * Math.sin(angle);

    return { x, y };
  };

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    const point = pointsRef.current[id];
    if (point) {
      gsap.to(point, {
        r: 28,
        duration: 0.3,
        fill: "white",
        stroke: "rgba(66, 86, 122, 0.1)",
        strokeWidth: 2,
      });
    }
  };

  const handleMouseLeave = (id: number) => {
    setHoveredId(null);

    const point = pointsRef.current[id];
    if (point && activeId !== id) {
      gsap.to(point, {
        r: dotRadius,
        duration: 0.3,
        fill: "rgba(66, 86, 122, 1)",
        stroke: "none",
      });
    }
  };

  const handleClick = (id: number) => {
    if (activeId === id) return;
    setActiveId(id);
    setAnimationCompleted(false);
    setActiveCategoryId(id);

    setCurrentNumbers({
      first: EVENTS[id].dateInterval[0],
      second: EVENTS[id].dateInterval[1],
    });

    const activePoint = pointsRef.current[id];
    if (activePoint) {
      gsap.to(activePoint, {
        r: 28,
        duration: 0.3,
        fill: "white",
        stroke: "rgba(66, 86, 122, 0.1)",
        strokeWidth: 2,
      });
    }

    EVENTS.forEach((event, index) => {
      const group = groupsRef.current[index];
      if (group) {
        const currentX = Number(
          group.getAttribute("data-x") ||
            centerX + circleRadius * Math.cos(angleStep * index)
        );
        const currentY = Number(
          group.getAttribute("data-y") ||
            centerY + circleRadius * Math.sin(angleStep * index)
        );
        const currentAngle = Math.atan2(currentY - centerY, currentX - centerX);
        let endAngle = targetAngle - angleStep * (id - index);

        if (endAngle < currentAngle) {
          endAngle += 2 * Math.PI;
        }

        gsap.to(
          { angle: currentAngle },
          {
            angle: endAngle,
            duration: 1,
            ease: "customEase",
            onUpdate: function () {
              const angle = this.targets()[0].angle;
              const newX = centerX + circleRadius * Math.cos(angle);
              const newY = centerY + circleRadius * Math.sin(angle);

              group.setAttribute("transform", `translate(${newX}, ${newY})`);
              group.setAttribute("data-x", newX.toString());
              group.setAttribute("data-y", newY.toString());
            },
            onComplete: () => {
              if (index === id) {
                setAnimationCompleted(true);
              }
            },
          }
        );
      }
    });

    pointsRef.current.forEach((point, index) => {
      if (point && index !== id) {
        gsap.to(point, {
          r: dotRadius,
          fill: "rgba(66, 86, 122, 1)",
          stroke: "none",
          duration: 0.3,
        });
      }
    });
  };

  const handlePrev = () => {
    if (activeId !== null && activeId > 0) {
      handleClick(activeId - 1);
    }
  };

  const handleNext = () => {
    if (activeId !== null && activeId < EVENTS.length - 1) {
      handleClick(activeId + 1);
    }
  };

  gsap.registerEase("customEase", (progress) => {
    return progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;
  });

  useEffect(() => {
    setActiveId(0);
    setAnimationCompleted(true);
    const firstPoint = pointsRef.current[0];
    if (firstPoint) {
      gsap.set(firstPoint, {
        r: 28,
        fill: "white",
        stroke: "rgba(66, 86, 122, 0.1)",
        strokeWidth: 2,
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 847);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="slider_circle_container">
      <div className="numbers_content">
        <AnimatedNumbers
          firstNumber={currentNumbers.first}
          secondNumber={currentNumbers.second}
        />
      </div>
      {!isMobile && (
        <svg
          style={{ overflow: "visible" }}
          className="svg"
          width="530"
          height="530"
          viewBox="0 0 530 530"
        >
          {/* Круг */}
          <circle
            ref={circleRef}
            cx={centerX}
            cy={centerY}
            r={circleRadius}
            stroke={lineColor}
            strokeWidth="2"
            fill="none"
          />

          {/* Линии из центра (выходят за пределы круга) */}
          <line
            x1={centerX - horizontalLineLength / 2} // Начало линии (левая сторона)
            y1={centerY}
            x2={centerX + horizontalLineLength / 2} // Конец линии (правая сторона)
            y2={centerY}
            stroke={lineColor}
            strokeWidth="2"
          />

          {/* Вертикальная линия */}
          <line
            x1={centerX}
            y1={centerY - verticalLineLength / 2} // Начало линии (верхняя сторона)
            x2={centerX}
            y2={centerY + verticalLineLength / 2} // Конец линии (нижняя сторона)
            stroke={lineColor}
            strokeWidth="2"
          />

          {EVENTS.map((event, index) => {
            const { x: dotX, y: dotY } = getInitialPointCoordinates(index);
            return (
              <g
                key={event.id}
                ref={(el) => {
                  groupsRef.current[index] = el;
                }}
                transform={`translate(${dotX}, ${dotY})`}
                data-x={dotX}
                data-y={dotY}
              >
                {/* Точка */}
                <circle
                  ref={(el) => {
                    pointsRef.current[index] = el;
                  }}
                  cx={0}
                  cy={0}
                  r={dotRadius}
                  fill="rgba(66, 86, 122, 1)"
                  onMouseEnter={() => handleMouseEnter(event.id)}
                  onMouseLeave={() => handleMouseLeave(event.id)}
                  onClick={() => handleClick(event.id)}
                  style={{ cursor: "pointer", padding: "10px" }}
                  stroke={activeId === event.id ? "black" : "none"} // Обводка для активной точки
                  strokeWidth={2}
                />

                {/* Текст (id) при наведении */}
                {(hoveredId === event.id || activeId === event.id) && (
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#42567A"
                    fontSize="16"
                    style={{
                      userSelect: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                    onMouseEnter={() => handleMouseEnter(event.id)}
                    onMouseLeave={() => handleMouseLeave(event.id)}
                    onClick={() => handleClick(event.id)}
                  >
                    {event.id + 1}
                  </text>
                )}

                {/* Текст (id и eventName) */}
                {activeId === event.id && animationCompleted && (
                  <text
                    x={40} // Смещение текста вправо
                    y={0}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fill="#42567A"
                    fontSize="16"
                    style={{ fontSize: "20px", fontWeight: 700 }}
                  >
                    {event.eventName}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}

      <div className="slider_conrols_container">
        <SliderControls
          isMobile={isMobile}
          activeIndex={activeId !== null ? activeId : 0}
          totalPoints={EVENTS.length}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default SliderWithCircle;
