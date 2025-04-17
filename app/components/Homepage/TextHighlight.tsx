"use client";

import { useEffect, useState } from "react";

export default function TextHighlight({
  texts,
  delay = 2000,
}: {
  texts: string[];
  delay: number | undefined;
}) {
  const [currentText, setCurrentText] = useState(texts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setCurrentText(texts[currentIndex]);
        setIsVisible(true);
      }, 500);
    }, delay);
    return () => clearInterval(interval);
  }, [texts, delay, currentIndex]);

  return (
    <span className="text-white bg-blue-500 px-2 rounded-md">
      <span
        className={`inline-block transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {currentText}
      </span>
    </span>
  );
}
