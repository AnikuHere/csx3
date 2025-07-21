import React from 'react';

export const AnimatedWaves: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(46, 204, 113, 0.15)" />
            <stop offset="50%" stopColor="rgba(39, 174, 96, 0.12)" />
            <stop offset="100%" stopColor="rgba(46, 204, 113, 0.08)" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(52, 152, 219, 0.1)" />
            <stop offset="50%" stopColor="rgba(41, 128, 185, 0.08)" />
            <stop offset="100%" stopColor="rgba(52, 152, 219, 0.06)" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(26, 188, 156, 0.12)" />
            <stop offset="50%" stopColor="rgba(22, 160, 133, 0.09)" />
            <stop offset="100%" stopColor="rgba(26, 188, 156, 0.06)" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 - Slowest, largest */}
        <path
          d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
          fill="url(#waveGradient1)"
          className="animate-wave-slow"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 100,0; 0,0"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Wave 2 - Medium speed */}
        <path
          d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z"
          fill="url(#waveGradient2)"
          className="animate-wave-medium"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -150,0; 0,0"
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Wave 3 - Fastest, smallest */}
        <path
          d="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1200,500 L1200,800 L0,800 Z"
          fill="url(#waveGradient3)"
          className="animate-wave-fast"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 200,0; 0,0"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Additional floating elements */}
        <circle
          cx="200"
          cy="200"
          r="3"
          fill="rgba(46, 204, 113, 0.2)"
          className="animate-float-1"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 50,30; 0,0"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle
          cx="800"
          cy="150"
          r="2"
          fill="rgba(52, 152, 219, 0.25)"
          className="animate-float-2"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -30,40; 0,0"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle
          cx="1000"
          cy="300"
          r="4"
          fill="rgba(26, 188, 156, 0.15)"
          className="animate-float-3"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 40,-20; 0,0"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      
      {/* Additional CSS animations for subtle movement */}
      <style jsx>{`
        @keyframes wave-slow {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(50px) translateY(-10px); }
          50% { transform: translateX(100px) translateY(0px); }
          75% { transform: translateX(50px) translateY(10px); }
        }
        
        @keyframes wave-medium {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          33% { transform: translateX(-75px) translateY(15px); }
          66% { transform: translateX(-150px) translateY(-5px); }
        }
        
        @keyframes wave-fast {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(200px) translateY(20px); }
        }
        
        .animate-wave-slow {
          animation: wave-slow 20s ease-in-out infinite;
        }
        
        .animate-wave-medium {
          animation: wave-medium 15s ease-in-out infinite;
        }
        
        .animate-wave-fast {
          animation: wave-fast 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};