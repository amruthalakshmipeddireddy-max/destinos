import React from 'react';
import { BusDeparture } from '../types/transit';

interface PromiseScoreModalProps {
  bus: BusDeparture | null;
  onClose: () => void;
}

export const PromiseScoreModal: React.FC<PromiseScoreModalProps> = ({ bus, onClose }) => {
  if (!bus) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#fff8f0] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 border border-[#e7e2da] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e2da]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855324]">auto_awesome</span>
            <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
              AI Promise Score Breakdown
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ede7df] hover:bg-[#e7e2da] flex items-center justify-center text-[#553722] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Bus Score Highlight */}
        <div className="my-4 p-4 rounded-2xl bg-white border border-[#e7e2da] flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#f9f3eb] border border-[#ffdcc2] flex flex-col items-center justify-center shrink-0">
            <span className="text-2xl font-black text-[#314326] leading-none">
              {bus.promiseScore}
            </span>
            <span className="text-[10px] text-[#82746d] font-bold">/ 100</span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#1d1b17]">{bus.operator}</h3>
            <p className="text-xs text-[#50453e]">{bus.busType}</p>
            <p className="text-xs text-[#314326] font-semibold mt-1">
              {bus.promiseScore >= 95
                ? 'Ultra Reliable • Guaranteed On-Time Window'
                : bus.promiseScore >= 90
                ? 'High Reliability Fleet'
                : 'Budget Operator with Traffic Exposure'}
            </p>
          </div>
        </div>

        {/* Scoring Factors */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#82746d]">
            How This Score Was Calculated
          </h4>

          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] space-y-1">
            <div className="flex items-center justify-between text-sm font-bold text-[#1d1b17]">
              <span>1. 90-Day Punctuality Record</span>
              <span className="text-[#314326]">97.4% (Tier 1)</span>
            </div>
            <p className="text-xs text-[#50453e]">
              Over 240 trips on the Bengaluru → Pune corridor, this schedule arrived within 15 minutes of scheduled time 97.4% of times.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] space-y-1">
            <div className="flex items-center justify-between text-sm font-bold text-[#1d1b17]">
              <span>2. Predictive Swargate Congestion</span>
              <span className="text-[#314326]">+45m Safety Buffer</span>
            </div>
            <p className="text-xs text-[#50453e]">
              Scheduled arrival at 06:45 AM clears the Katraj bypass before the 07:15 AM morning rush hour peak at Jedhe Chowk Swargate.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] space-y-1">
            <div className="flex items-center justify-between text-sm font-bold text-[#1d1b17]">
              <span>3. Vehicle Health & Suspension</span>
              <span className="text-[#855324]">Volvo Euro-VI Air-Ride</span>
            </div>
            <p className="text-xs text-[#50453e]">
              Fleet age under 1.5 years with electronically monitored I-Shift multi-axle transmissions, reducing highway breakdown probability to under 0.02%.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] space-y-1">
            <div className="flex items-center justify-between text-sm font-bold text-[#1d1b17]">
              <span>4. Double Pilot Crew Rotation</span>
              <span className="text-[#314326]">2 Captains Onboard</span>
            </div>
            <p className="text-xs text-[#50453e]">
              Mandatory driver handover at Davanagere prevents driver fatigue and guarantees sustained highway pace.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-5">
          <button
            onClick={onClose}
            type="button"
            className="w-full h-12 rounded-xl bg-[#6f4e37] text-white font-bold text-sm flex items-center justify-center hover:bg-[#553722] transition-colors cursor-pointer"
          >
            Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
};
