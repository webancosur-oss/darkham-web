import AboutSection from "@/components/AboutSection/AboutSection";
import Hero from "@/components/Hero/Hero";
import PlansSection from "@/components/Plansection/PlansSection";
import PurposeSection from "@/components/PurposeSection/PurposeSection";
import TrajectorySection from "@/components/ProcessSection/ProcessSection";
import ProcessSection from "@/components/ProcessSection/ProcessSection";
import MissionVisionSection from "@/components/MissionVisionSection/MissionVisionSection";
import ValuesSection from "@/components/ValuesSection/ValuesSection";
import LocationSection from "@/components/LocationSection/LocationSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <PurposeSection />
      <MissionVisionSection />
      <ValuesSection />
      <ProcessSection />
      <LocationSection />

      <PlansSection />
    </main>
  );
}