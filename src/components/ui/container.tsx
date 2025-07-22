import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(
      "container mx-auto px-4 sm:px-8 md:px-12 lg:px-24 max-w-[1400px]",
      className
    )}>
      {children}
    </div>
  );
} 