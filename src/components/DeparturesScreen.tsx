import React, { useState } from 'react';
import { BusDeparture, SearchState } from '../types/transit';

interface DeparturesScreenProps {
  departures: BusDeparture[];
  searchState: SearchState;
  onOpenSearchModal: () => void;
  onOpenDeadlineModal: () => void;
  onSelectBus: (bus: BusDeparture) => void;
  onViewBusDetails: (bus: BusDeparture) => void;
  onOpenPromiseScoreInfo: (bus: BusDeparture) => void;
  onOpenGuarantee: () => void;
  onOpenFilters: () => void;
}

export const DeparturesScreen: React.FC<DeparturesScreenProps> = ({
  departures,
  searchState,
  onOpenSearchModal,
  onOpenDeadlineModal,
  onSelectBus,
  onViewBusDetails,
  onOpenPromiseScoreInfo,
  onOpenGuarantee,
  onOpenFilters,
}) => {
  const [promiseFilter, setPromiseFilter] = useState<'all' | 'high' | 'top'>('all');
  const [volvoFilter, setVolvoFilter] = useState(false);
  const [sleeperFilter, setSleeperFilter] = useState(false);
  const [showPromiseDropdown, setShowPromiseDropdown] = useState(false);

  // Filter departures
  const filteredDepartures = departures.filter((b) => {
    if (promiseFilter === 'top' && b.promiseScore < 95) return false;
    if (promiseFilter === 'high' && b.promiseScore < 90) return false;
    if (volvoFilter && !b.busType.toLowerCase().includes('volvo')) return false;
    if (sleeperFilter && !b.busType.toLowerCase().includes('sleeper')) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-safe">
      {/* Journey Context Scrim & Filter Stream */}
      <section className="px-4 pt-4 pb-3 bg-[#f9f3eb] shadow-sm border-b border-[#e7e2da]/70">
        <div className="flex items-start justify-between gap-2 mb-3">
          <button
            onClick={onOpenSearchModal}
            type="button"
            className="min-w-0 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="flex items-center gap-1 text-[#553722] group-hover:text-[#6f4e37] transition-colors">
              <span className="material-symbols-outlined text-[18px]">near_me</span>
              <p className="font-label-lg text-label-lg text-[#553722] truncate font-bold">
                {searchState.origin} → {searchState.destination}
              </p>
              <span className="material-symbols-outlined text-[16px] opacity-70 group-hover:opacity-100 transition-opacity">
                edit
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-[#50453e] mt-0.5">
              {searchState.date} • {searchState.passengers} Adult{searchState.passengers > 1 ? 's' : ''}
            </p>
          </button>

          <button
            onClick={onOpenDeadlineModal}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdcc2] text-[#2e1500] hover:bg-[#febb84]/60 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
            title="Click to change your required arrival deadline"
          >
            <span className="material-symbols-outlined text-[16px] text-[#855324]">alarm</span>
            <span className="font-label-sm text-label-sm font-semibold">
              Must arrive by {searchState.deadlineTime}
            </span>
          </button>
        </div>

        {/* Active Intelligent Pills Carousel */}
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* Promise Score Filter Button with Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowPromiseDropdown(!showPromiseDropdown)}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm shrink-0 transition-colors cursor-pointer ${
                  promiseFilter !== 'all'
                    ? 'bg-[#553722] text-white ring-2 ring-[#553722]/30'
                    : 'bg-[#553722] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#ffdcc2]">auto_awesome</span>
                <span className="font-label-md text-label-md font-semibold">
                  Promise Score {promiseFilter === 'top' ? '95+' : promiseFilter === 'high' ? '90+' : ''}
                </span>
                <span className="material-symbols-outlined text-[14px]">
                  {showPromiseDropdown ? 'arrow_drop_up' : 'arrow_drop_down'}
                </span>
              </button>

              {showPromiseDropdown && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#e7e2da] p-2 z-50">
                  <div className="text-xs font-semibold text-[#50453e] px-2 py-1 uppercase tracking-wider">
                    Promise Score Filter
                  </div>
                  <button
                    onClick={() => {
                      setPromiseFilter('all');
                      setShowPromiseDropdown(false);
                    }}
                    type="button"
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between cursor-pointer ${
                      promiseFilter === 'all' ? 'bg-[#f9f3eb] font-bold text-[#553722]' : 'hover:bg-[#f3ede5]'
                    }`}
                  >
                    <span>All Departures</span>
                    {promiseFilter === 'all' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                  <button
                    onClick={() => {
                      setPromiseFilter('high');
                      setShowPromiseDropdown(false);
                    }}
                    type="button"
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between cursor-pointer ${
                      promiseFilter === 'high' ? 'bg-[#f9f3eb] font-bold text-[#553722]' : 'hover:bg-[#f3ede5]'
                    }`}
                  >
                    <span>High Reliability (90+)</span>
                    {promiseFilter === 'high' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                  <button
                    onClick={() => {
                      setPromiseFilter('top');
                      setShowPromiseDropdown(false);
                    }}
                    type="button"
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between cursor-pointer ${
                      promiseFilter === 'top' ? 'bg-[#f9f3eb] font-bold text-[#553722]' : 'hover:bg-[#f3ede5]'
                    }`}
                  >
                    <span>Top Match Only (95+)</span>
                    {promiseFilter === 'top' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Volvo Filter */}
            <button
              onClick={() => setVolvoFilter(!volvoFilter)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm shrink-0 transition-colors cursor-pointer ${
                volvoFilter
                  ? 'bg-[#314326] text-white'
                  : 'bg-[#f3ede5] text-[#50453e] hover:bg-[#ede7df]'
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${volvoFilter ? 'text-white' : 'text-[#314326]'}`}>
                directions_bus
              </span>
              <span className="font-label-md text-label-md font-semibold">Volvo Multi-Axle</span>
              {volvoFilter && <span className="material-symbols-outlined text-[14px]">close</span>}
            </button>

            {/* Sleeper Filter */}
            <button
              onClick={() => setSleeperFilter(!sleeperFilter)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm shrink-0 transition-colors cursor-pointer ${
                sleeperFilter
                  ? 'bg-[#855324] text-white'
                  : 'bg-[#f3ede5] text-[#50453e] hover:bg-[#ede7df]'
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${sleeperFilter ? 'text-white' : 'text-[#855324]'}`}>
                hotel
              </span>
              <span className="font-label-md text-label-md font-semibold">AC Sleeper</span>
              {sleeperFilter && <span className="material-symbols-outlined text-[14px]">close</span>}
            </button>

            {/* All Filters Button */}
            <button
              onClick={onOpenFilters}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f3ede5] text-[#50453e] hover:bg-[#ede7df] shrink-0 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span className="font-label-md text-label-md font-semibold">Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* Route AI Confidence Brief */}
      <section className="px-4 mt-4">
        <div className="bg-[#ede7df] rounded-xl p-4 flex items-center gap-4 shadow-sm border border-[#e7e2da]/70">
          <div className="w-10 h-10 rounded-full bg-[#d3eac0] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#314326] text-[22px]">verified</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-label-md text-label-md text-[#1d1b17] font-bold">
              {filteredDepartures.length} reliable departures found
            </p>
            <p className="font-body-sm text-body-sm text-[#50453e] truncate">
              Ranked by real-time Swargate junction traffic & punctuality
            </p>
          </div>
          <button
            onClick={() => onOpenPromiseScoreInfo(filteredDepartures[0] || departures[0])}
            type="button"
            className="text-xs font-semibold text-[#553722] underline underline-offset-2 shrink-0 cursor-pointer hover:opacity-80"
          >
            How it works
          </button>
        </div>
      </section>

      {/* Journey Result Cards Stack */}
      <section className="px-4 flex flex-col gap-5 mt-4 mb-8">
        {filteredDepartures.map((bus) => {
          // Calculate radial stroke dash for circle (perimeter 2 * pi * 20 = 125.66)
          const circumference = 125.6;
          const strokeOffset = circumference - (bus.promiseScore / 100) * circumference;

          // Theme colors based on score
          const isHighPromise = bus.promiseScore >= 95;
          const isMidPromise = bus.promiseScore >= 85 && bus.promiseScore < 95;
          const strokeColor = isHighPromise ? '#314326' : isMidPromise ? '#855324' : '#febb84';
          const scoreTextColor = isHighPromise ? 'text-[#314326]' : isMidPromise ? 'text-[#855324]' : 'text-[#79491b]';

          return (
            <article
              key={bus.id}
              className={`bg-white rounded-2xl shadow-md p-4 relative overflow-hidden transition-all duration-200 border border-[#e7e2da]/70 ${
                bus.deadlineComparison.status === 'delayed' ? 'opacity-95' : ''
              }`}
            >
              {/* Glow & Accent Ribbon for Top Pick / Best Match */}
              {bus.isBestMatch && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ffdcc2] via-[#855324] to-[#553722]"></div>
              )}

              {/* Header Badges Strip */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {bus.isBestMatch ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#febb84] text-[#79491b]">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="font-label-sm text-label-sm font-bold tracking-wide uppercase">
                        Best match
                      </span>
                    </div>
                  ) : bus.tag ? (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f3ede5] text-[#50453e] font-label-sm text-[11px]">
                      <span className="material-symbols-outlined text-[13px] text-[#314326]">shield</span>
                      {bus.tag}
                    </div>
                  ) : null}
                </div>

                {bus.onTimeGuaranteePercent ? (
                  <span className="font-label-sm text-label-sm text-[#314326] flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#314326] animate-pulse"></span>
                    {bus.onTimeGuaranteePercent}% On-time guarantee
                  </span>
                ) : (
                  <span className="font-label-sm text-label-sm text-[#50453e]">
                    {bus.availableSeatsCount} seats left
                  </span>
                )}
              </div>

              {/* Operator & Metadata + Radial Promise Score Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h2 className="font-headline-sm text-headline-sm text-[#553722] truncate font-bold">
                    {bus.operator}
                  </h2>
                  <p className="font-body-sm text-body-sm text-[#50453e] truncate">
                    {bus.busType}
                  </p>
                </div>

                {/* Radial Promise Score Badge */}
                <button
                  onClick={() => onOpenPromiseScoreInfo(bus)}
                  type="button"
                  title="View Promise Score breakdown"
                  className="flex flex-col items-center shrink-0 group cursor-pointer"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-105">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                      <circle
                        cx="24"
                        cy="24"
                        fill="none"
                        r="20"
                        stroke="#ede7df"
                        strokeWidth="3.5"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        fill="none"
                        r="20"
                        stroke={strokeColor}
                        strokeDasharray="125.6"
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`font-headline-sm text-[15px] font-bold leading-none ${scoreTextColor}`}>
                        {bus.promiseScore}
                      </span>
                      <span className="font-label-sm text-[8px] text-[#50453e] uppercase tracking-tighter">
                        /100
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-[10px] text-[#50453e] font-medium mt-0.5 group-hover:underline">
                    Promise Score
                  </span>
                </button>
              </div>

              {/* Schedule Timeline Bar */}
              <div className="bg-[#f9f3eb] rounded-xl p-3.5 my-3 border border-[#e7e2da]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-headline-md text-headline-md text-[#1d1b17] font-bold">
                      {bus.departureTime}
                    </span>
                    <p className="font-label-sm text-label-sm text-[#50453e]">{bus.departureStation}</p>
                  </div>

                  <div className="flex flex-col items-center px-2 flex-1">
                    <span className="font-label-sm text-label-sm text-[#50453e]">{bus.duration}</span>
                    <div className="w-full flex items-center my-1 max-w-[140px]">
                      <div className="w-2 h-2 rounded-full bg-[#855324]"></div>
                      <div className="h-0.5 bg-[#d4c3ba] flex-1 mx-1"></div>
                      <span className="material-symbols-outlined text-[16px] text-[#855324]">directions_bus</span>
                      <div className="h-0.5 bg-[#d4c3ba] flex-1 mx-1"></div>
                      <div className="w-2 h-2 rounded-full bg-[#314326]"></div>
                    </div>
                    <span className="font-label-sm text-[11px] text-[#314326] font-semibold">
                      {bus.routeType}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-headline-md text-headline-md font-bold ${
                        bus.deadlineComparison.status === 'delayed' ? 'text-[#ba1a1a]' : 'text-[#1d1b17]'
                      }`}
                    >
                      {bus.arrivalTime}
                    </span>
                    <p className="font-label-sm text-label-sm text-[#50453e]">{bus.arrivalStation}</p>
                  </div>
                </div>

                {/* Optional Warning Bar if deadline is exceeded */}
                {bus.deadlineComparison.status === 'delayed' && (
                  <div className="mt-2 pt-2 border-t border-[#e7e2da] flex items-center gap-1.5 text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      {bus.deadlineComparison.text}
                    </span>
                  </div>
                )}
              </div>

              {/* AI Assurance Checklist */}
              <div
                className={`space-y-1.5 mb-3 rounded-xl p-3 ${
                  bus.isBestMatch
                    ? 'bg-[#d3eac0]/40'
                    : 'bg-[#f3ede5]/60'
                }`}
              >
                {bus.keyAssurances.map((assurance, idx) => {
                  const isWarning =
                    bus.deadlineComparison.status === 'delayed' && idx === 1;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isWarning ? 'text-[#ba1a1a]' : 'text-[#1d1b17]'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] shrink-0 ${
                          isWarning ? 'text-[#ba1a1a]' : 'text-[#314326]'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {isWarning ? 'error_outline' : 'check_circle'}
                      </span>
                      <p className={`font-label-md text-label-md ${isWarning ? 'text-[#ba1a1a]' : ''}`}>
                        {assurance}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Amenity Tags Stream */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {bus.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f3ede5] text-[#50453e] font-label-sm text-label-sm"
                  >
                    <span
                      className={`material-symbols-outlined text-[15px] ${
                        amenity.highlight ? 'text-[#855324]' : 'text-[#553722]'
                      }`}
                    >
                      {amenity.icon}
                    </span>
                    {amenity.text}
                  </span>
                ))}
              </div>

              {/* Pricing Strip and CTA */}
              <div className="flex items-center justify-between pt-1 gap-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-md text-headline-md font-bold text-[#553722]">
                      ₹{bus.price.toLocaleString('en-IN')}
                    </span>
                    {bus.originalPrice && (
                      <span className="font-body-sm text-body-sm text-[#82746d] line-through">
                        ₹{bus.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {bus.dealTag ? (
                    <span className="inline-block px-1.5 py-0.5 rounded bg-[#ffdcc2] text-[#693c0f] font-label-sm text-[11px] font-semibold">
                      {bus.dealTag}
                    </span>
                  ) : bus.priceCategory ? (
                    <span className="font-label-sm text-[11px] text-[#50453e]">
                      {bus.priceCategory}
                    </span>
                  ) : null}
                </div>

                {bus.isBestMatch ? (
                  <button
                    onClick={() => onSelectBus(bus)}
                    type="button"
                    className="flex-1 max-w-[210px] h-[52px] rounded-xl bg-[#6f4e37] text-white hover:bg-[#553722] flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer font-semibold"
                  >
                    <span className="font-label-lg text-label-lg">Select Seats</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onViewBusDetails(bus)}
                    type="button"
                    className="h-11 px-5 rounded-xl bg-[#ede7df] text-[#1d1b17] hover:bg-[#e7e2da] font-label-md text-label-md flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer font-semibold"
                  >
                    <span>View details</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* Grounded Reassurance Card (Delight Moment) */}
      <footer className="px-4 mb-6">
        <button
          onClick={onOpenGuarantee}
          type="button"
          className="w-full text-left p-4 rounded-2xl bg-[#ffdcc2]/50 hover:bg-[#ffdcc2]/70 flex items-center gap-4 shadow-sm border border-[#febb84]/40 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[#855324] text-[22px]">support_agent</span>
          </div>
          <div className="flex-1">
            <h3 className="font-label-lg text-label-lg text-[#2e1500] font-bold flex items-center gap-1">
              TripPilot Guarantee Active
              <span className="material-symbols-outlined text-[16px] text-[#855324]">chevron_right</span>
            </h3>
            <p className="font-body-sm text-body-sm text-[#693c0f]">
              If your selected bus misses the promise window by &gt;45m, our auto-reroute cab allowance applies.
            </p>
          </div>
        </button>
      </footer>
    </div>
  );
};
