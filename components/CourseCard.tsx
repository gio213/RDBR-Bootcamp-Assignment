import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Course } from "@/types/course";

export type CardType = "dashboard" | "listing" | "enrolled" | "progress";

export interface ScheduleInfo {
  days: string;
  time: string;
  sessionType: string;
  location: string;
}

export interface CourseCardProps {
  type?: CardType;
  course: Course;
  progressPercent?: number;
  schedule?: ScheduleInfo;
  className?: string;
}

/* ── Shared sub-components ── */

function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <svg
        width="18"
        height="18"
        viewBox="0 0 26 26"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M13 2.5l3.09 6.26L23 9.77l-5 4.87 1.18 6.88L13 18.27l-6.18 3.25L8 14.64 3 9.77l6.91-1.01L13 2.5z"
          fill="#F4A316"
        />
      </svg>
      <span className="text-[14px] font-medium leading-normal text-grey-600 whitespace-nowrap">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="relative w-full">
      <div className="h-3.75 w-full rounded-[30px] bg-purple-100" />
      <div
        className="absolute top-0 left-0 h-3.75 rounded-[30px] bg-purple-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function Thumbnail({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-purple-50",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover pointer-events-none"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-purple-600" />
      )}
    </div>
  );
}

function CategoryChip({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl bg-grey-100 px-3 py-2 shrink-0">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"
          stroke="#525252"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[16px] font-medium leading-6 text-grey-600 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

/* ── Schedule icons (16px) ── */

function CalendarSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="#525252"
        strokeWidth="1.5"
      />
      <path
        d="M3 9h18M8 2v4M16 2v4"
        stroke="#525252"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9.75" stroke="#525252" strokeWidth="1.5" />
      <path
        d="M12 7v5l3 3"
        stroke="#525252"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle cx="9" cy="7" r="3.25" stroke="#525252" strokeWidth="1.5" />
      <path
        d="M2 20c0-3.5 3.13-6.5 7-6.5s7 3 7 6.5"
        stroke="#525252"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="17" cy="8.5" r="2.5" stroke="#525252" strokeWidth="1.5" />
      <path
        d="M20 20c0-2.5-1.5-4.5-3.5-5.5"
        stroke="#525252"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MapPinSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="#525252"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.5" stroke="#525252" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Main component ── */

export function CourseCard({
  type = "dashboard",
  course,
  progressPercent,
  schedule,
  className,
}: CourseCardProps) {
  const {
    id,
    title,
    description,
    image,
    basePrice,
    avgRating,
    durationWeeks,
    instructor,
    category,
  } = course;

  const formattedPrice = `$${parseInt(basePrice.toString()).toLocaleString()}`;

  /* ── Listing card ── */
  if (type === "listing") {
    return (
      <Link
        href={`/course/${id}`}
        className={cn(
          "group flex w-93.25 flex-col items-start overflow-hidden rounded-xl border border-grey-100 bg-grey-50 p-5",
          "transition-all duration-200",
          "hover:border-purple-200 hover:shadow-[0_0_15px_rgba(138,130,212,0.2)]",
          "active:border-purple-300 active:shadow-[0_0_15px_rgba(138,130,212,0.25)]",
          className,
        )}
      >
        <div className="flex w-full flex-col gap-4.5 items-start">
          <div className="flex w-full flex-col gap-4.5 items-start">
            <Thumbnail
              src={image}
              alt={title}
              sizes="373px"
              className="h-45.25 w-full rounded-[10px]"
            />

            <div className="flex w-full flex-col items-start">
              <div className="flex w-full flex-col gap-3 items-start">
                {/* Meta: Instructor | Weeks | Rating */}
                <div className="flex w-full flex-wrap items-center justify-between gap-y-2">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[14px] font-medium leading-normal text-grey-400 whitespace-nowrap">
                      {instructor.name}
                    </span>
                    <div className="h-3.5 w-0.5 rounded-full bg-grey-200" />
                    <span className="text-[14px] font-medium leading-normal text-grey-400 whitespace-nowrap">
                      {durationWeeks} Weeks
                    </span>
                  </div>
                  {avgRating != null && <RatingBadge rating={avgRating} />}
                </div>

                <h3 className="line-clamp-2 w-full text-[24px] font-semibold leading-normal text-grey-950">
                  {title}
                </h3>
              </div>
            </div>

            {/* Category chip */}
            <div className="flex flex-wrap items-start gap-y-2 w-full">
              <CategoryChip name={category.name} />
            </div>
          </div>

          {/* Price + Button */}
          <div className="flex h-12 w-full items-center justify-between">
            <div className="flex w-36 flex-col items-start justify-center whitespace-nowrap">
              <span className="text-[12px] font-medium text-grey-400">
                Starting from
              </span>
              <span className="text-[24px] font-semibold text-grey-800">
                {formattedPrice}
              </span>
            </div>
            <span className="flex shrink-0 items-center justify-center rounded-lg bg-purple-500 px-6.25 py-4.25 text-[16px] font-medium leading-6 text-grey-50 transition-colors group-hover:bg-purple-600">
              Details
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* ── Progress card ── */
  if (type === "progress") {
    return (
      <Link
        href={`/course/${id}`}
        className={cn(
          "group flex w-126.5 flex-col gap-2 items-start rounded-xl border-[0.5px] border-grey-100 bg-grey-50 p-5",
          "shadow-[0_0_11.7px_rgba(0,0,0,0.04)]",
          "transition-all duration-200",
          "hover:border-purple-200 hover:shadow-[0_0_25px_rgba(138,130,212,0.1)]",
          "active:border-purple-300 active:border active:shadow-[0_0_35px_rgba(138,130,212,0.25)]",
          className,
        )}
      >
        {/* Top: Thumbnail + Content side-by-side */}
        <div className="flex w-full items-start self-stretch h-30.75">
          <Thumbnail
            src={image}
            alt={title}
            sizes="140px"
            className="h-30.75 w-35 max-w-35 rounded-xl"
          />

          <div className="flex flex-1 flex-col gap-2.25 items-start h-full pl-4 pr-1">
            {/* Instructor + Rating */}
            <div className="flex w-full flex-wrap items-center justify-between gap-y-2">
              <p className="text-[14px] font-medium text-grey-400 whitespace-nowrap">
                <span>Lecturer </span>
                <span className="text-grey-500">{instructor.name}</span>
              </p>
              {avgRating != null && <RatingBadge rating={avgRating} />}
            </div>

            <h3 className="line-clamp-2 w-full text-[20px] font-semibold leading-6 text-grey-900">
              {title}
            </h3>
          </div>
        </div>

        {/* Bottom: Progress + View */}
        <div className="flex w-full items-end justify-between">
          <div className="flex w-84 flex-col gap-1 items-start justify-center pb-1">
            <span className="text-[12px] font-medium text-grey-900">
              {progressPercent ?? 0}% Complete
            </span>
            <ProgressBar percent={progressPercent ?? 0} />
          </div>

          <span className="flex shrink-0 items-center justify-center rounded-lg border-2 border-purple-300 px-4 py-3 text-[16px] font-medium leading-6 text-purple-500 transition-colors group-hover:bg-purple-50">
            View
          </span>
        </div>
      </Link>
    );
  }

  /* ── Enrolled card ── */
  if (type === "enrolled") {
    return (
      <Link
        href={`/course/${id}`}
        className={cn(
          "group flex w-155.75 flex-col items-start justify-center rounded-xl bg-grey-50 p-5",
          "transition-all duration-200",
          "hover:border-[0.5px] hover:border-purple-200 hover:shadow-[0_0_10px_rgba(138,130,212,0.25)]",
          "active:border active:border-purple-300 active:shadow-[0_0_35px_rgba(138,130,212,0.25)]",
          className,
        )}
      >
        {/* Top: Image + Content */}
        <div className="flex w-full items-center gap-4.5">
          <Thumbnail
            src={image}
            alt={title}
            sizes="269px"
            className="h-47.75 w-67.25 rounded-[10px]"
          />

          <div className="flex flex-1 flex-col gap-2 items-start">
            {/* Instructor + Rating */}
            <div className="flex w-full flex-wrap items-center justify-between gap-y-2">
              <p className="text-[14px] font-medium text-grey-400 whitespace-nowrap">
                <span>Instructor</span>
                <span className="text-grey-500"> {instructor.name}</span>
              </p>
              {avgRating != null && <RatingBadge rating={avgRating} />}
            </div>

            <h3 className="line-clamp-2 w-64.25 text-[20px] font-semibold leading-6 text-grey-900">
              {title}
            </h3>

            {/* Schedule details */}
            {schedule && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <CalendarSmallIcon />
                  <span className="text-[14px] font-normal leading-6.5 text-grey-500">
                    {schedule.days}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockSmallIcon />
                  <span className="text-[14px] font-normal leading-6.5 text-grey-500">
                    {schedule.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersSmallIcon />
                  <span className="text-[14px] font-normal leading-6.5 text-grey-500">
                    {schedule.sessionType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinSmallIcon />
                  <span className="text-[14px] font-normal leading-6.5 text-grey-500">
                    {schedule.location}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Progress + View */}
        <div className="flex w-full items-center justify-center gap-5 mt-2">
          <div className="flex flex-1 flex-col gap-2 items-start justify-center pl-1">
            <span className="text-[16px] font-medium leading-6 text-grey-900">
              {progressPercent ?? 0}% Complete
            </span>
            <ProgressBar percent={progressPercent ?? 0} />
          </div>

          <span className="flex w-29.25 shrink-0 items-center justify-center rounded-lg border-2 border-purple-300 px-4 py-3 text-[16px] font-medium leading-6 text-purple-500 transition-colors group-hover:bg-purple-50">
            View
          </span>
        </div>
      </Link>
    );
  }

  /* ── Dashboard card (default) ── */
  return (
    <Link
      href={`/course/${id}`}
      className={cn(
        "group flex w-126.5 flex-col items-start gap-6 overflow-hidden rounded-xl border border-grey-100 bg-grey-50 p-5",
        "transition-all duration-200",
        "hover:border-purple-200 hover:shadow-[0_0_25px_rgba(138,130,212,0.1)]",
        "active:border-purple-300 active:shadow-[0_0_35px_rgba(138,130,212,0.25)]",
        className,
      )}
    >
      {/* Thumbnail + text content */}
      <div className="flex w-full flex-col items-start gap-4">
        <Thumbnail
          src={image}
          alt={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-65.5 w-full rounded-[10px] transition-transform duration-300 group-hover:scale-[1.01]"
        />

        {/* Instructor + Title */}
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full flex-wrap items-center justify-between gap-y-2">
            <p className="text-[14px] font-medium text-grey-400 whitespace-nowrap">
              <span>Lecturer </span>
              <span className="text-grey-500">{instructor.name}</span>
            </p>
            {avgRating != null && <RatingBadge rating={avgRating} />}
          </div>

          <h3 className="line-clamp-2 w-full text-[24px] font-semibold leading-normal text-grey-900">
            {title}
          </h3>
        </div>

        {/* Description */}
        {description && (
          <p className="line-clamp-3 max-w-103 text-[16px] font-medium leading-6 text-grey-500">
            {description}
          </p>
        )}
      </div>

      {/* Price + Button */}
      <div className="mt-auto flex items-center justify-between self-stretch">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[12px] font-medium text-grey-400">
            Starting from
          </span>
          <span className="text-[32px] font-semibold text-grey-900">
            {formattedPrice}
          </span>
        </div>

        <span className="flex shrink-0 items-center justify-center rounded-lg bg-purple-500 px-6.25 py-4.25 text-[20px] font-medium text-grey-50 transition-colors group-hover:bg-purple-600">
          Details
        </span>
      </div>
    </Link>
  );
}
