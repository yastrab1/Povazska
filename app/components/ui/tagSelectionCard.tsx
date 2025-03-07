"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Data, formProgress } from "@/lib/globals";
import styles from "../design/styles"; // Import styles

interface Props {
  tags: string[];
  setData: Dispatch<SetStateAction<Data>>;
  setState: Dispatch<SetStateAction<formProgress>>;
}

export default function TagSelectionCard({ tags, setData, setState }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const onOkClick = () => {
    setData((data) => ({
      ...data,
      userSelectedTags: selected.length > 0 ? selected : [""],
    }));
    setState("finalization");
  };

  const handleValueChange = (category: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.titleSection}>
        <h2 className={styles.title}>Vyberte najlepšie pasujúce kategórie</h2>
        <p className={styles.subtitle}>Pomôže nám to lepšie pochopiť váš problém.</p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.length === 0 ? (
          <p className="text-gray-500 text-center w-full">Načítavam...</p>
        ) : (
          tags.map((category) => (
            <button
              key={category}
              onClick={() => handleValueChange(category)}
              className={`${styles.uploadField} ${
                selected.includes(category)
                  ? "bg-green-500 text-white border-green-500 shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              {category}
            </button>
          ))
        )}
      </div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
      <button onClick={() => setState("custom tag selection")} className={styles.backButton}>
          Chcem viac popísať môj problém
        </button>
        <button onClick={onOkClick} className={styles.nextButton}>
          OK
        </button>
        
      </div>

      {/* Footer */}
      <p className="mt-5 text-sm text-gray-600 text-center">
        Tieto kategórie budú využité na efektívnejšie spracovanie vášho problému. Ak sa rozhodnete zadať vlastné kategórie, musíte potom napísať vlastný popis.
      </p>
    </div>
  );
}
