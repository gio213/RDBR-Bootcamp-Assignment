export type HeroSliderType = {
  id: number;
  title: string;
  description: string;
  cta: { label: string; href: string };
  image: string; // Tailwind class or image URL
};

export const sliderData: HeroSliderType[] = [
  {
    id: 1,
    title: "Start learning something new today",
    description:
      "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
    cta: { label: "Browse Courses", href: "/courses" },
    image: "/slider/1.png",
  },
  {
    id: 2,
    title: "Pick up where you left off",
    description:
      "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
    cta: { label: "Start Learning", href: "/enrolled" },
    image: "/slider/2.png",
  },
  {
    id: 3,
    title: "Learn together, grow faster",
    description: "",
    cta: { label: "Learn More", href: "/courses" },
    image: "/slider/3.png",
  },
];
