import React, { createClass } from "react";
import "./sliderCategories.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cards = [
  {
    title: "Музика",
    style: "bg-slate-700 mr-24 w-auto mt-1",
  },
  {
    title: "Фільми",
    style: "bg-slate-300 ml-16 w-auto mb-1",
  },
  {
    title: "Мультфільми",
    style: " ml-8 w-auto mb-1",
  },
  {
    title: "Міста",
    style: "bg-pink-600 ml-6 w-auto",
  },
  {
    title: "Подорожі",
  },
  {
    title: "Фільми",
    style: "bg-pink-600 ml-8 ",
  },
  {
    title: "Мультфільми",
    style: "bg-red-600 mr-8 ",
  },
  {
    title: "Мультфільми",
    style: "bg-red-600 ml-8 ",
  },
  {
    title: "Міста",
    style: "bg-slate-600 ml-12 ",
  },
  {
    title: "Подорожі ",
    style: "bg-pink-600 ml-8 w-auto",
  },
  {
    title: "Фільми",
    style: "bg-pink-600 ml-8 w-auto",
  },
  {
    title: "Мультфільми",
    style: "bg-red-600 mr-12 w-auto",
  },
  {
    title: "Міста",
    style: "bg-slate-600 ml-12 w-auto",
  },
  {
    title: "Мультфільми",
    style: "bg-red-600 mr-12 w-auto",
  },
];

const Article = ({ data }) => {
  const { title, style } = data;
  const defaultStyle = "bg-green-500"; // Default background color if no style is specified
  const bgColorClass = style ? `${style} ${defaultStyle}` : defaultStyle;

  return (
    <figure className="snip1584">
      <p className={`${bgColorClass} rounded-full`}>{title}</p>
      <a href="#"></a>
    </figure>
  );
};

const News = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    rows: 3,
    autoplaySpeed: 2600,
    draggable: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const newsTemplate =
    data.length > 0 ? (
      data.map((item, index) => (
        <div key={index}>
          <Article data={item} />
        </div>
      ))
    ) : (
      <p>Please add some cards</p>
    );

  return (
    <div className="news">
      <Slider {...settings}>{newsTemplate}</Slider>
    </div>
  );
};
function sliderCategories() {
  return (
    <div className="sliderCat">
      <h3>Категорії</h3>
      <News data={cards} />
    </div>
  );
}

export default sliderCategories;
