import Features from "../components/Features";
import Hero from "../components/Hero";
import PopularEvents from "../components/PopularEvents";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Hero />
      <Features />
      <PopularEvents />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
