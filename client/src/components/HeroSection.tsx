import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  theme?: "default" | "halloween" | "christmas" | "valentines";
}

export default function HeroSection({ theme = "default" }: HeroSectionProps) {
  const getOverlayDecoration = () => {
    switch (theme) {
      case "halloween":
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 text-6xl animate-bounce">
              🎃
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>
        );
      case "christmas":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
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
            {[...Array(15)].map((_, i) => (
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
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/@assets/screenshot-1761215348215.png"
          alt="Cinema Hero"
          className="w-full h-full object-cover"
          data-testid="img-hero-background"
        />
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
            src="/@assets/cine estação_1761218675649.png"
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
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Consulte a programação do Cine Estação
            </h1>
            <Button
              asChild
              size="lg"
              className="rounded-full font-bold shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              data-testid="button-buy-tickets-hero"
            >
              <a href="https://csingresso.com.br/home/cidade/3516408" target="_blank" rel="noopener noreferrer">
                Comprar Ingressos
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
