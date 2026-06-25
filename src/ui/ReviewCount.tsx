import { FaStar } from "react-icons/fa";

type RatingsCount = {
  [key: string]: number;
};

type RatingBreakdownProps = {
  totalReviews: number;
  averageRating: number;
  ratingsCount?: RatingsCount;
};

const buildEstimatedRatingsCount = (
  totalReviews: number,
  averageRating: number,
) => {
  if (totalReviews <= 0 || averageRating <= 0) return {};

  const weights = [5, 4, 3, 2, 1].reduce<RatingsCount>((acc, star) => {
    const distance = Math.abs(star - averageRating);
    acc[star] = Math.max(0.08, 1.25 - distance * 0.35);
    return acc;
  }, {});

  const totalWeight = Object.values(weights).reduce(
    (sum, weight) => sum + weight,
    0,
  );

  return [5, 4, 3, 2, 1].reduce<RatingsCount>((acc, star) => {
    acc[star] = Math.round((weights[star] / totalWeight) * totalReviews);
    return acc;
  }, {});
};

const ReviewsCount = ({
  totalReviews,
  averageRating,
  ratingsCount,
}: RatingBreakdownProps) => {
  const stars = [5, 4, 3, 2, 1];
  const displayedRating = Number.isInteger(averageRating)
    ? averageRating
    : averageRating.toFixed(1);
  const roundedRating = Math.round(averageRating);
  const reviewsLabel = `${totalReviews} ${
    totalReviews === 1 ? "review" : "reviews"
  }`;
  const displayedRatingsCount =
    ratingsCount ?? buildEstimatedRatingsCount(totalReviews, averageRating);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-dark text-2xl font-medium">Customer Reviews</h2>

      <div className="flex flex-col items-center justify-center gap-8 rounded-lg bg-white px-6 py-8 shadow-xl md:flex-row md:px-20">
        <div className="flex w-full flex-col items-center md:w-48">
          <p className="text-4xl font-bold text-black">{displayedRating}/5</p>
          <div className="mt-2 flex gap-0.5">
            {stars.map((star) => (
              <FaStar
                key={star}
                className={
                  star <= roundedRating ? "text-amber-400" : "text-gray-400"
                }
                size={16}
              />
            ))}
          </div>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            {reviewsLabel}
          </p>
        </div>

        <div className="flex w-full max-w-3xl flex-col gap-3">
          {stars.map((star) => {
            const count = displayedRatingsCount[star] || 0;
            const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div
                key={star}
                className="grid grid-cols-[70px_1fr] items-center gap-3"
              >
                <span className="text-lg font-semibold text-gray-400">
                  {star} {star === 1 ? "Star" : "Stars"}
                </span>
                <div className="h-3 overflow-hidden rounded-full bg-gray-300">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCount;
