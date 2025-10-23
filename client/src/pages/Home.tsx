import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import YouTubeSection from "@/components/YouTubeSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";

export default function Home() {
  const theme = useSeasonalTheme();

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
        <YouTubeSection />
        <SocialSection />
      </main>
      <Footer />
    </motion.div>
  );
}
