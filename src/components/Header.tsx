import React from 'react';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  onOpenProfile?: () => void;
  activeScreen?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Live Trip Tracker',
  onBack,
  showBack = false,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#fff8f0]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-[#e7e2da]/60">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              aria-label="Go back"
              onClick={onBack}
              type="button"
              className="min-h-[44px] min-w-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1d1b17] hover:text-[#553722] hover:bg-[#ede7df]/50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : (
            <button
              aria-label="Menu"
              onClick={onOpenProfile}
              type="button"
              className="min-h-[44px] min-w-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1d1b17] hover:text-[#553722] hover:bg-[#ede7df]/50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          )}

          <img
            alt="TripPilot Passenger Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XzuMj4DUzaruckam52Q4IrWRdZi5IRD0BdPflqIshyDOjYwIbj_m6UFdDfC1bxFJbYZKgQlr1eq8koWDTFsaVI3hnGEBdn0jAzk3I-Fksk5TC71Bm11i9zzJxxRp712KAmvyFdV3rw9wsV1k-nDzuEvZyyzF2fTEnBL0i00xomy_mI_omKaGP2uGPRJFF0G4d9E4m_RC47jwnPcMVwSQg15DBGI2qBYqNkXrImM9cX42xYIAlJrklJSw"
          />

          <h1 className="font-headline-sm text-headline-sm text-[#1d1b17] truncate font-bold tracking-tight">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProfile}
            type="button"
            aria-label="Profile"
            className="w-9 h-9 rounded-full bg-[#553722] flex items-center justify-center text-white shadow-sm hover:opacity-95 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
