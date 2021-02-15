import React from "react";
import { connect } from "react-redux";
import "../styles/recipestyle.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, EffectCoverflow } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import EmptyRecipe from "./EmptyRecipe";

SwiperCore.use([Navigation, EffectCoverflow]);

const useStyles = makeStyles({
  root: {
    width: 320,
    height: 370,
    padding: 3,
    "@media (max-width: 320px)": {
      width: 250,
      height: 300,
      padding: 3,
    },
  },
  media: {
    height: 270,
    "@media (max-width: 320px)": {
      width: 250,
      height: 220,
      padding: 3,
    },
  },
});

const Recipe = (props) => {
  const { recipes } = props;
  const classes = useStyles();

  return (
    <>
      {recipes.length ? (
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
                    breakpoints={{
                      700: {
                        spaceBetween: 0,
                        slidesPerView: 4,
                      },
                      500: {
                        spaceBetween: 100,
                        slidesPerView: 2,
                      },
                      411: {
                        spaceBetween: 100,
                        slidesPerView: 2,
                      },
                      300: {
                        spaceBetween: 0,
                        slidesPerView: 1,
                      },
                    }}
                  >
                    {recipes.map((recipe, idx) => {
                      return (
                        <SwiperSlide key={idx}>
                          <div className="recipes-slide" key={recipe.id}>
                            <Card className={classes.root}>
                              <CardActionArea href={recipe.url} target="_blank">
                                <CardMedia
                                  className={classes.media}
                                  image={recipe.image}
                                  title={recipe.name}
                                />

                                <CardContent>
                                  <div className="recipe-name-container">
                                    <div className="recipe-name">
                                      {recipe.name}
                                    </div>
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
              {/* css animation for background */}
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              {/* css animation for background */}
            </ul>
          </div>
        </>
      ) : (
        <EmptyRecipe />
      )}
    </>
  );
};

const mapState = (state) => ({ user: state.user, recipes: state.recipes });

export default connect(mapState, null)(Recipe);
