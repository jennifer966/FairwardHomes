import { AnalyticsBoot } from "@/components/AnalyticsBoot";
import { Assistant } from "@/components/sections/Assistant";
import { Buyers } from "@/components/sections/Buyers";
import { Comparison } from "@/components/sections/Comparison";
import { Expertise } from "@/components/sections/Expertise";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { GetStarted } from "@/components/sections/GetStarted";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { PrelaunchBanner } from "@/components/ui/PrelaunchBanner";

export default function Home() {
  return (
    <>
      <PrelaunchBanner />
      <Header />
      <main id="main">
        <Hero />
        <SavingsCalculator />
        <HowItWorks />
        <Assistant />
        <Comparison />
        <Pricing />
        <Expertise />
        <GetStarted />
        <Buyers />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <AnalyticsBoot />
    </>
  );
}
