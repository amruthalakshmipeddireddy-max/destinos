import React, { useState, useEffect } from 'react';
import { BusDeparture, RouteMilestone } from '../types/transit';
import { LIVE_ROUTE_MILESTONES } from '../data/mockTransitData';

interface LiveTrackerScreenProps {
  bus: BusDeparture;
  onBack: () => void;
  onOpenDriverMode: () => void;
  onOpenGuarantee: () => void;
  selectedSeats?: string[];
  boardingPoint?: string;
  droppingPoint?: string;
}

export const LiveTrackerScreen: React.FC<LiveTrackerScreenProps> = ({
  bus,
  onBack,
  onOpenDriverMode,
  onOpenGuarantee,
  selectedSeats = ['L3'],
  boardingPoint = 'Kempegowda BS Majestic (20:30)',
  droppingPoint = 'Swargate, Pune (06:45)',
}) => {
  const [speed, setSpeed] = useState(78);
  const [distanceCoveredKm, setDistanceCoveredKm] = useState(222);
  const totalDistanceKm = 835;
  const [shareCopied, setShareCopied] = useState(false);

  // Gentle realistic speed variance for live telemetry effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeed((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = Math.max(72, Math.min(80, prev + change));
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const progressPercent = Math.round((distanceCoveredKm / totalDistanceKm) * 100);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Live Status Top Strip */}
      <section className="px-4 py-3 bg-[#f9f3eb] border-b border-[#e7e2da]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#314326] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#314326]">
              Live GPS Tracking Active
            </span>
          </div>
          <button
            onClick={onOpenDriverMode}
            type="button"
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ede7df] hover:bg-[#e7e2da] text-[#553722] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">sports_motorsports</span>
            <span>Driver Companion View</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
              {bus.operator}
            </h2>
            <p className="text-xs text-[#50453e]">
              Berth {selectedSeats.join(', ')} • {bus.busType}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#d3eac0] text-[#0f2006] text-xs font-bold">
              <span>On Time</span>
            </div>
            <p className="text-[11px] text-[#50453e] mt-0.5">48m safety cushion</p>
          </div>
        </div>
      </section>

      {/* Speedometer & Highway Telemetry Card */}
      <section className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-[#e7e2da] shadow-sm">
          <div className="grid grid-cols-3 gap-3 text-center divide-x divide-[#e7e2da]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#82746d] block mb-0.5">
                Current Speed
              </span>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="font-headline-lg text-headline-lg font-bold text-[#553722] tabular-nums">
                  {speed}
                </span>
                <span className="text-xs font-semibold text-[#82746d]">km/h</span>
              </div>
              <span className="text-[10px] text-[#314326] font-semibold">Regulated &lt;80</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#82746d] block mb-0.5">
                Target Deadline
              </span>
              <div className="font-headline-lg text-headline-lg font-bold text-[#1d1b17] tabular-nums">
                07:30
              </div>
              <span className="text-[10px] text-[#82746d]">AM Required</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#82746d] block mb-0.5">
                Predicted Swargate
              </span>
              <div className="font-headline-lg text-headline-lg font-bold text-[#314326] tabular-nums">
                06:42
              </div>
              <span className="text-[10px] text-[#314326] font-semibold">+48m Buffer</span>
            </div>
          </div>

          {/* Linear Route Progress */}
          <div className="mt-4 pt-3 border-t border-[#e7e2da]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#50453e]">Bengaluru</span>
              <span className="font-bold text-[#553722]">
                {distanceCoveredKm} km of {totalDistanceKm} km ({progressPercent}%)
              </span>
              <span className="font-semibold text-[#50453e]">Pune</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#f3ede5] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#855324] to-[#314326] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Davanagere Rest Stop Spotlight Card */}
      <section className="px-4 mt-4">
        <div className="bg-[#fff8f0] rounded-2xl p-4 border-2 border-[#febb84]/60 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#ffdcc2] text-[#693c0f] text-[11px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">restaurant</span>
            <span>Next Rest Stop in 28 mins</span>
          </div>

          <div className="pr-12">
            <div className="flex items-center gap-1.5 text-[#855324] text-xs font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">coffee</span>
              <span>Davanagere Highway Food Court</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-[#1d1b17] font-bold">
              Scheduled Halt: 00:45 AM (25 mins)
            </h3>
            <p className="text-xs text-[#50453e] mt-1">
              Famous for hot Davanagere Benne Dosa, hygienic western washrooms, and sanitized baby-care facilities.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2 pt-2 border-t border-[#febb84]/30">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#d3eac0] text-[#0f2006] text-xs font-bold">
              ★ 4.6 (840 reviews)
            </span>
            <span className="text-xs text-[#50453e]">Cleanliness Grade A+</span>
            <span className="text-xs text-[#50453e] ml-auto">Free Wi-Fi</span>
          </div>
        </div>
      </section>

      {/* Real-time Highway Traffic Conditions */}
      <section className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-[#e7e2da] shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#82746d] mb-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#553722]">traffic</span>
            <span>Real-Time Corridor Traffic Monitoring</span>
          </h3>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#f9f3eb]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#314326]"></span>
                <span className="font-semibold text-[#1d1b17]">NH48 Tumakuru - Sira Stretch</span>
              </div>
              <span className="text-[#314326] font-bold">Free Flow (80 km/h)</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#f9f3eb]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#314326]"></span>
                <span className="font-semibold text-[#1d1b17]">Katraj Bypass Tunnel (Entry to Pune)</span>
              </div>
              <span className="text-[#314326] font-bold">Clear (Predicted 06:12 AM)</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#f9f3eb]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#855324]"></span>
                <span className="font-semibold text-[#1d1b17]">Swargate Junction Traffic</span>
              </div>
              <span className="text-[#855324] font-bold">Moderate Morning Flow</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Milestones Timeline */}
      <section className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-[#e7e2da] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-label-lg text-label-lg font-bold text-[#553722]">
              Journey Milestones
            </h3>
            <span className="text-xs text-[#82746d]">9 checkpoints</span>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e7e2da]">
            {LIVE_ROUTE_MILESTONES.map((m) => {
              const isDone = m.status === 'completed';
              const isCurrent = m.status === 'current';

              return (
                <div key={m.id} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      isDone
                        ? 'bg-[#314326] border-[#314326] text-white'
                        : isCurrent
                        ? 'bg-[#855324] border-white ring-4 ring-[#ffdcc2] text-white animate-pulse'
                        : 'bg-white border-[#d4c3ba] text-transparent'
                    }`}
                  >
                    {isDone ? (
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    ) : isCurrent ? (
                      <span className="material-symbols-outlined text-[11px]">directions_bus</span>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4
                        className={`text-sm font-bold truncate ${
                          isCurrent
                            ? 'text-[#855324]'
                            : isDone
                            ? 'text-[#1d1b17]'
                            : 'text-[#82746d]'
                        }`}
                      >
                        {m.name}
                      </h4>
                      <span
                        className={`text-xs tabular-nums font-semibold shrink-0 ${
                          isCurrent ? 'text-[#855324]' : 'text-[#50453e]'
                        }`}
                      >
                        {m.actualOrPredictedTime}
                      </span>
                    </div>

                    {m.notes && (
                      <p className="text-xs text-[#50453e] mt-0.5">{m.notes}</p>
                    )}

                    {m.amenitiesInfo && (
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-[#314326] font-medium">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        <span>{m.amenitiesInfo}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety & Action Controls Strip */}
      <section className="px-4 mt-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            type="button"
            className="flex-1 h-12 rounded-xl bg-white border border-[#e7e2da] hover:bg-[#f9f3eb] text-[#553722] font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>{shareCopied ? 'Link Copied!' : 'Share Live GPS'}</span>
          </button>

          <button
            onClick={onOpenGuarantee}
            type="button"
            className="flex-1 h-12 rounded-xl bg-[#ffdcc2] hover:bg-[#febb84]/70 text-[#2e1500] font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[18px] text-[#855324]">support_agent</span>
            <span>TripPilot Shield</span>
          </button>
        </div>

        <button
          onClick={onBack}
          type="button"
          className="w-full h-11 rounded-xl bg-[#ede7df] hover:bg-[#e7e2da] text-[#553722] font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Return to All Departures</span>
        </button>
      </section>
    </div>
  );
};
