"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

export function CarbonSubtract(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path fill="currentColor" d="M8 15h16v2H8z"></path>
    </svg>
  );
}

const Checkbox = React.forwardRef(
  ({ className, indeterminate, checked, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      indeterminate={indeterminate}
      checked={!checked ? false : checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {!checked && indeterminate === "true" ? (
          <CarbonSubtract className="h-4 w-4" />
        ) : (
          <CheckIcon className="h-4 w-4" />
        )}
        {/*{props.checked && <CheckIcon className="h-4 w-4" />}*/}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
