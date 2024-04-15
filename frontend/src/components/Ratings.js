import React from "react";

const Ratings = ({ rating }) => {
  const filledStarClasses = "text-yellow-400";
  const halfStarClasses = "text-yellow-400";
  const emptyStarClasses = "text-gray-300";

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <span key={i}>
            <i className={`fas fa-star ${filledStarClasses}`} />
          </span>
        );
      } else if (rating + 0.5 === i) {
        stars.push(
          <span key={i}>
            <i className={`fas fa-star-half-alt ${halfStarClasses}`} />
          </span>
        );
      } else {
        stars.push(
          <span key={i}>
            <i className={`far fa-star ${emptyStarClasses}`} />
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="rating flex items-center">
      {renderStars()}
      <span className="ml-2 text-gray-500">{rating} reviews</span>
    </div>
  );
};

export default Ratings;
