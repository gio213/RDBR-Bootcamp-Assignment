import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Figma: Cards component set
//   Type=Dashboard  — course card on home dashboard
//   Type=Enrolled   — enrolled course card (shows enroll status)
//   Type=Progress   — shows completion progress bar
//   Type=Listing    — compact card for catalog listing page

export type CardType = "dashboard" | "enrolled" | "progress" | "listing";

export interface CourseCardProps {
  type?: CardType;
  id: string | number;
  title: string;
  category?: string;
  instructor?: string;
  imageSrc?: string;
  duration?: string;       // e.g. "8 weeks"
  sessions?: number;
  rating?: number;
  enrolled?: boolean;
  completed?: boolean;
  progressPercent?: number; // 0–100
  className?: string;
}

export function CourseCard({
  type = "dashboard",
  id,
  title,
  category,
  instructor,
  imageSrc,
  duration,
  sessions,
  rating,
  enrolled,
  completed,
  progressPercent,
  className,
}: CourseCardProps) {
  return (
    <Link
      href={`/courses/${id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-grey-200 bg-white transition-all duration-200",
        "hover:border-purple-200 hover:shadow-[0_8px_32px_rgba(79,70,229,0.10)]",
        "active:scale-[0.99]",
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-purple-50">
        {imageSrc ? (
          <Image src={imageSrc} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <PlaceholderThumbnail category={category} />
        )}

        {/* Status badge */}
        {(enrolled || completed) && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[12px] font-semibold",
              completed
                ? "bg-success text-white"
                : "bg-purple-500 text-white",
            )}
          >
            {completed ? "Completed" : "Enrolled"}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category chip */}
        {category && (
          <span className="w-fit rounded-full bg-purple-50 px-3 py-1 text-[12px] font-medium text-purple-600">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-(family-name:--font-noto-sans) line-clamp-2 text-[16px] font-semibold leading-[1.4] text-grey-900 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>

        {/* Instructor */}
        {instructor && (
          <p className="text-[13px] text-grey-400">{instructor}</p>
        )}

        {/* Meta row */}
        {(duration || sessions != null || rating != null) && (
          <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-grey-100 pt-3 text-[12px] text-grey-500">
            {duration && (
              <MetaItem icon="clock">{duration}</MetaItem>
            )}
            {sessions != null && (
              <MetaItem icon="calendar">{sessions} sessions</MetaItem>
            )}
            {rating != null && (
              <MetaItem icon="star">{rating.toFixed(1)}</MetaItem>
            )}
          </div>
        )}

        {/* Progress bar (Type=Progress) */}
        {type === "progress" && progressPercent != null && (
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-grey-500">Progress</span>
              <span className="font-semibold text-purple-500">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-purple-50">
              <div
                className="h-full rounded-full bg-purple-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function MetaItem({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1">
      {icon === "clock" && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <circle cx="7" cy="7" r="5.5" stroke="#8a8a8a" strokeWidth="1.2" />
          <path d="M7 4.5V7l1.5 1.5" stroke="#8a8a8a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
      {icon === "calendar" && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#8a8a8a" strokeWidth="1.2" />
          <path d="M1.5 5.5h11M4.5 1.5v2M9.5 1.5v2" stroke="#8a8a8a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
      {icon === "star" && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="#f4a316" className="shrink-0">
          <path d="M7 1.5l1.5 3.1 3.4.5-2.45 2.4.58 3.4L7 9.35l-3.03 1.55.58-3.4L2.1 5.1l3.4-.5L7 1.5z" />
        </svg>
      )}
      {children}
    </span>
  );
}

function PlaceholderThumbnail({ category }: { category?: string }) {
  const colors: Record<string, string> = {
    Development: "from-purple-400 to-purple-600",
    Design: "from-purple-300 to-purple-500",
    "Data Science": "from-purple-500 to-purple-800",
    Business: "from-purple-600 to-purple-900",
    Marketing: "from-purple-400 to-purple-700",
  };
  const gradient = (category && colors[category]) ?? "from-purple-400 to-purple-600";

  return (
    <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
  );
}
