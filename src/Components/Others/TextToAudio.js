import React, { useState, useEffect } from 'react';

const TextToAudio = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.onvoiceschanged = () => {
      setVoices(speechSynthesis.getVoices());
    };
  }, []);

  const handleSpeakClick = () => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };
  };

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} />
      <select
        value={selectedVoice ? selectedVoice.name : ''}
        onChange={(event) => {
          setSelectedVoice(voices.find((voice) => voice.name === event.target.value));
        }}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button disabled={isSpeaking} onClick={handleSpeakClick}>
        Speak
      </button>
    </div>
  );
};

export default TextToAudio;
