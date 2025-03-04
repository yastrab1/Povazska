import React from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
    open: boolean;
    onClose: (shouldContinue: boolean) => void;
}

export default function WarningModal({open, onClose}: Props) {
    if (!open) return null;

    return (
        <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 
            flex items-center justify-center 
            transition-all duration-300 ease-in-out"
        >
            <div 
                className="bg-white w-full max-w-md rounded-[10px] 
                shadow-2xl p-6 space-y-4 
                transform transition-transform duration-300"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#333333]">
                        Ste si istí?
                    </h2>
                    <button 
                        onClick={() => onClose(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <MdClose className="w-6 h-6" />
                    </button>
                </div>

                <p className="text-[#333333] text-sm mb-6">
                    Bez obrázku naše služby nedokážu automaticky priradiť popis problému, preto ho budete musieť vypisovať sami.
                </p>

                <div className="flex justify-between gap-4">
                    <button 
                        onClick={() => onClose(false)}
                        className="flex-1 py-3 bg-gray-200 text-[#333333] 
                        rounded-[10px] font-bold
                        hover:bg-gray-300 transition-colors duration-200"
                    >
                        Späť
                    </button>
                    <button 
                        onClick={() => onClose(true)}
                        className="flex-1 py-3 bg-[#33BA72] text-white 
                        rounded-[10px] font-bold
                        hover:bg-[#2AA862] transition-colors duration-200"
                    >
                        Pokračovať
                    </button>
                </div>
            </div>
        </div>
    );
}