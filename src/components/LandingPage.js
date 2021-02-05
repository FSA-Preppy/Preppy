import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "../styles/landingpagestyle.css";

import recipe from "../styles/images/recipe2.png";
import search from "../styles/images/search.png";
import fridge from "../styles/images/fridge.png";
import preppyLogo from "../styles/images/PreppyLogoFinal.png";

SwiperCore.use([Navigation, Pagination, A11y]);

const LandingPage = () => {
  return (
    <>
      <Swiper
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        onReachEnd={() => console.log("reached the end!")}
      >
        <SwiperSlide>
          <div className="image-container">
            <img src={preppyLogo} alt="" id="logo-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img src={search} alt="" />
            <p className="landingDesc">SCAN YOUR FOOD.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img src={fridge} alt="" />
            <p className="landingDesc">STORE INGREDIENTS IN YOUR FRIDGE.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img src={recipe} alt="" />
            <p className="landingDesc">
              RECEIVE RECIPE RECOMMENDATIONS BASED ON YOUR AVAILABLE
              INGREDIENTS!
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="button-container">
        <button id="landing-page-btn">
          <Link to="/auth" className="get-started">
            Get Started
          </Link>
        </button>
      </div>
    </>
  );
};

export default LandingPage;
