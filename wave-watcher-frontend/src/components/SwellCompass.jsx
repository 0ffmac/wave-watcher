import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SwellCompass = ({ degree, label, size = "large", isActive = false }) => {
  const isSmall = size === "small";

  return (
    <div className={cn("flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300", isActive ? "scale-105" : "")}
      style={{background:'rgba(255,255,255,0.035)',border: isActive ? '0.5px solid rgba(34,211,238,0.4)' : '0.5px solid rgba(255,255,255,0.07)'}}>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{color:'#536280'}}>
        {label}
      </p>

      <div className="relative group">
        {/* The Outer Ring */}
        <svg
          width={isSmall ? "44" : "72"}
          height={isSmall ? "44" : "72"}
          viewBox="0 0 100 100"
          className="drop-shadow-sm"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="text-slate-200"
          />
          
          {/* Degree markers */}
          {[0, 90, 180, 270].map(d => (
             <line 
                key={d}
                x1="50" y1="4" x2="50" y2="10" 
                transform={`rotate(${d}, 50, 50)`} 
                stroke="currentColor" 
                strokeWidth="2"
                className="text-slate-300"
             />
          ))}

          {/* The Directional Arrow */}
          <g transform={`rotate(${degree}, 50, 50)`} className="transition-transform duration-700 ease-out">
            <path
              d="M50 8 L64 42 L50 36 L36 42 Z"
              fill={isActive ? "#22d3ee" : "#536280"}
              className="drop-shadow-md"
            />
          </g>
        </svg>
      </div>

      <p className={cn("font-black mt-2 tracking-tight", isSmall ? "text-xs" : "text-sm")} style={{color:'#dde8ff'}}>
        {degree}°
      </p>
    </div>
  );
};

export default SwellCompass;
