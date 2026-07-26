import { useEffect, useRef } from "react";
import myPhoto from "../assets/myphoto.jpg";
import "./PaperImg.css";

const PaperImg = () => {
  return (
    <div className="paper-img-stage">
      <div className="paper-img-float">
        <div className="paper-img-card">
          <img
            src={myPhoto}
            alt="Profile"
            className="paper-img-photo"
            draggable="false"
          />
          <div className="paper-img-gloss" aria-hidden="true" />
        </div>
        <div className="paper-img-shadow" aria-hidden="true" />
      </div>
    </div>
  );
};

export default PaperImg;

