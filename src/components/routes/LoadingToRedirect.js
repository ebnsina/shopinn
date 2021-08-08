import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(3);

  const history = useHistory();

  useEffect(() => {
    const invterval = setInterval(
      () => setCount((currentCount) => --currentCount),
      1000
    );

    count === 0 && history.push("/");

    return () => clearInterval(invterval);
  }, [count, history]);

  return (
    <div>
      <p className="text-center my-3 font-semibold">
        Redirecting you in {count} seconds...
      </p>
    </div>
  );
}

export default LoadingToRedirect;
