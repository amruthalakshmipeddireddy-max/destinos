import React, { useState } from 'react';

interface FilterDrawerProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    operators: string[];
    maxPrice: number;
    hasRestroom: boolean;
    hasCharging: boolean;
    fleetType: string[];
  }) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [hasRestroom, setHasRestroom] = useState(false);
  const [hasCharging, setHasCharging] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<string[]>([]);

  const operators = ['VRL Travels', 'KSRTC Airavat', 'SRS Travels', 'Orange Tours', 'IntrCity SmartBus'];
  const fleets = ['Volvo Multi-Axle', 'Scania AC Diamond', 'BharatBenz AC', 'Single Berth Sleeper'];

  const toggleOperator = (op: string) => {
    setSelectedOperators((prev) =>
      prev.includes(op) ? prev.filter((o) => o !== op) : [...prev, op]
    );
  };

  const toggleFleet = (fl: string) => {
    setSelectedFleet((prev) =>
      prev.includes(fl) ? prev.filter((f) => f !== fl) : [...prev, fl]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      operators: selectedOperators,
      maxPrice,
      hasRestroom,
      hasCharging,
      fleetType: selectedFleet,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#fff8f0] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 border border-[#e7e2da] shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e2da]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#553722]">tune</span>
            <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
              Filter Departures
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ede7df] hover:bg-[#e7e2da] flex items-center justify-center text-[#553722] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Max Budget Slider */}
          <div className="p-4 rounded-2xl bg-white border border-[#e7e2da]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-[#82746d]">Max Budget</span>
              <span className="text-base font-bold text-[#553722]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="1100"
              max="2200"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#553722] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#82746d] mt-1">
              <span>₹1,100</span>
              <span>₹2,200</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="p-4 rounded-2xl bg-white border border-[#e7e2da]">
            <span className="text-xs font-bold uppercase text-[#82746d] block mb-2.5">
              Verified Amenities
            </span>
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-[#1d1b17] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#855324] text-[18px]">restaurant</span>
                  Restroom Food Halt (&gt;4.5★)
                </span>
                <input
                  type="checkbox"
                  checked={hasRestroom}
                  onChange={(e) => setHasRestroom(e.target.checked)}
                  className="rounded text-[#553722] focus:ring-[#553722] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-[#1d1b17] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#553722] text-[18px]">power</span>
                  Working Charging Points
                </span>
                <input
                  type="checkbox"
                  checked={hasCharging}
                  onChange={(e) => setHasCharging(e.target.checked)}
                  className="rounded text-[#553722] focus:ring-[#553722] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Fleets */}
          <div className="p-4 rounded-2xl bg-white border border-[#e7e2da]">
            <span className="text-xs font-bold uppercase text-[#82746d] block mb-2.5">
              Coach Configuration
            </span>
            <div className="flex flex-wrap gap-2">
              {fleets.map((fl) => {
                const active = selectedFleet.includes(fl);
                return (
                  <button
                    key={fl}
                    onClick={() => toggleFleet(fl)}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#314326] text-white shadow-xs'
                        : 'bg-[#f3ede5] text-[#50453e] hover:bg-[#ede7df]'
                    }`}
                  >
                    {fl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operators */}
          <div className="p-4 rounded-2xl bg-white border border-[#e7e2da]">
            <span className="text-xs font-bold uppercase text-[#82746d] block mb-2.5">
              Verified Operators
            </span>
            <div className="flex flex-wrap gap-2">
              {operators.map((op) => {
                const active = selectedOperators.includes(op);
                return (
                  <button
                    key={op}
                    onClick={() => toggleOperator(op)}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#553722] text-white shadow-xs'
                        : 'bg-[#f3ede5] text-[#50453e] hover:bg-[#ede7df]'
                    }`}
                  >
                    {op}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => {
              setSelectedOperators([]);
              setSelectedFleet([]);
              setMaxPrice(2000);
              setHasRestroom(false);
              setHasCharging(false);
            }}
            type="button"
            className="flex-1 h-12 rounded-xl bg-[#ede7df] text-[#553722] font-bold text-xs hover:bg-[#e7e2da] cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            type="button"
            className="flex-2 h-12 rounded-xl bg-[#6f4e37] text-white font-bold text-sm hover:bg-[#553722] shadow-md cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
