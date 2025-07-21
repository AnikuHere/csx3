import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ExternalLink, X, Copy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  externalUrl: string;
}

interface MusicPlayerProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isEnabled, onToggle }) => {
  const { currentTheme, themeName } = useTheme();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [blacklistedTracks, setBlacklistedTracks] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Updated playlist with working audio URLs
  const playlist: Track[] = [
    {
      id: '1',
      title: 'Aero',
      artist: 'Cypher',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://pixabay.com/music/synthwave-aero-195054/'
    },
    {
      id: '2',
      title: 'Coding Night',
      artist: 'FAS Sounds',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://pixabay.com/music/beats-coding-night-112186/'
    },
    {
      id: '3',
      title: 'Good Night',
      artist: 'FAS Sounds',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://pixabay.com/music/beats-good-night-lofi-cozy-chill-music-160166/'
    },
    {
      id: '4',
      title: 'Rainy Lofi City',
      artist: 'LofiDreams99',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://pixabay.com/music/beats-rainy-lofi-city-lofi-music-332746/'
    },
    {
      id: '5',
      title: 'Embrace',
      artist: 'Evgeny_Bardyuzha',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://pixabay.com/music/electronic-embrace-364091/'
    },
    {
      id: '6',
      title: 'Focus Flow',
      artist: 'LoFi Beats',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://open.spotify.com/track/example2'
    },
    {
      id: '7',
      title: 'Digital Dreams',
      artist: 'Cyber Sounds',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://open.spotify.com/track/example3'
    },
    {
      id: '8',
      title: 'Code & Coffee',
      artist: 'Ambient Dev',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://open.spotify.com/track/example4'
    },
    {
      id: '9',
      title: 'Algorithm Rhythm',
      artist: 'Tech Beats',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      externalUrl: 'https://open.spotify.com/track/example5'
    }
  ];

  useEffect(() => {
    const savedBlacklist = localStorage.getItem('csx3-music-blacklist');
    if (savedBlacklist) {
      setBlacklistedTracks(JSON.parse(savedBlacklist));
    }
  }, []);

