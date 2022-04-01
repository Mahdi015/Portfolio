import React, { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";
const TEXTS = ["Web Developer", "Freelancer"];
const Text = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <h1 style={{ color: "white", fontSize: "35px" }}>
      <span style={{ color: "white", fontWeight: 800, fontSize: "35px" }}>
        I Am{"  "}
      </span>
      <TextTransition
        text={TEXTS[index % TEXTS.length]}
        springConfig={presets.molasses}
        inline
      />
    </h1>
  );
};

export default Text;
