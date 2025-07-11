import React from "react";
import { Carousel } from "antd";
import "animate.css";
import "../styles/banner.css";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.jpg";

const banners = [
  {
    img: banner1,
    title: "Selamat Datang di JendelaCilik!",
  },
  {
    img: banner2,
    title: "Belajar Ceria",
  },
];

const Banner = () => {
  return (
    <div className="banner-container">
      <Carousel autoplay>
        {banners.map((item, index) => (
          <div className="banner-slide" key={index}>
            <img
              src={item.img}
              alt={`banner-${index}`}
              className="banner-image animate__animated animate__bounceIn"
              style={{ animationDuration: "1.30s" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
