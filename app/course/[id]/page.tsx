import { PageContainer } from "@/components/ui/PageContainer";
import { CourseDetailLeft } from "../CourseDetailLeftSide";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await fetch(
    `https://api.redclass.redberryinternship.ge/api/courses/${id}`,
  ).then((res) => res.json());
  console.log("course detail ", course);
  return (
    <PageContainer>
      <CourseDetailLeft course={course} />
    </PageContainer>
  );
}
