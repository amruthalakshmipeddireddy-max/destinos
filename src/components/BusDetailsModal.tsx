import React from 'react';
import { BusDeparture } from '../types/transit';

interface BusDetailsModalProps {
  bus: BusDeparture | null;
  onClose: () => void;
  onSelectSeats: (bus: BusDeparture) => void;
}

export const BusDetailsModal: React.FC<BusDetailsModalProps> = ({
  bus,
  onClose,
  onSelectSeats,
}) => {
  if (!bus) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#fff8f0] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 border border-[#e7e2da] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e2da]">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
              {bus.operator}
            </h2>
            <p className="text-xs text-[#50453e]">{bus.busType}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ede7df] hover:bg-[#e7e2da] flex items-center justify-center text-[#553722] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Schedule & Cushion Box */}
        <div className="my-4 p-4 rounded-2xl bg-white border border-[#e7e2da] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-headline-md text-headline-md font-bold text-[#1d1b17]">
                {bus.departureTime}
              </span>
              <p className="text-xs text-[#50453e]">{bus.departureStation}</p>
            </div>
            <div className="text-center px-3">
              <span className="text-xs font-bold text-[#855324]">{bus.duration}</span>
              <div className="w-20 h-0.5 bg-[#e7e2da] mx-auto my-1"></div>
              <span className="text-[10px] text-[#314326] font-semibold">{bus.routeType}</span>
            </div>
            <div className="text-right">
              <span className="font-headline-md text-headline-md font-bold text-[#1d1b17]">
                {bus.arrivalTime}
              </span>
              <p className="text-xs text-[#50453e]">{bus.arrivalStation}</p>
            </div>
          </div>

          <div
            className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
              bus.deadlineComparison.status === 'delayed'
                ? 'bg-[#ffdad6]/60 text-[#ba1a1a]'
                : 'bg-[#d3eac0]/50 text-[#0f2006]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {bus.deadlineComparison.status === 'delayed' ? 'error_outline' : 'schedule'}
            </span>
            <span className="font-semibold">{bus.deadlineComparison.text}</span>
          </div>
        </div>

        {/* Technical Fleet & Crew Information */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#82746d]">
            Vehicle & Safety Verification
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#e7e2da]">
              <span className="text-[#82746d] block mb-0.5">Vehicle Model</span>
              <span className="font-bold text-[#1d1b17]">{bus.operatorDetails.vehicleModel}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#e7e2da]">
              <span className="text-[#82746d] block mb-0.5">Fleet Age</span>
              <span className="font-bold text-[#1d1b17]">{bus.operatorDetails.fleetAge}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#e7e2da]">
              <span className="text-[#82746d] block mb-0.5">Cancellation History</span>
              <span className="font-bold text-[#314326]">{bus.operatorDetails.cancellationRate}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#e7e2da]">
              <span className="text-[#82746d] block mb-0.5">Pilots On Duty</span>
              <span className="font-bold text-[#1d1b17]">{bus.operatorDetails.driverCrew}</span>
            </div>
          </div>
        </div>

        {/* Boarding Points */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#82746d]">
            Pick-up & Drop Points
          </h4>
          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] text-xs space-y-2">
            <div className="font-bold text-[#553722]">Boarding Locations:</div>
            {bus.boardingPoints.map((bp) => (
              <div key={bp.id} className="flex justify-between border-b border-[#e7e2da]/50 pb-1.5 last:border-none">
                <div>
                  <span className="font-semibold text-[#1d1b17]">{bp.name}</span>
                  <p className="text-[11px] text-[#82746d]">{bp.landmark}</p>
                </div>
                <span className="font-bold text-[#553722]">{bp.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer & CTA */}
        <div className="mt-5 flex items-center justify-between gap-4 pt-3 border-t border-[#e7e2da]">
          <div>
            <span className="font-headline-md text-headline-md font-bold text-[#553722]">
              ₹{bus.price.toLocaleString('en-IN')}
            </span>
            <p className="text-[11px] text-[#82746d]">Taxes included</p>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectSeats(bus);
            }}
            type="button"
            className="flex-1 h-12 rounded-xl bg-[#6f4e37] text-white hover:bg-[#553722] font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
          >
            <span>Select Seats</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
