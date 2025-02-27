import React from "react";
import HTag from "./components/_shared/Htag/HTag";
import "./app.scss";
import MainSliders from "./components/Sliders/MainSliders";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="content">
          <HTag level={1} className="h1">
            Исторические даты
          </HTag>
          <MainSliders />
        </div>
      </div>
    </div>
  );
};

export default App;
