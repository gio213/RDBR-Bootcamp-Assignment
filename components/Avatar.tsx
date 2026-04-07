import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "size-8 text-[12px]",
  md: "size-10 text-[14px]",
  lg: "size-14 text-[18px]",
};

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-purple-500 font-semibold text-white select-none overflow-hidden",
        "ring-2 ring-transparent transition-all duration-200 hover:ring-purple-300",
        sizes[size],
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={name ?? "avatar"} fill className="object-cover" />
      ) : (
        <span className={cn("font-(family-name:--font-inter)", sizes[size].split(" ").find(c => c.startsWith("text-")))}>
          {initials}
        </span>
      )}
    </div>
  );
}
