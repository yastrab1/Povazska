import CustomTagsChooser from "@/app/components/ui/chooseCustomTags";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {Data, formProgress} from "@/lib/globals";

interface Props {
    setState: Dispatch<SetStateAction<formProgress>>
    setData: Dispatch<SetStateAction<Data>>
}

export default function CustomTagsChooseCard({setState, setData}: Props) {
    const [selectedTags, setSelectedTags] = React.useState<(string)[]>(
        []
    )

    return <>
        <Card className={"p-10"}>
            <CardHeader>
                <CardTitle>Vyberte vlastné kategórie z ponuky</CardTitle>
            </CardHeader>
            <CustomTagsChooser className={"mb-10"} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
            <Button variant={"default"} onClick={() => {
                setData(data => {
                    return {
                        ...data,
                        userSelectedTags: selectedTags
                    } as Data
                })
                setState("finalization")
            }}>Submit</Button>
        </Card>
    </>


}