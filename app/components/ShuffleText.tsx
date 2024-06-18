"use client";

import React, { useState, useEffect } from "react";

const ShuffleText = ({
  text,
  velocity = 50,
}: {
  text: string;
  velocity?: number;
}) => {
  const [shuffledText, setShuffledText] = useState(text);
  const [isActive, setIsActive] = useState(false);

  const shuffle = (o: any) => {
    for (
      let j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  };

  const shuffleText = (originalText: string) => {
    const elementTextArray = originalText.split("");
    let randomText = [];

    const repeatShuffle = (times: number, index: number) => {
      if (index === times) {
        setShuffledText(originalText);
        setIsActive(false);
        return;
      }

      setTimeout(() => {
        randomText = shuffle([...elementTextArray]);
        for (let i = 0; i < index; i++) {
          randomText[i] = originalText[i];
        }
        setShuffledText(randomText.join(""));
        repeatShuffle(times, index + 1);
      }, velocity);
    };

    repeatShuffle(originalText.length, 0);
  };

  useEffect(() => {
    if (isActive) {
      shuffleText(text);
    }
  }, [isActive, text]);

  return (
    <span
      className={`shuffle hover:text-white hover:underline ${
        isActive ? "active" : ""
      }`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      data-clickable="true"
    >
      {shuffledText}
    </span>
  );
};

export default ShuffleText;
