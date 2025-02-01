'use client'
import { Bold, Italic, Underline } from "lucide-react"

import ImageCarousel from "@/app/components/ui/imagesCarousel";
import {Button} from "@/components/ui/button";
import WarningModal from "@/app/components/ui/warningModal";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Data, State} from "@/app/page";
import {Card, CardContent, CardFooter, CardHeader,  CardTitle} from "@/components/ui/card";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface Props{
    tags:string[]
    setData:Dispatch<SetStateAction<Data>>;
    setState:Dispatch<SetStateAction<State>>;
}
export default function TagSelectionCard({tags,setData,setState}:Props) {
    const [selected, setSelected] = useState<string[]>();

    const onOkClick = () => {
        setData(data=>{
            return {
                ...data,
                userSelectedTags: selected || [""],
            }})
        setState(4)
    }

    const handleValueChange = (value: string[]) => {
        setSelected(value)
    }

    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle>Vyberte najlepšie pasujúce kategórie:</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={"p-4"}>
                {tags.length==0?"Načítavam...":
                    <ToggleGroup type="multiple" value={selected} onValueChange={handleValueChange}>
                        {tags.map(category => (
                            <ToggleGroupItem value={category} key={category}>{category}</ToggleGroupItem>
                        ))}
                    </ToggleGroup>}
                </div>
                <Button onClick={onOkClick}>
                    OK
                </Button>
                <Button variant="destructive" onClick={()=>setState("finalization")}>
                    Chcem viac popísať môj problém
                </Button>
            </CardContent>
            <CardFooter>
                Tieto kategórie budú využité na efektívnejšie spracovanie vášho problému. Ak sa rozhodnete zadať vlastné kategórie, musíte potom napísať vlastný popis.
            </CardFooter>
        </Card>

);
}