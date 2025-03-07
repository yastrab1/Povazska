import React, { Dispatch, SetStateAction } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdMailOutline,
  MdOutlinePerson,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import { formProgress } from "@/lib/globals";
import { Input } from "@/components/ui/input";
import "@/app/components/design/form.css";
import styles from "../design/styles";

interface Props {
  setState: Dispatch<SetStateAction<formProgress>>;
  nameSet: (state: string) => void;
  emailSet: (state: string) => void;
  logname: string;
  logemail: string;
}

export default function PersonalInfoCard({
  setState,
  nameSet,
  emailSet,
  logname,
  logemail,
}: Props) {
  return (
    <div className={styles.container}>
  {/* Background Gradient */}
  <div className={styles.backgroundOverlay}></div>

  <div className="relative z-10">
    {/* Title Section */}
    <div className={styles.titleSection}>
      <h2 className={styles.title}>Kontakt</h2>
      <p className={styles.subtitle}>Daj nám na seba kontakt.</p>
    </div>

    {/* Account Tip */}
    <div className={styles.formTip}>
      <MdOutlineLibraryAddCheck className={styles.formTipIcon} />
      <div className="ml-3">
        <h3 className={styles.formTipTitle}>Pozoruj svoje podnety s účtom</h3>
        <p className={styles.formTipText}>
          Založenie účtu umožňuje sledovanie procesu riešenia podaných podnetov.
        </p>
      </div>
    </div>

    {/* Form Fields */}
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className={styles.formLabel}>
          <MdOutlinePerson className={styles.formIcon} /> Meno
        </label>
        <Input
          type="text"
          id="name"
          className={styles.formField}
          value={logname}
          onChange={(e) => nameSet(e.target.value)}
          placeholder="Zadajte svoje meno"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className={styles.formLabel}>
          <MdMailOutline className={styles.formIcon} /> Email
        </label>
        <Input
          type="email"
          id="email"
          className={styles.formField}
          value={logemail}
          onChange={(e) => emailSet(e.target.value)}
          placeholder="Zadajte svoj email"
          required
        />
      </div>
    </form>

    {/* Buttons */}
    <div className={styles.buttonContainer}>
      <button className={styles.backButton} onClick={() => setState("personal info")}>
        <MdChevronLeft className='text-2xl' /> Späť
      </button>
      <button className={styles.nextButton} onClick={() => setState("image upload")}>
        Ďalej <MdChevronRight className='text-2xl' />
      </button>
    </div>

    {/* Progress Bar */}
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: "20%" }}></div>
    </div>
  </div>
</div>
  );
}