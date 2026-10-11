import React from 'react';
import { ActiveScreen } from '../types/transit';

interface BottomNavProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  hasActiveTrip: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  hasActiveTrip,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-[#fff8f0]/95 backdrop-blur-md border-t border-[#e7e2da] shadow-lg pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 items-center px-2">
        {/* Departures */}
        <button
          onClick={() => onNavigate('departures')}
          type="button"
          className={`flex flex-col items-center justify-center h-full cursor-pointer transition-colors ${
            activeScreen === 'departures' ? 'text-[#553722]' : 'text-[#82746d] hover:text-[#553722]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'departures' ? "'FILL' 1" : "'FILL' 0" }}
          >
            directions_bus
          </span>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeScreen === 'departures' ? 'font-bold' : 'font-medium'
            }`}
          >
            Departures
          </span>
        </button>

        {/* Live Trip Tracker */}
        <button
          onClick={() => onNavigate('tracker')}
          type="button"
          className={`flex flex-col items-center justify-center h-full relative cursor-pointer transition-colors ${
            activeScreen === 'tracker' ? 'text-[#553722]' : 'text-[#82746d] hover:text-[#553722]'
          }`}
        >
          {hasActiveTrip && (
            <span className="absolute top-2.5 right-6 w-2 h-2 rounded-full bg-[#314326] animate-pulse"></span>
          )}
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'tracker' ? "'FILL' 1" : "'FILL' 0" }}
          >
            near_me
          </span>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeScreen === 'tracker' ? 'font-bold' : 'font-medium'
            }`}
          >
            Live Trip
          </span>
        </button>

        {/* Guarantee */}
        <button
          onClick={() => onNavigate('guarantee')}
          type="button"
          className={`flex flex-col items-center justify-center h-full cursor-pointer transition-colors ${
            activeScreen === 'guarantee' ? 'text-[#553722]' : 'text-[#82746d] hover:text-[#553722]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'guarantee' ? "'FILL' 1" : "'FILL' 0" }}
          >
            support_agent
          </span>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeScreen === 'guarantee' ? 'font-bold' : 'font-medium'
            }`}
          >
            Guarantee
          </span>
        </button>

        {/* Driver Cockpit Mode */}
        <button
          onClick={() => onNavigate('driver')}
          type="button"
          className={`flex flex-col items-center justify-center h-full cursor-pointer transition-colors ${
            activeScreen === 'driver' ? 'text-[#553722]' : 'text-[#82746d] hover:text-[#553722]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'driver' ? "'FILL' 1" : "'FILL' 0" }}
          >
            sports_motorsports
          </span>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeScreen === 'driver' ? 'font-bold' : 'font-medium'
            }`}
          >
            Driver
          </span>
        </button>
      </div>
    </nav>
  );
};
