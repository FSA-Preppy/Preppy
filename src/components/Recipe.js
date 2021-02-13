import React from "react";
import { connect } from "react-redux";
import "../styles/recipestyle.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const useStyles = makeStyles({
  root: {
    width: 320,
    height: 370,
    padding: 3,
  },
  media: {
    height: 270,
  },
});

const Recipe = (props) => {
  const { recipes } = props;
  const classes = useStyles();

  return (
    <>
      <div className="animation-area">
        <div className="header-container">
          <h1 className="title">Recipes</h1>
        </div>

        <ul className="box-area">
          <div className="body">
            <div className="recipes-container">
              <Swiper
                effect="coverflow"
                grabCursor="true"
                centeredSlides="true"
                spaceBetween={0}
                slidesPerView={4}
                loop="true"
                coverflowEffect={{
                  rotate: 25,
                  stretch: 25,
                  depth: 200,
                  modifier: 1,
                  slideShadows: false,
                }}
                // pagination={{ clickable: false, dynamicBullets: true }}
              >
                {recipes.map((recipe, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className="recipes-slide" key={recipe.id}>
                        <Card className={classes.root}>
                          <CardActionArea>
                            <a href={recipe.url}>
                              <CardMedia
                                className={classes.media}
                                image={recipe.image}
                                title={recipe.name}
                              />
                            </a>
                            <CardContent>
                              <div className="recipe-name-container">
                                <div className="recipe-name">{recipe.name}</div>
                              </div>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

const mapState = (state) => ({ user: state.user, recipes: state.recipes });

export default connect(mapState, null)(Recipe);
