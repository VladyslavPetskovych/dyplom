import React from "react";

const Article = ({ data }) => {
  const { title, style } = data;
  const defaultStyle = style || "bg-green-500"; // Default background color if no style is specified

  return (
    <figure className="snip1584">
      <p className={`${defaultStyle} rounded-full p-2 m-1`}>{title}</p>
      <a href="#"></a>
    </figure>
  );
};

export default Article;
