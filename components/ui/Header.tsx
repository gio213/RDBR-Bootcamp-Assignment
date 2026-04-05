"use client";

import Link from "next/link";
import {  useState } from "react";
import { LogoIcon } from "@/helper/Icon";
import type { Course } from "@/types/course";
import UserAvatar from "../UserProfileAvatar";
import NavLink from "../NavLink";
import { CTAButton } from "./Button";
import { EnrolledCoursesSheet } from "./EnrolledCoursesSheet";

interface HeaderProps {
  isAuth?: boolean;
  user?: { name: string; avatarUrl?: string };
}

export function Header({ isAuth = false, user }: HeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!isAuth || !isSheetOpen || enrolledCourses.length > 0 || isLoading) {
  //     return;
  //   }

  //   let cancelled = false;

  //   async function loadCourses() {
  //     setIsLoading(true);

  //     try {
  //       const response = await fetch(
  //         "https://api.redclass.redberryinternship.ge/api/courses/featured",
  //       );
  //       const payload = await response.json();

  //       if (!cancelled) {
  //         setEnrolledCourses(
  //           Array.isArray(payload?.data) ? payload.data.slice(0, 4) : [],
  //         );
  //       }
  //     } catch {
  //       if (!cancelled) {
  //         setEnrolledCourses([]);
  //       }
  //     } finally {
  //       if (!cancelled) {
  //         setIsLoading(false);
  //       }
  //     }
  //   }

  //   loadCourses();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [isAuth, isSheetOpen, enrolledCourses.length, isLoading]);

  return (
    <>
      <header className="w-full border-b border-grey-200 bg-grey-100">
        <div className="mx-auto flex h-27 max-w-391.5 items-center justify-between px-4 lg:px-44.25">
          <Link href="/" className="shrink-0">
            <LogoIcon />
          </Link>

          <div className="flex items-center gap-6">
            <NavLink href="/courses" icon="sparkle">
              Browse Courses
            </NavLink>

            {isAuth ? (
              <>
                <NavLink
                  href="/enrolled"
                  icon="book"
                  onClick={() => setIsSheetOpen(true)}
                  activeOverride={isSheetOpen}
                >
                  Enrolled Courses
                </NavLink>
                <UserAvatar user={user} />
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <CTAButton className="h-15 w-28.5" variant="outline">
                    Log In
                  </CTAButton>
                </Link>
                <Link href="/register">
                  <CTAButton className="h-15 w-31.25" variant="primary">
                    Sign Up
                  </CTAButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <EnrolledCoursesSheet
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        courses={enrolledCourses}
        schedule={{
          days: "Monday",
          time: "6:00 PM - 8:00 PM",
          location: "Online",
          sessionType: "Live",
        }}
        loading={isLoading}
      />
    </>
  );
}
