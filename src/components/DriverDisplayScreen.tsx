import React, { useState, useEffect } from 'react';
import { BusDeparture } from '../types/transit';

interface DriverDisplayScreenProps {
  bus: BusDeparture;
  onExit: () => void;
}

export const DriverDisplayScreen: React.FC<DriverDisplayScreenProps> = ({
  bus,
  onExit,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(1680); // 28 minutes
  const [manifestCount, setManifestCount] = useState(32);
  const [cabinTemp, setCabinTemp] = useState(21.5);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleAction = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#32302b] text-[#f6f0e8] p-4 select-none">
      {/* Driver Cockpit Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#50453e]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#7A8F6B] animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest font-bold text-[#b7cda5]">
            Driver Tablet Mount Companion
          </span>
          <span className="text-xs bg-[#50453e] px-2 py-0.5 rounded text-[#e7e2da]">
            KA-01-F-9922 • Pilot 1 On Duty
          </span>
        </div>
        <button
          onClick={onExit}
          type="button"
          className="px-3 py-1.5 rounded-lg bg-[#50453e] hover:bg-[#67574E] text-xs font-bold text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Exit Driver Mode</span>
        </button>
      </div>

      {/* Driver Big-State Banner (Design Spec implementation) */}
      <div className="mt-4 p-5 rounded-2xl bg-[#1d1b17] border-2 border-[#6f4e37] shadow-xl">
        <div className="flex items-center justify-between text-[#eabda0] text-xs uppercase font-bold tracking-wider mb-1">
          <span>Next Mandatory Checkpoint Halt</span>
          <span className="text-[#b7cda5]">Scheduled 00:45 AM</span>
        </div>

        <h1 className="font-driver-display text-driver-display text-white font-extrabold tracking-tight truncate leading-tight">
          DAVANAGERE FOOD COURT
        </h1>

        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-[#50453e]/80">
          <div>
            <span className="text-xs text-[#d4c3ba] uppercase font-bold block mb-1">
              Time to Checkpoint
            </span>
            <span className="text-3xl font-extrabold text-[#febb84] tabular-nums font-mono">
              {formatCountdown(secondsRemaining)}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#d4c3ba] uppercase font-bold block mb-1">
              Passenger Manifest
            </span>
            <span className="text-3xl font-extrabold text-white tabular-nums">
              {manifestCount} / 36
            </span>
            <span className="text-[10px] text-[#b7cda5] block">4 Seats Empty</span>
          </div>

          <div>
            <span className="text-xs text-[#d4c3ba] uppercase font-bold block mb-1">
              Cabin Climate
            </span>
            <span className="text-3xl font-extrabold text-[#b7cda5] tabular-nums">
              {cabinTemp}°C
            </span>
            <span className="text-[10px] text-[#d4c3ba] block">Nominal Sleeper AC</span>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="mt-3 p-3 rounded-xl bg-[#7A8F6B] text-white font-bold text-sm text-center animate-fade-in shadow-md">
          {statusMessage}
        </div>
      )}

      {/* Giant Tactile Button Control Grid (Specified in Warm Tactile Transit doc) */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Departure Confirmation Giant Button */}
        <button
          onClick={() => handleAction('Arrival at Davanagere Logged! Passenger SMS Sent.')}
          type="button"
          className="h-20 rounded-2xl bg-[#314326] hover:bg-[#485b3b] text-white flex items-center justify-center gap-3 border-2 border-[#b7cda5] shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[32px]">check_circle</span>
          <div className="text-left">
            <span className="text-lg font-bold block leading-none">LOG ARRIVAL</span>
            <span className="text-xs text-[#b7cda5]">Davanagere Rest Area</span>
          </div>
        </button>

        {/* Traffic Slowdown Giant Button */}
        <button
          onClick={() => handleAction('Highway congestion updated. Swargate ETA recalculated.')}
          type="button"
          className="h-20 rounded-2xl bg-[#855324] hover:bg-[#a06830] text-white flex items-center justify-center gap-3 border-2 border-[#ffdcc2] shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[32px]">traffic</span>
          <div className="text-left">
            <span className="text-lg font-bold block leading-none">TRAFFIC ALERT</span>
            <span className="text-xs text-[#ffdcc2]">Report Road Slowdown</span>
          </div>
        </button>

        {/* Emergency Giant Button */}
        <button
          onClick={() => handleAction('Emergency Protocol: Dispatch notified and coordinates sent.')}
          type="button"
          className="h-20 rounded-2xl bg-[#ba1a1a] hover:bg-[#d62828] text-white flex items-center justify-center gap-3 border-2 border-[#ffdad6] shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[32px]">warning</span>
          <div className="text-left">
            <span className="text-lg font-bold block leading-none">PASSENGER SOS</span>
            <span className="text-xs text-[#ffdad6]">Trigger Safety Alert</span>
          </div>
        </button>
      </div>

      {/* Manifest & Vehicle Health Monitor */}
      <div className="mt-5 bg-[#1d1b17] rounded-2xl p-4 border border-[#50453e]">
        <div className="flex items-center justify-between mb-3 text-sm font-bold text-[#eabda0]">
          <span>Vehicle Diagnostic Telemetry</span>
          <span className="text-xs text-[#b7cda5]">Volvo Teledata Online</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-[#32302b] border border-[#50453e]">
            <span className="text-[#82746d] block mb-0.5">Speed Limiter</span>
            <span className="text-base font-bold text-white">Active (80 km/h)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#32302b] border border-[#50453e]">
            <span className="text-[#82746d] block mb-0.5">Air Suspension</span>
            <span className="text-base font-bold text-[#b7cda5]">Optimal (Grade 1)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#32302b] border border-[#50453e]">
            <span className="text-[#82746d] block mb-0.5">AdBlue Level</span>
            <span className="text-base font-bold text-white">88% (Full Range)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#32302b] border border-[#50453e]">
            <span className="text-[#82746d] block mb-0.5">Tire Pressures</span>
            <span className="text-base font-bold text-[#b7cda5]">All 120 PSI OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
