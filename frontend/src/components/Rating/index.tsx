import React from "react";
import { Property } from "csstype";

interface RatingProps {
  value: number;
  text?: string;
  color?: Property.Color;
}

const Rating: React.FC<RatingProps> = ({ value, text, color = "#f8e225" }) => {
  const getStar = (value: number, due: number) =>
    value >= due
      ? "fas fa-star"
      : value >= due - 0.5
      ? "fas fa-star-half-alt"
      : "far fa-star";

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          <i style={{ color }} className={getStar(value, index + 1)}></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
