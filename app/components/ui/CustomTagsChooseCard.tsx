import CustomTagsChooser from "@/app/components/ui/chooseCustomTags";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {Data, formProgress} from "@/lib/globals";
import styles from "../design/styles";


interface Props {
    setState: Dispatch<SetStateAction<formProgress>>
    setData: Dispatch<SetStateAction<Data>>
}

export default function CustomTagsChooseCard({setState, setData}: Props) {
    const [selectedTags, setSelectedTags] = React.useState<(string)[]>(
        []
    )

    return (
       <div className={styles.container}>
      {/* Header */}
      <div className={styles.titleSection}>
        <h2 className={styles.title}>Vyberte vlastné kategórie z ponuky</h2>
        <p className={styles.subtitle}>Pomôže nám to lepšie pochopiť váš problém.</p>
      </div>

      {/* Custom Tag Selection Component */}
      <div className="mb-6">
        <CustomTagsChooser selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </div>

      {/* Submit Button */}
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            setData((data) => ({
              ...data,
              userSelectedTags: selectedTags,
            }) as Data);
            setState("finalization");
          }}
          className={styles.fullWidthButton}
        >
          Potvrdiť výber
        </button>
      </div>
    </div>)


}