"use client"

import * as React from "react"

import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {allTags} from "@/lib/globals";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";


export default function CustomTagsChooser({className = "", selectedTags, setSelectedTags}: {
    className?: string,
    selectedTags: string[],
    setSelectedTags: (tags: string[]) => void
}) {
    const [open, setOpen] = React.useState(false)


    return (<div className={className}>
            <ToggleGroup type="multiple" value={selectedTags} onValueChange={setSelectedTags}
                         className={"flex-wrap"}>
                {selectedTags.map(tag => (
                    <ToggleGroupItem value={tag} key={tag}>{tag}</ToggleGroupItem>
                ))}
            </ToggleGroup>
            <div className="flex items-center space-x-4">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-start">
                            Select Tags
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                        <Command>
                            <CommandInput placeholder="Change status..."/>
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {allTags.map((tag) => (
                                        <CommandItem
                                            key={tag}
                                            value={tag}
                                            onSelect={(value: string) => {
                                                if (!selectedTags.includes(value)) {
                                                    setSelectedTags(
                                                        [...selectedTags, value]
                                                    )
                                                }

                                                setOpen(false)
                                                setTimeout(() => setOpen(true), 100) // TODO dirty but works
                                            }}
                                        >
                                            {tag}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
