import React, { SetStateAction, Dispatch } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

interface Props {
  setState: Dispatch<SetStateAction<number>>;
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
    <Card>
      <CardHeader>
        <CardTitle>Osobné informácie</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded-md"
              value={logname}
              onChange={(e) => nameSet(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              value={logemail}
              onChange={(e) => emailSet(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-4 justify-between">
          <Button
            className="w-24 h-10"
            onClick={() =>
              setState((state) => {
                return state - 1;
              })
            }
          >
            <MdChevronLeft className="scale-[2]" />
            Späť
          </Button>
          <Button
            className="w-24 h-10"
            onClick={() =>
              setState((state) => {
                return state + 1;
              })
            }
          >
            Ďalej
            <MdChevronRight className="scale-[2]" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
