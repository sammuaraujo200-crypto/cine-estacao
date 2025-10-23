import { motion } from "framer-motion";
import { Play } from "lucide-react";
import NetflixCarousel from "./NetflixCarousel";

const mockMovies = [
  {
    id: "1",
    title: "A Casa Mágica de Gabby",
    image: "/api/placeholder/500/750",
    rating: "Livre",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "O Telefone Preto 2",
    image: "/api/placeholder/500/750",
    rating: "16+",
    trailerUrl: "https://www.youtube.com/watch?v=AUxwvvVkyqw",
  },
  {
    id: "3",
    title: "A Palavra",
    image: "/api/placeholder/500/750",
    rating: "14+",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Zootopia 2",
    image: "/api/placeholder/500/750",
    rating: "Livre",
    trailerUrl: "https://www.youtube.com/watch?v=rhAmaPsQnWE",
  },
  {
    id: "5",
    title: "Animais Perigosos",
    image: "/api/placeholder/500/750",
    rating: "16+",
    trailerUrl: "https://www.youtube.com/watch?v=VqJW_VABvRU",
  },
  {
    id: "6",
    title: "Invocação do Mal 4",
    image: "/api/placeholder/500/750",
    rating: "16+",
    trailerUrl: "https://www.youtube.com/watch?v=z_659Kq9mRQ",
  },
];

export default function MovieCarousel() {
  const carouselItems = mockMovies.map((movie) => ({
    id: movie.id,
    image: movie.image,
    title: movie.title,
    link: movie.trailerUrl,
    overlay: (
      <>
        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-8 h-8 text-primary-foreground ml-1" />
        </div>
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          {movie.rating}
        </div>
      </>
    ),
  }));

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

        <NetflixCarousel items={carouselItems} autoplay={true} autoplayDelay={4000} />
      </div>
    </section>
  );
}
