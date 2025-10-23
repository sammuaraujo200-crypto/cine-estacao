import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: string;
}

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "A Casa Mágica de Gabby",
    poster: "/api/placeholder/300/450",
    rating: "Livre",
  },
  {
    id: "2",
    title: "O Telefone Preto 2",
    poster: "/api/placeholder/300/450",
    rating: "16+",
  },
  {
    id: "3",
    title: "A Palavra",
    poster: "/api/placeholder/300/450",
    rating: "14+",
  },
  {
    id: "4",
    title: "Zootopia 2",
    poster: "/api/placeholder/300/450",
    rating: "Livre",
  },
  {
    id: "5",
    title: "Animais Perigosos",
    poster: "/api/placeholder/300/450",
    rating: "16+",
  },
];

export default function MovieCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(mockMovies.length - 3, prev + 1));
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Em Cartaz
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full" />
        </motion.div>

        <div className="relative">
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            data-testid="button-scroll-left"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="overflow-hidden px-12">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (300 + 24) }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {mockMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[300px]"
                >
                  <Card className="overflow-hidden group hover-elevate active-elevate-2 cursor-pointer bg-card/50 backdrop-blur-sm">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        data-testid={`img-movie-poster-${movie.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                        {movie.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-bold text-card-foreground mb-3 line-clamp-2 text-center"
                        data-testid={`text-movie-title-${movie.id}`}
                      >
                        {movie.title}
                      </h3>
                      <Button
                        className="w-full rounded-full bg-primary hover:bg-primary/90"
                        size="sm"
                        data-testid={`button-trailer-${movie.id}`}
                      >
                        Ver Trailer
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            onClick={scrollRight}
            disabled={currentIndex >= mockMovies.length - 3}
            data-testid="button-scroll-right"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
