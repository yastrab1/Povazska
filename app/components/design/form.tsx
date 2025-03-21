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
    <div className="design-form font-petrzalka--">
      <div className="full-overlap form-shadow">{/* Blur shaddow */}</div>
      <div className="full-overlap form-fill">
        <div className="form-title">
          <p className="text-xl font-bold">Kontakt</p>
          <p className="text-[#CDEEDC]">Daj nám na seba kontakt.</p>
        </div>
        <form className="form-content">
          <div className="form-tip">
            <div className="w-16 h-full">
              <MdOutlineLibraryAddCheck className="w-full h-full"/>
            </div>
            <div>
              <div className="form-tip-title">
                Pozoruj svoje getIssue<Issue>(y s účtom
              </div>
              Založenie účtu umožnuje sledovanie proces riešenia podaných getIssue<Issue>(ov.
            </div>
          </div>
          <div className="form-input">
            <label htmlFor="name" className="form-label">
              <MdOutlinePerson />
              Meno
            </label>
            <Input
              type="text"
              id="name"
              className="form-field"
              value={logname}
              onChange={(e) => nameSet(e.target.value)}
              placeholder="Zadajte svoje meno"
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="email" className="form-label">
              <MdMailOutline />
              Email
            </label>
            <Input
              type="email"
              id="email"
              className="form-field"
              value={logemail}
              onChange={(e) => emailSet(e.target.value)}
              placeholder="Zadajte svoj email"
              required
            />
          </div>
        </form>
        <div className="form-foot">
          <button
            className="form-button justify-start"
            onClick={() => setState("personal info")}
          >
            <MdChevronLeft className="text-2xl" />
            Späť
          </button>
          <button
            className="form-button justify-end"
            onClick={() => setState("image upload")}
          >
            Ďalej
            <MdChevronRight className="text-2xl" />
          </button>
        </div>
        <div className="form-completion">
            <div className="form-completion-bar"></div>
        </div>
      </div>
    </div>
  );
}
