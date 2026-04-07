import CourseList from "@/components/CourseList";
import { HeroSlider } from "@/components/HeroSlider";
import { PageContainer } from "@/components/PageContainer";
import { Spinner } from "@/components/ui/Spinner";
import { sliderData } from "@/data/slider-data";
import { api } from "@/lib/api";
import { Course } from "@/types/course";
import { Suspense } from "react";

export default async function Home() {
  const courses = await api.get<{ data: Course[] }>("courses/featured");
  return (
    <PageContainer>
      <HeroSlider slides={sliderData} />
      <Suspense
        fallback={
          <div className="flex h-40 items-center justify-center">
            <Spinner variant="primary" size="xl" label="Loading courses" />
          </div>
        }
      >
        <CourseList type="featured" courses={courses.data} />
      </Suspense>
    </PageContainer>
  );
}
