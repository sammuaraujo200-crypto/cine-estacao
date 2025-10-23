import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import NetflixCarousel from "./NetflixCarousel";
import { Skeleton } from "@/components/ui/skeleton";

const movieTitles = [
  { title: "Inception", rating: "14+", trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0" },
  { title: "Interstellar", rating: "12+", trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E" },
  { title: "The Dark Knight", rating: "14+", trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY" },
  { title: "Zootopia", rating: "Livre", trailerUrl: "https://www.youtube.com/watch?v=rhAmaPsQnWE" },
  { title: "Dune", rating: "14+", trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk" },
  { title: "Avatar", rating: "12+", trailerUrl: "https://www.youtube.com/watch?v=5PSNL1qE6VY" },
];

export default function MovieCarousel() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["/api/movies/batch"],
    queryFn: async () => {
      const response = await fetch("/api/movies/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titles: movieTitles.map(m => m.title) }),
      });
      if (!response.ok) throw new Error("Failed to fetch movies");
      return response.json();
    },
  });

  const carouselItems = movies?.map((movie: any, index: number) => ({
    id: movie.imdbID || String(index + 1),
    image: movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/500/750",
    title: movie.Title || movieTitles[index].title,
    link: movieTitles[index].trailerUrl,
    overlay: (
      <>
        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-8 h-8 text-primary-foreground ml-1" />
        </div>
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          {movieTitles[index].rating}
        </div>
      </>
    ),
  })) || [];

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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" data-testid={`skeleton-movie-${i}`} />
            ))}
          </div>
        ) : (
          <NetflixCarousel items={carouselItems} autoplay={true} autoplayDelay={4000} />
        )}
      </div>
    </section>
  );
}
