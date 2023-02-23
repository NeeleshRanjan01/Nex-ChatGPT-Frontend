// import React, { useState, useEffect } from 'react';
// import './LyricsAnimation.css';
// import song from "./aa.mp3"

// const LyricsAnimation = () => {
//   const [text, setText] = useState('');
//   const [currentWord, setCurrentWord] = useState('');
//   const [wordIndex, setWordIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audio, setAudio] = useState(null);

//   useEffect(() => {
//     if (isPlaying) {
//       const words = text.split(' ');
//       if (wordIndex < words.length) {
//         setTimeout(() => {
//           setCurrentWord(words[wordIndex]);
//           setWordIndex(wordIndex + 1);
//         }, 1000);
//       } else {
//         setIsPlaying(false);
//       }
//     }
//   }, [wordIndex, isPlaying, text]);

//   const handleTextChange = (event) => {
//     setText(event.target.value);
//   };

//   const handlePlayClick = () => {
//     setIsPlaying(true);
//     setCurrentWord('');
//     setWordIndex(0);
//     const newAudio = new Audio();
//     newAudio.src = song;
//     newAudio.play();
//     setAudio(newAudio);
//   };

//   const handlePauseClick = () => {
//     setIsPlaying(false);
//     audio.pause();
//   };

//   return (
//     <div className="lyrics-animation">
//       <textarea value={text} onChange={handleTextChange} />
//       <div className="lyrics">
//         {text.split(' ').map((word, index) => (
//           <span key={index} className={index === wordIndex - 1 ? 'highlight' : ''}>
//             {word}
//           </span>
//         ))}
//       </div>
//       <div>
//         <button onClick={handlePlayClick} disabled={isPlaying}>
//           Play
//         </button>
//         <button onClick={handlePauseClick} disabled={!isPlaying}>
//           Pause
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LyricsAnimation;


import React, { useState, useEffect, useRef } from "react";

function LyricsAnimation({ src }) {
  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [eqData, setEqData] = useState(new Uint8Array(128));

  const togglePlay = () => {
    setPlay(!play);
  };

  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audioRef.current);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(eqData);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the bars for the equalizer
      for (let i = 0; i < 128; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(i * 2, canvas.height, 1, -eqData[i]);
      }
    }

    renderFrame();
  }, [play, eqData]);

  return (
    <div className="audio-player">
      <canvas ref={canvasRef} />
      <audio
        ref={audioRef}
        src={src}
        onPlay={togglePlay}
        onPause={togglePlay}
        controls
      />
    </div>
  );
}

export default LyricsAnimation;
