import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  theme?: "default" | "halloween" | "christmas" | "valentines" | "easter" | "children" | "independence" | "cinema";
}

export default function HeroSection({ theme = "default" }: HeroSectionProps) {
  const getOverlayDecoration = () => {
    switch (theme) {
      case "halloween":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl"
                initial={{ 
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.6,
                  rotate: Math.random() * 360 
                }}
                animate={{
                  rotate: [0, 360],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {i % 3 === 0 ? "🎃" : i % 3 === 1 ? "👻" : "🦇"}
              </motion.div>
            ))}
            <div
              className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>
        );
      case "christmas":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white text-2xl"
                initial={{ top: -20, left: `${Math.random() * 100}%` }}
                animate={{
                  top: "100%",
                  left: `${Math.random() * 100}%`,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                ❄
              </motion.div>
            ))}
          </div>
        );
      case "valentines":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400 text-3xl"
                initial={{ bottom: -20, left: `${Math.random() * 100}%` }}
                animate={{
                  bottom: "100%",
                  left: `${Math.random() * 100}%`,
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                ♥
              </motion.div>
            ))}
          </div>
        );
      case "easter":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ 
                  bottom: -20, 
                  left: `${Math.random() * 100}%`,
                  rotate: 0 
                }}
                animate={{
                  bottom: "110%",
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 5 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                {i % 2 === 0 ? "🐰" : "🥚"}
              </motion.div>
            ))}
          </div>
        );
      case "children":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ 
                  top: `${Math.random() * 100}%`,
                  left: `${-10 + Math.random() * 10}%`,
                  rotate: 0 
                }}
                animate={{
                  left: `${100 + Math.random() * 10}%`,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 8 + 6,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                {["🎈", "🎨", "🎁", "🧸", "🎪"][i % 5]}
              </motion.div>
            ))}
          </div>
        );
      case "independence":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                initial={{ 
                  top: -20, 
                  left: `${Math.random() * 100}%`,
                  opacity: 0.8 
                }}
                animate={{
                  top: "100%",
                  rotate: [0, 360],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {i % 2 === 0 ? "🇧🇷" : "⭐"}
              </motion.div>
            ))}
            <div
              className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>
        );
      case "cinema":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-5xl"
                initial={{ 
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  scale: 0,
                  opacity: 0 
                }}
                animate={{
                  scale: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                {i % 3 === 0 ? "🎬" : i % 3 === 1 ? "🍿" : "🎥"}
              </motion.div>
            ))}
            <div
              className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        {/*<img
          src="/@assets/image_1761237238363.png"
          alt="Cinema Hero"
          className="w-full h-full object-cover"
          data-testid="img-hero-background"
        />*/}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      {getOverlayDecoration()}

      <div className="relative h-full flex flex-col items-center justify-center px-4 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <img
               src="/images/cine-estação_1761215287537.png"
            alt="Cine Estação"
            className="h-24 md:h-32 w-auto mx-auto mb-4"
          />
          <p className="text-lg md:text-xl text-white/90 font-medium">
            Cine Estação | A felicidade só é verdadeira quando compartilhada.
          </p>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="text-center max-w-3xl"
>
  <div
    className="backdrop-blur-md bg-black/40 rounded-xl p-6 md:p-8 border border-white/10"
    data-testid="text-hero-overlay"
  >
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
      A magia do cinema está de volta ✨
    </h1>
    <p className="text-white/80 text-lg mt-3">
      Viva grandes histórias aqui no Cine Estação!
    </p>
  </div>
</motion.div>

      </div>
    </section>
  );
}
