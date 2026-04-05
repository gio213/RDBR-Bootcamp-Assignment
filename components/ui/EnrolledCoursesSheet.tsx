"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CourseCard, type ScheduleInfo } from "@/components/CourseCard";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/course";
import { CTAButton } from "./Button";
import { Spinner } from "./Spinner";
import { CloseIcon, EmptyPackageIcon } from "@/helper/Icon";

interface EnrolledCoursesSheetProps {
  open: boolean;
  onClose: () => void;
  courses?: Course[];
  schedule: ScheduleInfo; // moved from hardcoded constant
  loading?: boolean;
}

export function EnrolledCoursesSheet({
  open,
  onClose,
  courses = [],
  schedule,
  loading = false,
}: EnrolledCoursesSheetProps) {
  const lockCountRef = useRef(0);

  useEffect(() => {
    if (!open) return;

    lockCountRef.current += 1;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      lockCountRef.current -= 1;
      if (lockCountRef.current === 0) {
        document.body.style.overflow = "";
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      {/* Backdrop */}
      <div
        role="presentation"
        className="absolute inset-0 bg-grey-950/25"
        onClick={onClose}
      />

      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex h-full w-full max-w-198.5 flex-col bg-grey-100 shadow-[-16px_0_40px_rgba(10,10,10,0.08)] transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enrolled-courses-title"
        inert={!open ? true : undefined} // ← replaces aria-hidden
      >
        <div className="flex items-center justify-between px-5 pt-5 lg:px-14.25 lg:pt-10">
          <div>
            <h2
              id="enrolled-courses-title"
              className="text-[28px] font-semibold leading-8 text-grey-900 lg:text-[36px] lg:leading-11"
            >
              Enrolled Courses
            </h2>
            <p className="mt-1 text-[14px] font-medium leading-6 text-grey-900">
              <span className="text-grey-400">Total Enrollments </span>
              {courses.length}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close sheet"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full text-grey-400 transition-colors hover:bg-white hover:text-grey-700"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-6 lg:px-14.25 lg:pb-10 lg:pt-9">
          {loading ? (
            <div className="flex h-full min-h-80 items-center justify-center">
              <Spinner
                variant="primary"
                size="lg"
                label="Loading enrolled courses"
              />
            </div>
          ) : courses.length > 0 ? (
            <div className="flex flex-col gap-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  type="enrolled"
                  course={course}
                  schedule={schedule}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            <EmptyState onClose={onClose} />
          )}
        </div>
      </aside>
    </div>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full min-h-120 flex-col items-center justify-center rounded-xl bg-grey-100 px-6 text-center">
      <EmptyPackageIcon />
      <h3 className="mt-6 text-[28px] font-semibold leading-8 text-grey-900 lg:text-[32px]">
        No Enrolled Courses Yet
      </h3>
      <p className="mt-3 max-w-70 text-[14px] font-medium leading-5 text-grey-500">
        Your learning journey starts here! Browse courses to get started.
      </p>
      <Link href="/" onClick={onClose} className="mt-6">
        <CTAButton
          variant="primary"
          className="h-14.5 px-6 py-4 text-[16px] leading-6"
        >
          Browse Courses
        </CTAButton>
      </Link>
    </div>
  );
}
