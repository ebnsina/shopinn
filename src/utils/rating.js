import StarRating from "react-star-ratings";

function AverageRating(product) {
  const ratingArr = product.ratings;

  if (product && ratingArr) {
    const total = [];
    const length = ratingArr.length;
    const highest = length * 5;

    ratingArr.map((rating) => total.push(rating.star));
    const totalReduced = total.reduce((prev, next) => prev + next, 0);
    const avg = (totalReduced * 5) / highest;

    return (
      <span>
        <StarRating
          rating={avg}
          starRatedColor="hotpink"
          starDimension="20px"
        />{" "}
        ({product.ratings.length})
      </span>
    );
  }
}

export default AverageRating;
