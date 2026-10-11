import React, { useState } from 'react';

interface TripPilotGuaranteeModalProps {
  onClose: () => void;
}

export const TripPilotGuaranteeModal: React.FC<TripPilotGuaranteeModalProps> = ({ onClose }) => {
  const [claimStatus, setClaimStatus] = useState<'idle' | 'simulating' | 'granted'>('idle');

  const simulateClaim = () => {
    setClaimStatus('simulating');
    setTimeout(() => {
      setClaimStatus('granted');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#fff8f0] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 border border-[#e7e2da] shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e2da]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855324] text-[26px]">support_agent</span>
            <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
              TripPilot Guarantee
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ede7df] hover:bg-[#e7e2da] flex items-center justify-center text-[#553722] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Protection Banner */}
        <div className="my-4 p-4 rounded-2xl bg-[#ffdcc2]/60 border border-[#febb84] flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[#855324]">verified_user</span>
          </div>
          <div>
            <h3 className="font-label-lg text-label-lg font-bold text-[#2e1500]">
              Zero-Anxiety Transit Promise
            </h3>
            <p className="text-xs text-[#693c0f] mt-1 leading-relaxed">
              Intercity buses in India can face unexpected highway jams. TripPilot guarantees that if your verified bus misses the arrival deadline by &gt;45 minutes, we cover your final mile with an auto-reroute cab voucher.
            </p>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#82746d]">
            Coverage Highlights
          </h4>

          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#314326] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_taxi
            </span>
            <div>
              <h5 className="text-sm font-bold text-[#1d1b17]">Up to ₹850 Auto-Cab Allowance</h5>
              <p className="text-xs text-[#50453e]">
                Pre-authorized Uber/Ola credit if the bus is stuck at Katraj bypass or highway bottlenecks.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#314326] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              schedule
            </span>
            <div>
              <h5 className="text-sm font-bold text-[#1d1b17]">Autonomous GPS Monitoring</h5>
              <p className="text-xs text-[#50453e]">
                No forms or calls needed. Our servers monitor Fastag toll sensors and GPS pings. If the threshold triggers, voucher is pushed automatically.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e7e2da] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#314326] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              hotel
            </span>
            <div>
              <h5 className="text-sm font-bold text-[#1d1b17]">Missed Connection Insurance</h5>
              <p className="text-xs text-[#50453e]">
                If you have an onward flight from Pune Airport (PNQ) or train from Pune Junction, priority rerouting applies.
              </p>
            </div>
          </div>
        </div>

        {/* Simulation Sandbox */}
        <div className="mt-5 p-4 rounded-2xl bg-white border border-[#e7e2da]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#82746d] mb-2">
            Try Guarantee Claim Simulator
          </h4>

          {claimStatus === 'idle' && (
            <div>
              <p className="text-xs text-[#50453e] mb-3">
                Simulate a scenario where the bus gets delayed by 50 minutes near Katraj bypass to see how the instant cab voucher generates.
              </p>
              <button
                onClick={simulateClaim}
                type="button"
                className="w-full h-11 rounded-xl bg-[#855324] hover:bg-[#6f4e37] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Simulate 50m Delay Scenario</span>
              </button>
            </div>
          )}

          {claimStatus === 'simulating' && (
            <div className="py-4 text-center">
              <span className="material-symbols-outlined text-[#855324] text-[32px] animate-spin">
                sync
              </span>
              <p className="text-xs font-bold text-[#553722] mt-2">
                Analyzing Katraj GPS sensor telemetry...
              </p>
            </div>
          )}

          {claimStatus === 'granted' && (
            <div className="p-3 rounded-xl bg-[#d3eac0]/60 border border-[#314326]/30 text-left space-y-2">
              <div className="flex items-center gap-1.5 text-[#0f2006] font-bold text-sm">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Instant Cab Voucher Approved!</span>
              </div>
              <p className="text-xs text-[#394c2d]">
                Code: <strong>PILOT-KATRAJ-850</strong> for ₹850 credit to Uber/Ola applied to passenger account.
              </p>
              <button
                onClick={() => setClaimStatus('idle')}
                className="text-[11px] font-bold text-[#314326] underline cursor-pointer"
              >
                Reset simulator
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5">
          <button
            onClick={onClose}
            type="button"
            className="w-full h-12 rounded-xl bg-[#6f4e37] text-white font-bold text-sm flex items-center justify-center hover:bg-[#553722] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
