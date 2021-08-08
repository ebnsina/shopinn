import { Skeleton } from "antd";

function LoadingSkeleton({ count }) {
  function cards() {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(<Skeleton key={i} active />);
    }

    return totalCards;
  }

  return <div className={`grid grid-cols-${count} gap-10`}>{cards()}</div>;
}

export default LoadingSkeleton;
