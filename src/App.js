import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const drumPads = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
  const [activePad, setActivePad] = useState(null);
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [volume, setVolume] = useState(50);

  const playSound = (audioElement) => {
    if (audioElement && isPowerOn) {
      audioElement.currentTime = 0;
      audioElement.volume = volume / 100;
      audioElement.play();
    } else {
      console.error("Audio element not found");
    }
  };

  const activatePad = (pad) => {
    setActivePad(pad);

    const audioDiv = document.getElementById(pad);
    const audio = audioDiv ? audioDiv.querySelector("audio") : null;
    if (audio && isPowerOn) {
      playSound(audio);
    }

    setTimeout(() => {
      setActivePad(null);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (drumPads.includes(key)) {
        activatePad(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPowerOn, volume]);

  return (
    <div id="drum-machine" className="drum-machine">
      <div className="drum-box">
        <h2 className="title">Play A Drum</h2>
        <div className="drum-pads">
          {drumPads.map((pad) => (
            <div
              key={pad}
              id={pad}
              className={`drum-pad ${activePad === pad ? "pressed" : ""}`}
              onClick={() => activatePad(pad)}
            >
              <audio id={pad} className="clip" src={`audio/${pad}-sound.mp3`} />
              <h3>{pad}</h3>
            </div>
          ))}
        </div>
        <div className="controls">
          <div className="control-btn">
            <h3>Power</h3>
            <label class="switch">
              <input
                type="checkbox"
                checked={isPowerOn}
                onChange={(e) => setIsPowerOn(e.target.checked)}
              />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="control-btn">
            <h3>Volume : {volume}</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="slider-range"
            />
          </div>
        </div>
      </div>
      <div className="scroll-box">
        <span className="name">Jasper Duke</span>
      </div>
    </div>
  );
}

export default App;
