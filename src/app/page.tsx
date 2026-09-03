import AboutSection from "@/components/AboutSection/AboutSection";
import Hero from "@/components/Hero/Hero";
import PlansSection from "@/components/Plansection/PlansSection";
import PurposeSection from "@/components/PurposeSection/PurposeSection";
import TrajectorySection from "@/components/ProcessSection/ProcessSection";
import ProcessSection from "@/components/ProcessSection/ProcessSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <PurposeSection />
      <ProcessSection />
      <PlansSection />
    </main>
  );
}