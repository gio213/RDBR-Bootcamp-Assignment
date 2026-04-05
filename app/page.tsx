import CourseList from "@/components/CourseList";
import { PageContainer } from "@/components/PageContainer";
import { HeroSlider } from "@/components/ui/HeroSlider";
import { Spinner } from "@/components/ui/Spinner";
import { sliderData } from "@/data/slider-data";
import { Suspense } from "react";

export default async function Home() {
  const courses = await fetch(
    "https://api.redclass.redberryinternship.ge/api/courses/featured",
  ).then((res) => res.json());
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
