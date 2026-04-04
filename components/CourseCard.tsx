// components/ui/CourseCard.tsx
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Course } from "@/types/course";

export type CardType = "dashboard" | "listing" | "enrolled" | "progress";

export interface CourseCardProps {
  type?: CardType;
  course: Course;
  progressPercent?: number;
  className?: string;
}

export function CourseCard({
  type = "dashboard",
  course,
  progressPercent,
  className,
}: CourseCardProps) {
  const { id, title, description, image, basePrice, avgRating, instructor } =
    course;

  return (
    <Link
      href={`/course/${id}`}
      className={cn(
        "group flex h-144 w-126.5 flex-col items-start gap-6 rounded-xl p-5",
        "border border-grey-100 bg-grey-50",
        "transition-all duration-200",
        "hover:border-purple-200 hover:shadow-[0_8px_32px_rgba(79,70,229,0.10)]",
        "active:scale-[0.99]",
        className,
      )}
    >
      {/* Frame 373: thumbnail + text content — gap 16px */}
      <div className="flex flex-col items-start gap-4 self-stretch">
        {/* Frame 13: Thumbnail — 466×262, radius 10px */}
        <div className="relative h-65.5 w-full shrink-0 overflow-hidden rounded-[10px] bg-purple-50">
          {image ? (
            <Image
              priority
              src={image}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-purple-600" />
          )}
        </div>

        {/* Frame 374: instructor + title — gap 12px */}
        <div className="flex flex-col items-start gap-3 self-stretch">
          {/* Frame 371: Instructor + Rating row — gap 8px */}
          <div className="flex flex-wrap items-center justify-between gap-2 self-stretch">
            <p className="text-[14px] font-medium leading-4.25 text-grey-400">
              Lecturer {instructor.name}
            </p>
            {avgRating != null && (
              <div className="flex items-center gap-1">
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1.5l1.5 3.1 3.4.5-2.45 2.4.58 3.4L7 9.35l-3.03 1.55.58-3.4L2.1 5.1l3.4-.5L7 1.5z"
                    fill="#F4A316"
                  />
                </svg>
                <span className="text-[14px] font-medium leading-4.25 text-grey-600">
                  {avgRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Title — 24px, 600, line-height 29px, color #141414 */}
          <h3 className="line-clamp-2 self-stretch text-[24px] font-semibold leading-7.25 text-grey-900 transition-colors group-hover:text-purple-500">
            {title}
          </h3>
        </div>

        {/* Description — 16px, 500, line-height 24px, color #666666, max-width 412px */}
        {description && (
          <p className="line-clamp-3 max-w-103 text-[16px] font-medium leading-6 text-grey-500">
            {description}
          </p>
        )}

        {/* Progress bar */}
        {type === "progress" && progressPercent != null && (
          <div className="flex flex-col gap-1.5 self-stretch">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-grey-400">Progress</span>
              <span className="font-semibold text-purple-500">
                {progressPercent}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-purple-100">
              <div
                className="h-full rounded-full bg-purple-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Frame 371 bottom: Price + Button — 466×58, justify space-between */}
      <div className="mt-auto flex h-14.5 items-center justify-between self-stretch">
        {/* Frame 45: Starting from + price */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium leading-3.75 text-grey-400">
            Starting from
          </span>
          <span className="text-[32px] font-semibold leading-9.75 text-grey-900">
            ${parseInt(basePrice.toString()).toLocaleString()}
          </span>
        </div>

        {/* CTA_Button: 116×58, padding 17px 25px, bg #4F46E5, radius 8px */}
        <span className="flex h-14.5 w-29 items-center justify-center gap-2.5 rounded-lg bg-purple-500 px-6.25 py-4.25 text-[20px] font-medium leading-6 text-grey-50 transition-colors group-hover:bg-purple-600">
          Details
        </span>
      </div>
    </Link>
  );
}
