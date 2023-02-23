import React, { useState, useEffect } from 'react';
import "./Loading.css"

const DotLoader = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return '.';
        } else {
          return prevDots + '.';
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return <div className={"dot"}>{dots}</div>;
};

export default DotLoader;
