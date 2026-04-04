// components/course/CourseDetailLeft.tsx
import Image from "next/image";
import { CourseResponseDetailed } from "@/types/course-detailed";
import { CalendarIcon, CodeIcon, StarIcon } from "@/helper/Icon";

interface Props {
  course: CourseResponseDetailed;
}

function calcAvgRating(reviews: { rating: number }[]): number | null {
  if (!reviews.length) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}

export function CourseDetailLeft({ course }: Props) {
  const {
    data: {
      category,
      description,
      durationWeeks,
      instructor,
      reviews,
      image,
      title,
    },
  } = course;

  const avgRating = calcAvgRating(reviews);

  return (
    <div className="flex w-225.75 flex-1 flex-col items-start gap-4.5">
      {/* Here will go  */}
      {/* Frame 429 — thumbnail + meta row, gap 16px */}
      <div className="flex w-full flex-col items-start gap-4">
        {/* Thumbnail — Figma: 474px height, border-radius 10px */}
        <div className="relative h-118.5 w-full overflow-hidden rounded-[10px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Frame 438 — meta row, gap 16px */}
        <div className="flex w-full items-center gap-4">
          {/* Frame 38 / Frame 527 — left: weeks+hours+rating, right: category chip */}
          <div className="flex flex-1 items-center justify-between">
            {/* Left meta items — gap 12px */}
            <div className="flex items-center gap-3">
              {/* Weeks */}
              <div className="flex items-center gap-1">
                <CalendarIcon />
                <span className="text-[14px] font-medium leading-4.25 text-grey-600">
                  {durationWeeks} Weeks
                </span>
              </div>

              {/* Hours — Figma-ში 128 Hours ჩანს, API-ში არ არის */}

              {/* Rating */}
              {avgRating !== null && (
                <div className="flex items-center gap-1">
                  <StarIcon />
                  <span className="text-[14px] font-medium leading-5.25 text-grey-600">
                    {avgRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Category chip — Figma: bg-white, radius-12, padding 8px 12px */}
            <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2">
              <CodeIcon />
              <span className="text-[16px] font-medium leading-6 text-grey-500">
                {category.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Frame 501 — instructor + description, gap 18px */}
      <div className="flex w-full flex-col items-start gap-4.5">
        {/* Instructor chip — Figma: bg-white, radius-12, padding 8px 12px, gap 12px */}
        <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2">
          {/* Avatar — Figma: 30x30, border-radius 4px */}
          <div className="relative h-7.5 w-7.5 shrink-0 overflow-hidden rounded-sm bg-grey-200">
            {instructor.avatar && (
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                fill
                className="object-cover"
              />
            )}
          </div>
          <span className="text-[16px] font-medium leading-6 text-grey-500">
            {instructor.name}
          </span>
        </div>

        {/* Description section — gap 24px */}
        <div className="flex w-full flex-col items-start gap-6">
          {/* Frame 362 — gap 24px */}
          <div className="flex w-full flex-col gap-6">
            {/* Title — Figma: 20px, 600, grey-400 */}
            <h2 className="text-[20px] font-semibold leading-6 text-grey-400">
              Course Description
            </h2>

            {/* Body — Figma: 16px, 500, line-height 24px, grey-600 (#525252) */}
            <p className="text-[16px] font-medium leading-6 text-grey-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
