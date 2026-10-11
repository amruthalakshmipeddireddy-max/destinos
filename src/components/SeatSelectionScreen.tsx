import React, { useState } from 'react';
import { BusDeparture, Seat } from '../types/transit';
import { MOCK_SEATS } from '../data/mockTransitData';

interface SeatSelectionScreenProps {
  bus: BusDeparture;
  onBack: () => void;
  onConfirmBooking: (bookingDetails: {
    selectedSeats: string[];
    totalFare: number;
    boardingPoint: string;
    droppingPoint: string;
    passengerName: string;
    passengerPhone: string;
  }) => void;
}

export const SeatSelectionScreen: React.FC<SeatSelectionScreenProps> = ({
  bus,
  onBack,
  onConfirmBooking,
}) => {
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(['L3']);
  const [selectedBoardingId, setSelectedBoardingId] = useState<string>(
    bus.boardingPoints[0]?.id || 'b1'
  );
  const [selectedDroppingId, setSelectedDroppingId] = useState<string>(
    bus.droppingPoints[1]?.id || 'd2' // Default to Swargate
  );
  const [passengerName, setPassengerName] = useState('Vinay Sidhu');
  const [passengerPhone, setPassengerPhone] = useState('+91 98765 43210');
  const [passengerGender, setPassengerGender] = useState<'male' | 'female'>('male');
  const [showPassengerForm, setShowPassengerForm] = useState(false);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'booked') return;
    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const currentSeats = MOCK_SEATS.filter((s) => s.deck === activeDeck);
  const totalAmount = selectedSeatIds.length * bus.price;

  const selectedBoarding =
    bus.boardingPoints.find((b) => b.id === selectedBoardingId) || bus.boardingPoints[0];
  const selectedDropping =
    bus.droppingPoints.find((d) => d.id === selectedDroppingId) || bus.droppingPoints[0];

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Mini Bus & Journey Summary Card */}
      <section className="px-4 py-3 bg-[#f9f3eb] border-b border-[#e7e2da]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-[#553722] font-bold">
              {bus.operator}
            </h2>
            <p className="font-body-sm text-body-sm text-[#50453e]">{bus.busType}</p>
          </div>
          <div className="text-right">
            <span className="font-headline-sm text-headline-sm font-bold text-[#314326]">
              {bus.promiseScore}/100
            </span>
            <p className="text-[11px] text-[#50453e] font-medium">Promise Score</p>
          </div>
        </div>

        <div className="mt-2.5 p-2.5 rounded-xl bg-white border border-[#e7e2da] flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#1d1b17]">{bus.departureTime}</span>
            <p className="text-[#50453e]">{bus.departureStation}</p>
          </div>
          <div className="flex items-center gap-1 text-[#855324] font-semibold">
            <span>{bus.duration}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#1d1b17]">{bus.arrivalTime}</span>
            <p className="text-[#50453e]">{bus.arrivalStation}</p>
          </div>
        </div>
      </section>

      {/* Deck Selector Tabs */}
      <section className="px-4 mt-4">
        <div className="bg-[#ede7df] p-1 rounded-xl flex items-center shadow-xs">
          <button
            onClick={() => setActiveDeck('lower')}
            type="button"
            className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              activeDeck === 'lower'
                ? 'bg-white text-[#553722] font-bold shadow-sm'
                : 'text-[#50453e] hover:text-[#1d1b17]'
            }`}
          >
            Lower Deck (Berths L1 - L15)
          </button>
          <button
            onClick={() => setActiveDeck('upper')}
            type="button"
            className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              activeDeck === 'upper'
                ? 'bg-white text-[#553722] font-bold shadow-sm'
                : 'text-[#50453e] hover:text-[#1d1b17]'
            }`}
          >
            Upper Deck (Berths U1 - U15)
          </button>
        </div>
      </section>

      {/* Legend Bar */}
      <section className="px-4 mt-3">
        <div className="flex items-center justify-around py-2 px-3 bg-white rounded-xl border border-[#e7e2da] text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-6 rounded border-2 border-[#d4c3ba] bg-[#fff8f0]"></div>
            <span className="text-[#50453e]">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-6 rounded bg-[#6f4e37] text-white flex items-center justify-center text-[10px]">✓</div>
            <span className="text-[#50453e] font-semibold">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-6 rounded bg-[#e7e2da] opacity-70"></div>
            <span className="text-[#82746d]">Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-6 rounded border-2 border-[#febb84] bg-[#ffdcc2]/40"></div>
            <span className="text-[#79491b]">Ladies</span>
          </div>
        </div>
      </section>

      {/* Sleeper Bus Deck Grid */}
      <section className="px-4 mt-4">
        <div className="bg-white rounded-2xl border-2 border-[#e7e2da] p-4 shadow-sm relative">
          {/* Front of bus indicator */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e7e2da] text-xs text-[#82746d]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">sports_motorsports</span>
              <span className="font-semibold uppercase tracking-wider">Pilot Cabin</span>
            </div>
            <div className="flex items-center gap-1 text-[#314326] font-semibold bg-[#d3eac0]/50 px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-[14px]">air</span>
              <span>Individual Climate AC</span>
            </div>
          </div>

          {/* Sleeper berths: Left Single Berths | Aisle | Right Double Berths */}
          <div className="grid grid-cols-4 gap-3">
            {/* Column 1: Left Single Berths */}
            <div className="col-span-1 flex flex-col gap-3">
              <div className="text-[10px] font-bold text-center text-[#82746d] uppercase tracking-wider">
                Window Single
              </div>
              {[1, 2, 3, 4, 5].map((rowNum) => {
                const prefix = activeDeck === 'lower' ? 'L' : 'U';
                const seatId = `${prefix}${rowNum}`;
                const seat =
                  currentSeats.find((s) => s.id === seatId) || {
                    id: seatId,
                    seatNumber: seatId,
                    price: bus.price,
                    status: 'available',
                  };
                const isSelected = selectedSeatIds.includes(seat.id);
                const isBooked = seat.status === 'booked';
                const isLadies = seat.status === 'ladies';

                return (
                  <button
                    key={seat.id}
                    disabled={isBooked}
                    onClick={() => toggleSeat(seat as Seat)}
                    type="button"
                    className={`h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#6f4e37] text-white border-[#553722] shadow-md scale-102 ring-2 ring-[#ffdcc2]'
                        : isBooked
                        ? 'bg-[#ede7df] border-[#e7e2da] text-[#82746d] opacity-50 cursor-not-allowed'
                        : isLadies
                        ? 'bg-[#ffdcc2]/40 border-[#febb84] text-[#79491b] hover:bg-[#ffdcc2]/70'
                        : 'bg-[#fff8f0] border-[#d4c3ba] text-[#553722] hover:border-[#855324] hover:bg-white'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between px-1">
                      <span className="text-[11px] font-bold">{seat.seatNumber}</span>
                      <span className="material-symbols-outlined text-[13px] opacity-70">
                        single_bed
                      </span>
                    </div>
                    <span className="text-[10px] mt-1 font-medium">
                      {isSelected ? 'Selected' : isBooked ? 'Sold' : `₹${bus.price}`}
                    </span>
                    {/* Pillow indicator */}
                    <div
                      className={`w-4/5 h-1.5 rounded-full mt-1 ${
                        isSelected ? 'bg-white/40' : 'bg-[#e7e2da]'
                      }`}
                    ></div>
                  </button>
                );
              })}
            </div>

            {/* Column 2: Gangway Aisle */}
            <div className="col-span-1 flex flex-col items-center justify-center text-xs text-[#82746d]/50 border-r border-dashed border-[#d4c3ba]">
              <span className="material-symbols-outlined text-[18px]">straight</span>
              <span className="[writing-mode:vertical-rl] text-[10px] uppercase font-bold tracking-widest my-4">
                Walkway Aisle
              </span>
              <span className="material-symbols-outlined text-[18px]">straight</span>
            </div>

            {/* Column 3 & 4: Right Double Berths */}
            <div className="col-span-2 flex flex-col gap-3">
              <div className="text-[10px] font-bold text-center text-[#82746d] uppercase tracking-wider">
                Double Sleeper (Aisle + Window)
              </div>
              {[1, 2, 3, 4, 5].map((rowNum) => {
                const prefix = activeDeck === 'lower' ? 'L' : 'U';
                const aisleId = `${prefix}${rowNum * 2 + 4}`;
                const windowId = `${prefix}${rowNum * 2 + 5}`;
                const aisleSeat = currentSeats.find((s) => s.id === aisleId) || {
                  id: aisleId,
                  seatNumber: aisleId,
                  price: bus.price,
                  status: 'available',
                };
                const windowSeat = currentSeats.find((s) => s.id === windowId) || {
                  id: windowId,
                  seatNumber: windowId,
                  price: bus.price,
                  status: 'available',
                };

                return (
                  <div key={rowNum} className="grid grid-cols-2 gap-2">
                    {/* Aisle berth */}
                    <button
                      disabled={aisleSeat.status === 'booked'}
                      onClick={() => toggleSeat(aisleSeat as Seat)}
                      type="button"
                      className={`h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all cursor-pointer ${
                        selectedSeatIds.includes(aisleSeat.id)
                          ? 'bg-[#6f4e37] text-white border-[#553722] shadow-md scale-102 ring-2 ring-[#ffdcc2]'
                          : aisleSeat.status === 'booked'
                          ? 'bg-[#ede7df] border-[#e7e2da] text-[#82746d] opacity-50 cursor-not-allowed'
                          : aisleSeat.status === 'ladies'
                          ? 'bg-[#ffdcc2]/40 border-[#febb84] text-[#79491b]'
                          : 'bg-[#fff8f0] border-[#d4c3ba] text-[#553722] hover:border-[#855324]'
                      }`}
                    >
                      <div className="w-full flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold">{aisleSeat.seatNumber}</span>
                        <span className="material-symbols-outlined text-[13px] opacity-70">
                          bed
                        </span>
                      </div>
                      <span className="text-[10px] mt-1 font-medium">
                        {selectedSeatIds.includes(aisleSeat.id)
                          ? 'Selected'
                          : aisleSeat.status === 'booked'
                          ? 'Sold'
                          : `₹${bus.price}`}
                      </span>
                      <div
                        className={`w-4/5 h-1.5 rounded-full mt-1 ${
                          selectedSeatIds.includes(aisleSeat.id) ? 'bg-white/40' : 'bg-[#e7e2da]'
                        }`}
                      ></div>
                    </button>

                    {/* Window berth */}
                    <button
                      disabled={windowSeat.status === 'booked'}
                      onClick={() => toggleSeat(windowSeat as Seat)}
                      type="button"
                      className={`h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all cursor-pointer ${
                        selectedSeatIds.includes(windowSeat.id)
                          ? 'bg-[#6f4e37] text-white border-[#553722] shadow-md scale-102 ring-2 ring-[#ffdcc2]'
                          : windowSeat.status === 'booked'
                          ? 'bg-[#ede7df] border-[#e7e2da] text-[#82746d] opacity-50 cursor-not-allowed'
                          : windowSeat.status === 'ladies'
                          ? 'bg-[#ffdcc2]/40 border-[#febb84] text-[#79491b]'
                          : 'bg-[#fff8f0] border-[#d4c3ba] text-[#553722] hover:border-[#855324]'
                      }`}
                    >
                      <div className="w-full flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold">{windowSeat.seatNumber}</span>
                        <span className="material-symbols-outlined text-[13px] opacity-70">
                          bed
                        </span>
                      </div>
                      <span className="text-[10px] mt-1 font-medium">
                        {selectedSeatIds.includes(windowSeat.id)
                          ? 'Selected'
                          : windowSeat.status === 'booked'
                          ? 'Sold'
                          : `₹${bus.price}`}
                      </span>
                      <div
                        className={`w-4/5 h-1.5 rounded-full mt-1 ${
                          selectedSeatIds.includes(windowSeat.id) ? 'bg-white/40' : 'bg-[#e7e2da]'
                        }`}
                      ></div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Boarding & Dropping Point Accordion */}
      <section className="px-4 mt-4 space-y-3">
        <div className="bg-white rounded-xl p-4 border border-[#e7e2da] shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-[#553722]">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            <h3 className="font-label-lg text-label-lg font-bold">Select Boarding Point</h3>
          </div>
          <div className="space-y-2">
            {bus.boardingPoints.map((bp) => (
              <label
                key={bp.id}
                onClick={() => setSelectedBoardingId(bp.id)}
                className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                  selectedBoardingId === bp.id
                    ? 'border-[#553722] bg-[#f9f3eb]'
                    : 'border-[#e7e2da] hover:bg-[#fff8f0]'
                }`}
              >
                <input
                  type="radio"
                  name="boarding"
                  checked={selectedBoardingId === bp.id}
                  onChange={() => setSelectedBoardingId(bp.id)}
                  className="mt-1 text-[#553722] focus:ring-[#553722]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1d1b17]">{bp.name}</span>
                    <span className="font-semibold text-xs text-[#553722]">{bp.time}</span>
                  </div>
                  <p className="text-xs text-[#50453e] mt-0.5">{bp.landmark}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e7e2da] shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-[#553722]">
            <span className="material-symbols-outlined text-[20px]">flag</span>
            <h3 className="font-label-lg text-label-lg font-bold">Select Dropping Point</h3>
          </div>
          <div className="space-y-2">
            {bus.droppingPoints.map((dp) => (
              <label
                key={dp.id}
                onClick={() => setSelectedDroppingId(dp.id)}
                className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                  selectedDroppingId === dp.id
                    ? 'border-[#553722] bg-[#f9f3eb]'
                    : 'border-[#e7e2da] hover:bg-[#fff8f0]'
                }`}
              >
                <input
                  type="radio"
                  name="dropping"
                  checked={selectedDroppingId === dp.id}
                  onChange={() => setSelectedDroppingId(dp.id)}
                  className="mt-1 text-[#553722] focus:ring-[#553722]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1d1b17]">{dp.name}</span>
                    <span className="font-semibold text-xs text-[#314326]">{dp.time}</span>
                  </div>
                  <p className="text-xs text-[#50453e] mt-0.5">{dp.landmark}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Passenger Contact Accordion Toggle */}
        <div className="bg-white rounded-xl p-4 border border-[#e7e2da] shadow-sm">
          <button
            onClick={() => setShowPassengerForm(!showPassengerForm)}
            type="button"
            className="w-full flex items-center justify-between text-[#553722] font-label-lg text-label-lg font-bold cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">badge</span>
              <span>Passenger Details & Contact</span>
            </div>
            <span className="material-symbols-outlined text-[20px]">
              {showPassengerForm ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {showPassengerForm && (
            <div className="mt-3 space-y-3 pt-3 border-t border-[#e7e2da]">
              <div>
                <label className="text-xs font-semibold text-[#50453e] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-[#d4c3ba] bg-[#fff8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#855324]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#50453e] block mb-1">
                    Phone Number (SMS & WhatsApp Updates)
                  </label>
                  <input
                    type="tel"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border border-[#d4c3ba] bg-[#fff8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#855324]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#50453e] block mb-1">Gender</label>
                  <div className="flex items-center gap-2 h-11">
                    <button
                      type="button"
                      onClick={() => setPassengerGender('male')}
                      className={`flex-1 h-full rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        passengerGender === 'male'
                          ? 'bg-[#553722] text-white border-[#553722]'
                          : 'bg-[#fff8f0] border-[#d4c3ba] text-[#50453e]'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setPassengerGender('female')}
                      className={`flex-1 h-full rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        passengerGender === 'female'
                          ? 'bg-[#553722] text-white border-[#553722]'
                          : 'bg-[#fff8f0] border-[#d4c3ba] text-[#50453e]'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky Bottom Booking & Tracker CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#e7e2da] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#82746d]">
                {selectedSeatIds.length} Berth{selectedSeatIds.length > 1 ? 's' : ''} ({selectedSeatIds.join(', ') || 'None'})
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-headline-md font-bold text-[#553722]">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-[#314326] font-semibold">Taxes & Insurance Incl.</span>
            </div>
          </div>

          <button
            disabled={selectedSeatIds.length === 0}
            onClick={() =>
              onConfirmBooking({
                selectedSeats: selectedSeatIds,
                totalFare: totalAmount,
                boardingPoint: `${selectedBoarding?.name} (${selectedBoarding?.time})`,
                droppingPoint: `${selectedDropping?.name} (${selectedDropping?.time})`,
                passengerName,
                passengerPhone,
              })
            }
            type="button"
            className={`h-13 px-6 rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              selectedSeatIds.length > 0
                ? 'bg-[#6f4e37] text-white hover:bg-[#553722] active:scale-95'
                : 'bg-[#ede7df] text-[#82746d] cursor-not-allowed'
            }`}
          >
            <span>Proceed & Track</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
