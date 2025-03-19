import React, { useState, useEffect } from 'react';
import { Settings2, Maximize, Minimize, Clock12, Clock2 as Clock24 } from 'lucide-react';

function App() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bgColor, setBgColor] = useState('#000000');
  const [customBgImage, setCustomBgImage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = () => {
    const hours = is24Hour ? time.getHours() : time.getHours() % 12 || 12;
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const ampm = !is24Hour ? (time.getHours() >= 12 ? 'PM' : 'AM') : '';
    return { hours, minutes, seconds, ampm };
  };

  const { hours, minutes, seconds, ampm } = formatTime();

  const backgroundStyle = {
    backgroundImage: customBgImage ? `url(${customBgImage})` : 'none',
    backgroundColor: customBgImage ? 'transparent' : bgColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const TimeBlock = ({ value, label }: { value: string | number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-[20vw] h-[20vw] flex items-center justify-center">
        <span className="text-[8vw] font-bold text-white">{value}</span>
      </div>
      <span className="text-white/60 text-[1.5vw] mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div 
      className="min-h-screen w-full relative flex items-center justify-center transition-colors duration-300"
      style={backgroundStyle}
    >
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
      >
        <Settings2 size={24} />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-black/80 p-4 rounded-lg text-white backdrop-blur-sm">
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block mb-2">Background Image URL</label>
              <input
                type="text"
                placeholder="Enter image URL"
                value={customBgImage}
                onChange={(e) => setCustomBgImage(e.target.value)}
                className="w-full px-2 py-1 rounded bg-white/10 border border-white/20"
              />
            </div>
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className="flex items-center gap-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors w-full"
            >
              {is24Hour ? <Clock24 size={16} /> : <Clock12 size={16} />}
              {is24Hour ? '24h Format' : '12h Format'}
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors w-full"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
          </div>
        </div>
      )}

      {/* Clock Display */}
      <div className="flex gap-4 items-center">
        <TimeBlock value={hours} label="Hours" />
        <div className="text-white text-[8vw] -mt-8">:</div>
        <TimeBlock value={minutes} label="Minutes" />
        <div className="text-white text-[8vw] -mt-8">:</div>
        <TimeBlock value={seconds} label="Seconds" />
        {!is24Hour && (
          <div className="ml-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center">
            <span className="text-[3vw] font-bold text-white/80">{ampm}</span>
            <span className="text-white/60 text-[1vw] mt-1 uppercase tracking-wider">Period</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;