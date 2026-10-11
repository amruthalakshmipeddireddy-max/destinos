import React, { useState } from 'react';
import { SearchState } from '../types/transit';

interface RouteSearchModalProps {
  searchState: SearchState;
  onSave: (newState: SearchState) => void;
  onClose: () => void;
  initialMode?: 'route' | 'deadline';
}

export const RouteSearchModal: React.FC<RouteSearchModalProps> = ({
  searchState,
  onSave,
  onClose,
  initialMode = 'route',
}) => {
  const [origin, setOrigin] = useState(searchState.origin);
  const [destination, setDestination] = useState(searchState.destination);
  const [date, setDate] = useState(searchState.date);
  const [passengers, setPassengers] = useState(searchState.passengers);
  const [deadlineTime, setDeadlineTime] = useState(searchState.deadlineTime);

  const cities = ['Bengaluru', 'Pune', 'Mumbai', 'Hyderabad', 'Chennai', 'Goa', 'Hubballi'];
  const deadlines = ['07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM'];

  const swapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleApply = () => {
    onSave({
      origin,
      destination,
      date,
      passengers,
      deadlineTime,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#fff8f0] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 border border-[#e7e2da] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e2da]">
          <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
            {initialMode === 'deadline' ? 'Adjust Arrival Deadline' : 'Modify Journey Search'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ede7df] hover:bg-[#e7e2da] flex items-center justify-center text-[#553722] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Arrival Deadline Priority Section */}
        <div className="my-4 p-4 rounded-2xl bg-[#ffdcc2]/50 border border-[#febb84]">
          <div className="flex items-center gap-1.5 text-[#855324] font-bold text-xs uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">alarm</span>
            <span>Must Arrive By Deadline</span>
          </div>
          <p className="text-xs text-[#693c0f] mb-3">
            Departures will be ranked by real-time Swargate junction traffic to ensure you reach on or before this time.
          </p>
          <div className="flex flex-wrap gap-2">
            {deadlines.map((t) => (
              <button
                key={t}
                onClick={() => setDeadlineTime(t)}
                type="button"
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  deadlineTime === t
                    ? 'bg-[#553722] text-white shadow-sm ring-2 ring-[#ffdcc2]'
                    : 'bg-white text-[#50453e] hover:bg-[#f3ede5]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="space-y-3">
          <div className="relative p-3 rounded-2xl bg-white border border-[#e7e2da]">
            <div className="mb-2">
              <label className="text-[11px] font-bold uppercase text-[#82746d] block">From</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full mt-1 font-bold text-sm text-[#1d1b17] bg-transparent focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c} value={c} disabled={c === destination}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <button
              onClick={swapCities}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#f9f3eb] border border-[#d4c3ba] flex items-center justify-center text-[#553722] hover:bg-[#ede7df] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">swap_vert</span>
            </button>

            <div className="pt-2 border-t border-[#e7e2da]">
              <label className="text-[11px] font-bold uppercase text-[#82746d] block">To</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full mt-1 font-bold text-sm text-[#1d1b17] bg-transparent focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c} value={c} disabled={c === origin}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Adults */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white border border-[#e7e2da]">
              <label className="text-[11px] font-bold uppercase text-[#82746d] block mb-1">
                Travel Date
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs font-bold text-[#1d1b17] bg-transparent focus:outline-none"
              >
                <option value="Fri, 24 Oct">Fri, 24 Oct (Today)</option>
                <option value="Sat, 25 Oct">Sat, 25 Oct (Tomorrow)</option>
                <option value="Sun, 26 Oct">Sun, 26 Oct (Weekend)</option>
                <option value="Mon, 27 Oct">Mon, 27 Oct</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#e7e2da]">
              <label className="text-[11px] font-bold uppercase text-[#82746d] block mb-1">
                Passengers
              </label>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#1d1b17]">{passengers} Adult{passengers > 1 ? 's' : ''}</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={passengers <= 1}
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    type="button"
                    className="w-6 h-6 rounded bg-[#ede7df] text-xs font-bold flex items-center justify-center cursor-pointer disabled:opacity-40"
                  >
                    -
                  </button>
                  <button
                    disabled={passengers >= 6}
                    onClick={() => setPassengers(Math.min(6, passengers + 1))}
                    type="button"
                    className="w-6 h-6 rounded bg-[#ede7df] text-xs font-bold flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <button
            onClick={handleApply}
            type="button"
            className="w-full h-12 rounded-xl bg-[#6f4e37] text-white font-bold text-sm flex items-center justify-center hover:bg-[#553722] transition-colors cursor-pointer"
          >
            Update Search & Rank Departures
          </button>
        </div>
      </div>
    </div>
  );
};
