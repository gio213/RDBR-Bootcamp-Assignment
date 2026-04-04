import { HeroSlider } from "@/components/ui/HeroSlider";
import { PageContainer } from "@/components/ui/PageContainer";
import { sliderData } from "@/data/slider-data";

export default function Home() {
  return (
    <PageContainer>
      <HeroSlider slides={sliderData} />
    </PageContainer>
  );
}
