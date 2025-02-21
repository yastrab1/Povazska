import React, { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { formProgress } from "@/lib/globals";
import { Input } from "@/components/ui/input";

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
        <Card className="p-6 border border-black bg-[#00A84E] text-white font-petrzalka shadow-md">
            <CardHeader className="border-b border-black pb-4">
                <CardTitle className="text-2xl font-bold">Osobné informácie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold text-white">
                            Meno
                        </label>
                        <Input
                            type="text"
                            id="name"
                            className="mt-2"
                            value={logname}
                            onChange={(e) => nameSet(e.target.value)}
                            placeholder="Zadajte svoje meno"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold text-white">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            className="mt-2"
                            value={logemail}
                            onChange={(e) => emailSet(e.target.value)}
                            placeholder="Zadajte svoj email"
                            required
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between gap-4 pt-4 border-t border-black">
                <Button
                    className="w-28 h-12 bg-white text-black font-bold flex items-center justify-center gap-2 border border-black"
                    onClick={() => setState("personal info")}
                >
                    <MdChevronLeft className="text-black text-2xl" />
                    Späť
                </Button>
                <Button
                    className="w-28 h-12 bg-white text-black font-bold flex items-center justify-center gap-2 border border-black"
                    onClick={() => setState("image upload")}
                >
                    Ďalej
                    <MdChevronRight className="text-black text-2xl" />
                </Button>
            </CardFooter>
        </Card>
    );
}
