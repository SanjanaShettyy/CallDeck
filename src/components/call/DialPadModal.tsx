import React, { useState } from 'react';
import { Phone, Delete, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DialPadModal: React.FC = () => {
  const { isDialPadOpen, closeDialPad, startCall } = useApp();
  const [phoneNumber, setPhoneNumber] = useState<string>('+91 ');

  if (!isDialPadOpen) return null;

  const handleDigit = (digit: string) => {
    if (phoneNumber.length < 18) {
      setPhoneNumber((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    if (phoneNumber.length > 4) {
      setPhoneNumber((prev) => prev.slice(0, -1));
    }
  };

  const handleCall = () => {
    if (phoneNumber.trim().length >= 8) {
      closeDialPad();
      startCall('Direct Dial Customer', phoneNumber, 'Custom Store Enquiry', 'phone');
    }
  };

  const keypad = [
    { num: '1', sub: '' },
    { num: '2', sub: 'ABC' },
    { num: '3', sub: 'DEF' },
    { num: '4', sub: 'GHI' },
    { num: '5', sub: 'JKL' },
    { num: '6', sub: 'MNO' },
    { num: '7', sub: 'PQRS' },
    { num: '8', sub: 'TUV' },
    { num: '9', sub: 'WXYZ' },
    { num: '*', sub: '' },
    { num: '0', sub: '+' },
    { num: '#', sub: '' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        onClick={closeDialPad}
      />

      <div className="relative z-10 w-full max-w-xs bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700/80 p-6 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Dial Outbound
          </span>
          <button
            onClick={closeDialPad}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close dial pad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="py-4 text-center">
          <div className="text-xl font-bold tracking-wider font-mono text-white min-h-[32px] flex items-center justify-center">
            {phoneNumber}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Indian Standard Trunk (+91)
          </p>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2.5 my-2">
          {keypad.map((k) => (
            <button
              key={k.num}
              onClick={() => handleDigit(k.num)}
              className="flex flex-col items-center justify-center h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:bg-slate-600 border border-slate-700/50 transition-colors cursor-pointer"
            >
              <span className="text-lg font-bold text-slate-100">{k.num}</span>
              {k.sub && (
                <span className="text-[9px] tracking-wider text-slate-400 font-semibold -mt-1">
                  {k.sub}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="w-10" />

          {/* Call button */}
          <button
            onClick={handleCall}
            className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 flex items-center justify-center shadow-lg shadow-emerald-900/40 text-white transition-all cursor-pointer"
            title="Dial Number"
          >
            <Phone className="w-6 h-6" />
          </button>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
            title="Backspace"
            aria-label="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
