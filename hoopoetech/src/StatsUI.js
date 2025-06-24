import React, { useState, useEffect, useRef } from "react";
import './index.css';


const stats = [
  { label: "Hours Saved/Month", value: 40, type: "text", suffix: "+" },
  { label: "Active AI Assistants", value: 1000, type: "text", suffix: "+" },
  { label: "Increased Revenue", value: 50, type: "percentage" },
];

const StatsUI = () => {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const svgRef = useRef(null);
  const aiIconRef = useRef(null);
  const statRefs = useRef(stats.map(() => React.createRef()));
  const [lineCoords, setLineCoords] = useState([
    { x1: 50, y1: 50, x2: 50, y2: 50 }, // First line
    { x1: 50, y1: 50, x2: 50, y2: 50 }, // Second line
    { x1: 50, y1: 50, x2: 50, y2: 50 }, // Third line
  ]);

  const updateLineCoords = () => {
    if (!svgRef.current || !aiIconRef.current || !statRefs.current.every(ref => ref.current)) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;

    const aiIconRect = aiIconRef.current.getBoundingClientRect();
    const aiIconCenterX = aiIconRect.left + aiIconRect.width / 2 - svgRect.left;
    const aiIconCenterY = aiIconRect.top + aiIconRect.height / 2 - svgRect.top;

    const x1 = (aiIconCenterX / svgWidth) * 100;
    const y1 = (aiIconCenterY / svgHeight) * 100;

    const newCoords = statRefs.current.map((ref, index) => {
      const statRect = ref.current.getBoundingClientRect();
      const statCenterX = statRect.left + statRect.width / 2 - svgRect.left;
      // Use top edge for third stat, bottom edge for others
      const statCenterY = index === 2 ? statRect.top - svgRect.top : statRect.top + statRect.height - svgRect.top;
      const x2 = (statCenterX / svgWidth) * 100;
      const y2 = (statCenterY / svgHeight) * 100;
      return { x1, y1, x2, y2 };
    });

    setLineCoords(newCoords);
  };

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const targetValue = stat.value;
      const increment = Math.ceil(targetValue / 10);
      return setInterval(() => {
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          if (newValues[index] < targetValue) {
            newValues[index] = Math.min(newValues[index] + increment, targetValue);
          }
          return newValues;
        });
      }, 50);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  useEffect(() => {
    updateLineCoords();
    const observer = new ResizeObserver(updateLineCoords);
    if (svgRef.current) observer.observe(svgRef.current);
    window.addEventListener('resize', updateLineCoords);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateLineCoords);
    };
  }, []);

  return (
    <div className="relative h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <svg ref={svgRef} className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        {lineCoords.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#circleGradient)"
            strokeWidth="0.5"
            className="animate-pulse-line"
          />
        ))}
      </svg>

      <div className="absolute flex text-4xl flex-row items-center justify-center lg:w-30 lg:h-30 md:w-26 md:h-26 rounded-full shadow-lg">
        Why work with us?
      </div>

      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <div ref={statRefs.current[0]} className="absolute mb-48 left-4 sm:left-16 md:top-40 md:left-40 flex flex-col items-center bg-gradient-to-r from-gray-900 to-gray-400 rounded-lg p-4 border-cyan-300">
          <div className="text-4xl md:text-6xl font-bold">
            {animatedValues[0].toLocaleString()}{stats[0].suffix}
          </div>
          <p className="mt-2 text-sm md:text-lg font-medium">{stats[0].label}</p>
        </div>
        <div ref={statRefs.current[1]} className="absolute mb-48 right-4 sm:right-16 md:top-40 md:right-40 flex flex-col items-center bg-gradient-to-r rounded-lg from-gray-900 to-gray-400 p-4">
          <div className="text-4xl md:text-6xl font-bold">
            {animatedValues[1].toLocaleString()}{stats[1].suffix}
          </div>
          <p className="mt-2 text-sm md:text-lg font-medium">{stats[1].label}</p>
        </div>
        <div ref={statRefs.current[2]} className="absolute mt-48 sm:bottom-16 md:bottom-24 flex flex-col items-center bg-gradient-to-r rounded-lg from-gray-900 to-gray-400 p-4">
          <div className="text-4xl md:text-6xl font-bold">
            {animatedValues[2].toLocaleString()}%
          </div>
          <p className="mt-2 text-sm md:text-lg font-medium">{stats[2].label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsUI;