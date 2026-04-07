import { cn } from "@/lib/utils";

function StepBar({ active, current }: { active: boolean; current: boolean }) {
  return (
    <div
      className={cn(
        "h-2 flex-1 rounded-[30px]",
        current ? "bg-purple-500" : active ? "bg-purple-200" : "bg-purple-50",
      )}
    />
  );
}

export default StepBar;
