"use client";

import React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="text-4xl font-bold">Counter Component</div>

      <p className="text-lg font-bold">Count: {count}</p>
    </div>
  );
}
