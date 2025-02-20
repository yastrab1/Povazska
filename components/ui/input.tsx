// Full Input component update with type definitions based on the Design Manual for Bratislava-Petržalka

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
    <input
        ref={ref}
        type={type}
        className={cn(
            "h-12 w-full rounded-md border border-black bg-white text-black px-4 py-2 font-arial placeholder-gray-500 focus:ring-2 focus:ring-[#00A84E] focus:outline-none",
            className
        )}
        {...props}
    />
));
Input.displayName = "Input";

export { Input };
