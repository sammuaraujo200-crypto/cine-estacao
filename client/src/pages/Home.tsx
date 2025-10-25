import { motion } from "framer-motion";
import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MovieCarousel from "@/components/MovieCarousel";
import YouTubeSection from "@/components/YouTubeSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";

export default function Home() {
  const theme = useSeasonalTheme();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header theme={theme} />
      <main>
        <HeroSection theme={theme} />
        <MovieCarousel />
        <YouTubeSection />
        <SocialSection />
      </main>
      <Footer />
      <ScrollToTop />
    </motion.div>
  );
}
