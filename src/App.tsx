import React, { useState } from 'react';
import { BusDeparture, SearchState, ActiveScreen } from './types/transit';
import { INITIAL_DEPARTURES } from './data/mockTransitData';
import { Header } from './components/Header';
import { DeparturesScreen } from './components/DeparturesScreen';
import { SeatSelectionScreen } from './components/SeatSelectionScreen';
import { LiveTrackerScreen } from './components/LiveTrackerScreen';
import { DriverDisplayScreen } from './components/DriverDisplayScreen';
import { PromiseScoreModal } from './components/PromiseScoreModal';
import { TripPilotGuaranteeModal } from './components/TripPilotGuaranteeModal';
import { RouteSearchModal } from './components/RouteSearchModal';
import { FilterDrawer } from './components/FilterDrawer';
import { BusDetailsModal } from './components/BusDetailsModal';
import { ProfileModal } from './components/ProfileModal';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [departures, setDepartures] = useState<BusDeparture[]>(INITIAL_DEPARTURES);
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('departures');
  const [selectedBus, setSelectedBus] = useState<BusDeparture>(INITIAL_DEPARTURES[0]);
  const [searchState, setSearchState] = useState<SearchState>({
    origin: 'Bengaluru',
    destination: 'Pune',
    date: 'Fri, 24 Oct',
    passengers: 1,
    deadlineTime: '07:30 AM',
  });

  const [bookingInfo, setBookingInfo] = useState({
    selectedSeats: ['L3'],
    totalFare: 1650,
    boardingPoint: 'Kempegowda BS Majestic (20:30)',
    droppingPoint: 'Swargate, Pune (06:45)',
    passengerName: 'Vinay Sidhu',
    passengerPhone: '+91 98765 43210',
  });

  // Device viewing presentation
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Modals state
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchModalMode, setSearchModalMode] = useState<'route' | 'deadline'>('route');
  const [promiseScoreModalBus, setPromiseScoreModalBus] = useState<BusDeparture | null>(null);
  const [showGuaranteeModal, setShowGuaranteeModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [detailsModalBus, setDetailsModalBus] = useState<BusDeparture | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Recalculate deadline comparison when deadlineTime changes
  const handleUpdateSearchState = (newState: SearchState) => {
    setSearchState(newState);

    // Dynamic adjustment of arrivals relative to new deadline
    const updated = departures.map((b) => {
      // Parse arrival time
      const [arrHour, arrMin] = b.arrivalTime.split(':').map(Number);
      const arrTotalMin = arrHour * 60 + arrMin;

      // Parse deadline
      const isPM = newState.deadlineTime.includes('PM');
      const timeStr = newState.deadlineTime.replace(/\s*(AM|PM)/i, '');
      const [deadHourRaw, deadMinRaw] = timeStr.split(':').map(Number);
      const deadHour = isPM && deadHourRaw !== 12 ? deadHourRaw + 12 : deadHourRaw;
      const deadTotalMin = deadHour * 60 + (deadMinRaw || 0);

      const diff = deadTotalMin - arrTotalMin;

      if (diff >= 0) {
        return {
          ...b,
          deadlineComparison: {
            status: 'ahead' as const,
            minutesDiff: diff,
            text: `Arrives ${diff}m before your ${newState.deadlineTime} deadline`,
          },
        };
      } else {
        return {
          ...b,
          deadlineComparison: {
            status: 'delayed' as const,
            minutesDiff: diff,
            text: `Arrives after ${newState.deadlineTime} deadline (+${Math.abs(diff)}m)`,
            warningText: `Exceeds deadline by ${Math.abs(diff)}m due to Katraj bypass traffic`,
          },
        };
      }
    });

    setDepartures(updated);
  };

  const handleApplyFilters = (filters: {
    operators: string[];
    maxPrice: number;
    hasRestroom: boolean;
    hasCharging: boolean;
    fleetType: string[];
  }) => {
    let filtered = INITIAL_DEPARTURES.filter((b) => b.price <= filters.maxPrice);

    if (filters.operators.length > 0) {
      filtered = filtered.filter((b) =>
        filters.operators.some((op) => b.operator.toLowerCase().includes(op.toLowerCase()))
      );
    }

    if (filters.fleetType.length > 0) {
      filtered = filtered.filter((b) =>
        filters.fleetType.some((ft) => b.busType.toLowerCase().includes(ft.toLowerCase()))
      );
    }

    if (filters.hasRestroom) {
      filtered = filtered.filter((b) =>
        b.amenities.some((a) => a.text.toLowerCase().includes('restroom'))
      );
    }

    if (filters.hasCharging) {
      filtered = filtered.filter((b) =>
        b.amenities.some((a) => a.text.toLowerCase().includes('charging'))
      );
    }

    setDepartures(filtered.length > 0 ? filtered : INITIAL_DEPARTURES);
  };

  const handleSelectBusForSeats = (bus: BusDeparture) => {
    setSelectedBus(bus);
    setActiveScreen('seats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (details: {
    selectedSeats: string[];
    totalFare: number;
    boardingPoint: string;
    droppingPoint: string;
    passengerName: string;
    passengerPhone: string;
  }) => {
    setBookingInfo(details);
    setActiveScreen('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current screen title
  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'departures':
        return 'Live Trip Tracker';
      case 'seats':
        return 'Select Berth';
      case 'tracker':
        return 'Live Trip GPS';
      case 'driver':
        return 'Driver Companion';
      case 'guarantee':
        return 'TripPilot Guarantee';
      default:
        return 'TripPilot';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF4EC] flex flex-col items-center justify-start text-[#1d1b17] font-sans">
      {/* Top Presentation Bar (Allows switching to Mobile Phone Preview or Fluid View, and fast screen switching) */}
      <aside aria-label="Simulator Controls" className="w-full bg-[#32302b] text-[#f6f0e8] px-4 py-2 border-b border-[#50453e] z-50 text-xs shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#ffdcc2] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#febb84]">directions_bus</span>
              TripPilot
            </span>
            <span className="text-[#d4c3ba] hidden sm:inline">• Warm Tactile Transit</span>
          </div>

          {/* Quick Screen Pickers */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[#d4c3ba] text-[11px] mr-1 hidden md:inline">Screens:</span>
            <button
              onClick={() => setActiveScreen('departures')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                activeScreen === 'departures'
                  ? 'bg-[#ffdcc2] text-[#2e1500]'
                  : 'bg-[#50453e] hover:bg-[#67574E] text-[#f6f0e8]'
              }`}
            >
              1. Departures
            </button>
            <button
              onClick={() => setActiveScreen('seats')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                activeScreen === 'seats'
                  ? 'bg-[#ffdcc2] text-[#2e1500]'
                  : 'bg-[#50453e] hover:bg-[#67574E] text-[#f6f0e8]'
              }`}
            >
              2. Seat Selection
            </button>
            <button
              onClick={() => setActiveScreen('tracker')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                activeScreen === 'tracker'
                  ? 'bg-[#ffdcc2] text-[#2e1500]'
                  : 'bg-[#50453e] hover:bg-[#67574E] text-[#f6f0e8]'
              }`}
            >
              3. Live GPS Tracker
            </button>
            <button
              onClick={() => setActiveScreen('driver')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                activeScreen === 'driver'
                  ? 'bg-[#ffdcc2] text-[#2e1500]'
                  : 'bg-[#50453e] hover:bg-[#67574E] text-[#f6f0e8]'
              }`}
            >
              4. Driver Cockpit
            </button>
          </div>

          {/* Device Frame Toggle */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsMobileFrame(true)}
              className={`px-2.5 py-1 rounded-l-md font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                isMobileFrame
                  ? 'bg-[#ffdcc2] text-[#2e1500] font-bold'
                  : 'bg-[#50453e] hover:bg-[#67574E] text-[#f6f0e8]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">smartphone</span>
              <span>Phone</span>
            </button>
            <button
              onClick={() => setIsMobileFrame(false)}
              className={`px-2.5 py-1 rounded-r-md font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                !isMobileFrame
                  ? 'bg-[#ffdcc2] text-[#2e1500] font-bold'
                  : 'bg-[#50453e] hover:bg-[#67574E] text-[#f6f0e8]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
              <span>Fluid</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container: Mobile Phone Frame OR Fluid View */}
      <div
        className={`w-full transition-all duration-300 flex justify-center ${
          isMobileFrame
            ? 'py-6 px-2 sm:px-4'
            : 'w-full'
        }`}
      >
        <div
          className={`bg-[#fff8f0] text-[#1d1b17] relative flex flex-col transition-all duration-300 overflow-hidden ${
            isMobileFrame
              ? 'w-full max-w-[430px] rounded-[44px] shadow-[0_24px_64px_rgba(59,42,32,0.18)] border-[9px] border-[#32302b] min-h-[890px]'
              : 'w-full max-w-4xl min-h-screen shadow-sm border-x border-[#e7e2da]'
          }`}
        >
          {/* Simulated Mobile Status Bar (when mobile frame is enabled) */}
          {isMobileFrame && (
            <div className="h-10 bg-[#fff8f0] px-6 pt-2 flex items-center justify-between text-xs font-bold text-[#1d1b17] shrink-0 select-none">
              <span>09:41</span>
              {/* Dynamic Island / Camera hole */}
              <div className="w-20 h-4 bg-[#32302b] rounded-full mx-auto -mt-1 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#1d1b17] ml-auto mr-2"></div>
              </div>
              <div className="flex items-center gap-1 text-[13px]">
                <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
                <span className="material-symbols-outlined text-[14px]">wifi</span>
                <span className="material-symbols-outlined text-[16px]">battery_full</span>
              </div>
            </div>
          )}

          {/* Top App Header (unless in driver cockpit mode) */}
          {activeScreen !== 'driver' && (
            <Header
              title={getScreenTitle()}
              showBack={activeScreen !== 'departures'}
              onBack={() => {
                if (activeScreen === 'seats') setActiveScreen('departures');
                else if (activeScreen === 'tracker') setActiveScreen('departures');
                else if (activeScreen === 'guarantee') setActiveScreen('departures');
                else setActiveScreen('departures');
              }}
              onOpenProfile={() => setShowProfileModal(true)}
              activeScreen={activeScreen}
            />
          )}

          {/* Active Screen Content */}
          <main className="flex-1 flex flex-col w-full relative">
            {activeScreen === 'departures' && (
              <DeparturesScreen
                departures={departures}
                searchState={searchState}
                onOpenSearchModal={() => {
                  setSearchModalMode('route');
                  setShowSearchModal(true);
                }}
                onOpenDeadlineModal={() => {
                  setSearchModalMode('deadline');
                  setShowSearchModal(true);
                }}
                onSelectBus={handleSelectBusForSeats}
                onViewBusDetails={(bus) => setDetailsModalBus(bus)}
                onOpenPromiseScoreInfo={(bus) => setPromiseScoreModalBus(bus)}
                onOpenGuarantee={() => setShowGuaranteeModal(true)}
                onOpenFilters={() => setShowFilterDrawer(true)}
              />
            )}

            {activeScreen === 'seats' && (
              <SeatSelectionScreen
                bus={selectedBus}
                onBack={() => setActiveScreen('departures')}
                onConfirmBooking={handleConfirmBooking}
              />
            )}

            {activeScreen === 'tracker' && (
              <LiveTrackerScreen
                bus={selectedBus}
                onBack={() => setActiveScreen('departures')}
                onOpenDriverMode={() => setActiveScreen('driver')}
                onOpenGuarantee={() => setShowGuaranteeModal(true)}
                selectedSeats={bookingInfo.selectedSeats}
                boardingPoint={bookingInfo.boardingPoint}
                droppingPoint={bookingInfo.droppingPoint}
              />
            )}

            {activeScreen === 'driver' && (
              <DriverDisplayScreen
                bus={selectedBus}
                onExit={() => setActiveScreen('tracker')}
              />
            )}

            {activeScreen === 'guarantee' && (
              <div className="p-4 flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-[#ffdcc2]/50 border border-[#febb84]">
                  <h2 className="text-xl font-bold text-[#2e1500] mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#855324]">support_agent</span>
                    TripPilot Guarantee
                  </h2>
                  <p className="text-sm text-[#693c0f]">
                    If your selected bus misses the promise window by &gt;45m, our auto-reroute cab allowance applies automatically.
                  </p>
                </div>
                <button
                  onClick={() => setShowGuaranteeModal(true)}
                  className="h-12 rounded-xl bg-[#6f4e37] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Open Guarantee Coverage & Simulator</span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </button>
              </div>
            )}
          </main>

          {/* Bottom Navigation (shown on Departures, Tracker, and Guarantee screens) */}
          {activeScreen !== 'driver' && activeScreen !== 'seats' && (
            <BottomNav
              activeScreen={activeScreen}
              onNavigate={(s) => setActiveScreen(s)}
              hasActiveTrip={true}
            />
          )}
        </div>
      </div>

      {/* Modals & Dialogs */}
      {showSearchModal && (
        <RouteSearchModal
          searchState={searchState}
          onSave={handleUpdateSearchState}
          onClose={() => setShowSearchModal(false)}
          initialMode={searchModalMode}
        />
      )}

      {promiseScoreModalBus && (
        <PromiseScoreModal
          bus={promiseScoreModalBus}
          onClose={() => setPromiseScoreModalBus(null)}
        />
      )}

      {showGuaranteeModal && (
        <TripPilotGuaranteeModal onClose={() => setShowGuaranteeModal(false)} />
      )}

      {showFilterDrawer && (
        <FilterDrawer
          onClose={() => setShowFilterDrawer(false)}
          onApplyFilters={handleApplyFilters}
        />
      )}

      {detailsModalBus && (
        <BusDetailsModal
          bus={detailsModalBus}
          onClose={() => setDetailsModalBus(null)}
          onSelectSeats={(bus) => {
            setSelectedBus(bus);
            setActiveScreen('seats');
          }}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          onOpenDriverView={() => {
            setShowProfileModal(false);
            setActiveScreen('driver');
          }}
        />
      )}
    </div>
  );
}
