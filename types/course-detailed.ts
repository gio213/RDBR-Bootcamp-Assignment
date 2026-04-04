export type CourseResponseDetailed = {
  data: Course;
};

type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: string; // string because it's "299.00"
  durationWeeks: number;
  isFeatured: boolean;
  reviews: Review[];
  isRated: boolean;
  category: Category;
  topic: Topic;
  instructor: Instructor;
  enrollment: Enrollment | null;
};

type Review = {
  userId: number;
  rating: number;
};

type Category = {
  id: number;
  name: string;
};

type Topic = {
  id: number;
  name: string;
};

type Instructor = {
  id: number;
  name: string;
  avatar: string;
};

type Enrollment = unknown; // since it's null and structure is unknown