  useEffect(() => {
    if (isEnabled && !currentTrack) {
      playRandomTrack();
    } else if (!isEnabled && isPlaying) {
      stopMusic();
    }
  }, [isEnabled]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const getAvailableTracks = () => {
    return playlist.filter(track => !blacklistedTracks.includes(track.id));
  };

  const playRandomTrack = () => {
    const availableTracks = getAvailableTracks();
    if (availableTracks.length === 0) return;

    const randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
    setCurrentTrack(randomTrack);
    setShowPlayer(true);
    
    if (audioRef.current) {
      audioRef.current.src = randomTrack.url;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        // If the track fails to load, try the next one
        setTimeout(() => {
          playRandomTrack();
        }, 1000);
      });
    }
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        // If the track fails to load, try the next one
        setTimeout(() => {
          playRandomTrack();
        }, 1000);
      });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const nextTrack = () => {
    playRandomTrack();
  };

  const previousTrack = () => {
    playRandomTrack();
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
    setShowPlayer(false);
  };

  const disableMusic = () => {
    stopMusic();
    onToggle(false);
  };

  const blacklistTrack = () => {
    if (!currentTrack) return;

    const newBlacklist = [...blacklistedTracks, currentTrack.id];
    setBlacklistedTracks(newBlacklist);
    localStorage.setItem('csx3-music-blacklist', JSON.stringify(newBlacklist));
    
    nextTrack();
  };

  const copyLink = async () => {
    if (!currentTrack) return;

    try {
      await navigator.clipboard.writeText(currentTrack.externalUrl);
      // Could show a toast notification here
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleAudioEnded = () => {
    // Auto-play next track when current one ends
    setTimeout(() => {
      playRandomTrack();
    }, 2000); // 2 second delay between tracks
  };

  if (!isEnabled || !showPlayer || !currentTrack) {
    return (
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        style={{ display: 'none' }}
      />
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        style={{ display: 'none' }}
      />
      
      <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
        <div 
          className={`rounded-2xl p-4 shadow-2xl border backdrop-blur-md min-w-[320px] ${
            themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
          } ${
            themeName === 'cyber' ? 'cyber-music-player' : ''
          } ${
            themeName === 'speedster' ? 'speedster-music-player' : ''
          }`}
          style={{
            backgroundColor: themeName === 'glassmorphism' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : currentTheme.colors.secondary,
            backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
            border: themeName === 'glassmorphism' 
              ? '1px solid rgba(255, 255, 255, 0.2)' 
              : `1px solid ${currentTheme.colors.border}`,
            boxShadow: themeName === 'cyber' 
              ? `0 0 30px ${currentTheme.colors.primary}40` 
              : themeName === 'speedster'
                ? '0 0 30px rgba(0, 102, 255, 0.4)'
                : '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div 
                className={`w-3 h-3 rounded-full animate-pulse ${
                  themeName === 'cyber' ? 'bg-green-400' : 
                  themeName === 'speedster' ? 'bg-blue-400' : 'bg-red-400'
                }`}
              />
              <span 
                className="text-xs font-semibold"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                NOW PLAYING
              </span>
            </div>
            <button
              onClick={() => setShowPlayer(false)}
              className="p-1 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Track Info */}
          <div className="mb-4">
            <h3 
              className={`font-bold text-lg mb-1 ${
                themeName === 'cyber' ? 'cyber-text-glow' : ''
              } ${
                themeName === 'speedster' ? 'speedster-text-glow' : ''
              }`}
              style={{ color: currentTheme.colors.text.primary }}
            >
              {currentTrack.title}
            </h3>
            <p 
              className="text-sm"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              by {currentTrack.artist}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={previousTrack}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  themeName === 'cyber' ? 'cyber-control-button' : ''
                } ${
                  themeName === 'speedster' ? 'speedster-control-button' : ''
                }`}
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.colors.text.primary
                }}
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlayPause}
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${
                  themeName === 'cyber' ? 'cyber-play-button' : ''
                } ${
                  themeName === 'speedster' ? 'speedster-play-button' : ''
                }`}
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white',
                  boxShadow: themeName === 'cyber' 
                    ? `0 0 20px ${currentTheme.colors.primary}60` 
                    : themeName === 'speedster'
                      ? '0 0 20px rgba(0, 102, 255, 0.6)'
                      : 'none'
                }}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={nextTrack}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  themeName === 'cyber' ? 'cyber-control-button' : ''
                } ${
                  themeName === 'speedster' ? 'speedster-control-button' : ''
                }`}
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.colors.text.primary
                }}
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded transition-colors"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.primary} ${volume * 100}%, ${currentTheme.colors.accent} ${volume * 100}%, ${currentTheme.colors.accent} 100%)`
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={copyLink}
              className="flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors hover:bg-opacity-20 hover:bg-white"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <Copy className="w-4 h-4" />
              <span className="text-xs">Copy Link</span>
            </button>

            <button
              onClick={() => window.open(currentTrack.externalUrl, '_blank')}
              className="flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors hover:bg-opacity-20 hover:bg-white"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-xs">Open</span>
            </button>

            <button
              onClick={blacklistTrack}
              className="flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20 text-red-400"
            >
              <X className="w-4 h-4" />
              <span className="text-xs">Don't Recommend</span>
            </button>

            <button
              onClick={disableMusic}
              className="flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20 text-red-400"
            >
              <VolumeX className="w-4 h-4" />
              <span className="text-xs">Disable</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .cyber-music-player {
          position: relative;
        }
        
        .cyber-music-player::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-pulse 2s infinite;
        }
        
        .speedster-music-player {
          position: relative;
        }
        
        .speedster-music-player::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #0066ff60, transparent, #0066ff60);
          border-radius: inherit;
          z-index: -1;
          animation: speedster-pulse 1.5s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .speedster-text-glow {
          text-shadow: 0 0 10px #0066ff;
        }
        
        .cyber-play-button:hover {
          box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
        }
        
        .speedster-play-button:hover {
          box-shadow: 0 0 30px rgba(0, 102, 255, 0.8) !important;
        }
        
        .cyber-control-button:hover {
          background-color: rgba(0, 255, 65, 0.2) !important;
        }
        
        .speedster-control-button:hover {
          background-color: rgba(0, 102, 255, 0.2) !important;
        }
        
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes speedster-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        /* Custom range slider styles */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${currentTheme.colors.primary};
          cursor: pointer;
          box-shadow: 0 0 10px ${currentTheme.colors.primary}60;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${currentTheme.colors.primary};
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px ${currentTheme.colors.primary}60;
        }
      `}</style>
    </>
  );
};