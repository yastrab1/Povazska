import React from "react";
import { MdCamera, MdPhotoLibrary, MdClose } from "react-icons/md";

interface PhotoInputChoiceModalProps {
  onClose: () => void;
  onGalleryChoose: () => void;
  onCameraChoose: () => void;
}

export default function PhotoInputChoiceModal({
  onClose,
  onGalleryChoose,
  onCameraChoose,
}: PhotoInputChoiceModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 
        flex items-end justify-center 
        transition-all duration-300 ease-in-out"
    >
      <div
        className="bg-white w-full max-w-md rounded-t-xl 
          shadow-2xl p-6 space-y-4 
          transform transition-transform duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#333333]">Pridať fotku</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={onGalleryChoose}
          className="w-full py-3 bg-[#33BA72] text-white 
            rounded-[10px] flex items-center justify-center gap-3 
            hover:bg-[#2AA862] transition-colors duration-200"
        >
          <MdPhotoLibrary className="w-6 h-6" />
          Vybrať z galérie
        </button>

        <button
          onClick={onCameraChoose}
          className="w-full py-3 bg-[#33BA72] text-white 
            rounded-[10px] flex items-center justify-center gap-3 
            hover:bg-[#2AA862] transition-colors duration-200"
        >
          <MdCamera className="w-6 h-6" />
          Odfotiť fotku
        </button>
      </div>
    </div>
  );
}
