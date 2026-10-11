import React from 'react';

interface ProfileModalProps {
  onClose: () => void;
  onOpenDriverView: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, onOpenDriverView }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#fff8f0] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 border border-[#e7e2da] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e2da]">
          <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
            Passenger Profile
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ede7df] hover:bg-[#e7e2da] flex items-center justify-center text-[#553722] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="my-4 p-4 rounded-2xl bg-white border border-[#e7e2da] flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#553722] text-white flex items-center justify-center text-xl font-bold shadow-sm">
            VS
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[#1d1b17]">Vinay Sidhu</h3>
            <p className="text-xs text-[#50453e]">sidhuvinay2615@gmail.com</p>
            <span className="inline-block px-2 py-0.5 rounded bg-[#d3eac0] text-[#0f2006] text-[10px] font-bold mt-1">
              TripPilot Shield Member
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenDriverView();
            }}
            type="button"
            className="w-full p-3.5 rounded-xl bg-white border border-[#e7e2da] hover:bg-[#f9f3eb] flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#855324]">sports_motorsports</span>
              <div>
                <span className="text-sm font-bold text-[#1d1b17] block">Switch to Driver Cockpit Mode</span>
                <span className="text-xs text-[#82746d]">Demonstrates high-contrast tablet dashboard UI</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#82746d]">chevron_right</span>
          </button>

          <div className="p-3.5 rounded-xl bg-white border border-[#e7e2da] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#553722]">notifications_active</span>
              <div>
                <span className="text-sm font-bold text-[#1d1b17] block">WhatsApp Delay Alerts</span>
                <span className="text-xs text-[#82746d]">Direct Fastag highway alerts on your phone</span>
              </div>
            </div>
            <input type="checkbox" defaultChecked className="accent-[#553722] w-4 h-4 cursor-pointer" />
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#e7e2da] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#553722]">shield</span>
              <div>
                <span className="text-sm font-bold text-[#1d1b17] block">Auto-Cab Guarantee Coverage</span>
                <span className="text-xs text-[#82746d]">Active for all verified departures</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#314326]">Active</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-5">
          <button
            onClick={onClose}
            type="button"
            className="w-full h-12 rounded-xl bg-[#6f4e37] text-white font-bold text-sm flex items-center justify-center hover:bg-[#553722] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
