"use client";
import React, { useState } from "react";
import { Course } from "@/types/course";
import { CourseCard } from "./CourseCard";
import { Pagination } from "./ui/Pagination";

interface CourseListProps {
  courses: Course[];
  type: "featured" | "listing";
}

const ITEMS_PER_PAGE = 9;

const CourseList: React.FC<CourseListProps> = ({ courses, type }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (type === "featured") {
    return (
      <section className="flex w-full max-w-391.5 flex-col items-start gap-8 px-4 lg:px-0">
        <div>
          <h1 className="font-(family-name:--font-inter) text-[24px] font-semibold leading-8 tracking-[-0.005em] text-grey-950 sm:text-[32px] sm:leading-10 lg:text-[40px] lg:leading-11">
            Start Learning Today
          </h1>
          <p className="mt-2 font-(family-name:--font-inter) text-[14px] font-normal leading-5 text-grey-700 sm:text-[16px] sm:leading-6 lg:text-[18px] lg:leading-6.5">
            Choose from our most popular courses and begin your journey
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:flex-wrap lg:flex-nowrap">
          {courses.map((course) => (
            <CourseCard type="dashboard" key={course.id} course={course} />
          ))}
        </div>
      </section>
    );
  }

  // listing — paginated, 9 per page
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const visible = courses.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course) => (
          <CourseCard
            progressPercent={55}
            type="progress"
            key={course.id}
            course={course}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-8 justify-center"
      />
    </div>
  );
};

export default CourseList;
