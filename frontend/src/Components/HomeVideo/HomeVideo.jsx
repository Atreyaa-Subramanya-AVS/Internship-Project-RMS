import React from "react";
import "./style.css";

const HomeVideo = () => {
  return (
    <div className="main-home-video">
      <div className="home-video-container">
        <video autoPlay muted loop className="home-video">
          <source src="/Videos/Video1.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HomeVideo;
