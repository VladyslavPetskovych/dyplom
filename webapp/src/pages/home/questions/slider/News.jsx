// src/components/News.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Article from "./Article"; // Ensure you have this component created as shown previously

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-gray-500",
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const News = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category"
        );
        const categoriesWithColors = response.data.map((category) => ({
          id: category.category_id,
          title: category.category_name,
          style: getRandomColor(),
        }));
        setCategories(categoriesWithColors);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    rows: 2,
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
    categories.length > 0 ? (
      categories.map((item, index) => (
        <div key={index} onClick={() => onCategoryClick(item.id)}>
          <Article data={item} />
        </div>
      ))
    ) : (
      <p>Please add some cards</p>
    );

  return (
    <div className="news text-center">
      <Slider {...settings}>{newsTemplate}</Slider>
    </div>
  );
};

export default News;
