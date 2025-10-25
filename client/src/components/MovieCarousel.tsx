import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import NetflixCarousel from "./NetflixCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// 🎬 Aqui estão os filmes em cartaz (sem vídeos, apenas imagens)
const movieTitles = [
  {
    title: "Chainsaw Man - O Filme: Arco da Reze",
    rating: "18",
    image:"https://cinesis.s3.sa-east-1.amazonaws.com/imagem-retrato/imagem_72c2a0ac-f9aa-469e-814d-249c1bbd298d.jpg",
  },
  {
    title: "Se Não Fosse Você",
    rating: "16",
    image: "https://cinesis.s3.sa-east-1.amazonaws.com/imagem-retrato/imagem_16941dd8-c4dd-43d5-bb15-0f28b50222ad.jpg",
  },
  {
    title: "O Telefone Preto 2",
    rating: "18",
    image: "https://cinesis.s3.sa-east-1.amazonaws.com/imagem-retrato/imagem_8d7dee5a-1639-49aa-9f50-f1cfa9ab611a.jpg",
  },
  {
    title: "A Casa Mágica da Gabby",
    rating: "L",
    image: "https://cinesis.s3.sa-east-1.amazonaws.com/imagem-retrato/imagem_6c589546-7356-4bf7-9a5b-61a246311101.jpg",
  },
  {
    title: "TRON: Ares",
    rating: "12",
    image: "https://cinesis.s3.sa-east-1.amazonaws.com/imagem-retrato/imagem_eb2e915f-3f51-4ba7-800d-6872d5d9febd.jpg",
  },
  {
    title: "Os Caras Malvados 2",
    rating: "L",
    image: "https://cinesis.s3.sa-east-1.amazonaws.com/imagem-retrato/imagem_ea79ce28-792a-4c34-ac88-f8ea15758ab5.jpg",
  },
];

export default function MovieCarousel() {
  // Simula loading (mantido o mesmo comportamento)
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies-in-theater"],
    queryFn: async () => movieTitles,
  });

  const carouselItems =
    movies?.map((movie: any, index: number) => ({
      id: String(index + 1),
      image: movie.image,
      title: movie.title,
      link: null, // ❌ sem vídeos
      overlay: (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          {movie.rating}
        </div>
      ),
    })) || [];

  return (
    <section className="py-16 md:py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Título */}
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

        {/* Carrossel */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-80 w-full"
                data-testid={`skeleton-movie-${i}`}
              />
            ))}
          </div>
        ) : (
          <NetflixCarousel
            items={carouselItems}
            autoplay={true}
            autoplayDelay={4000}
            aspectRatio="2/3" // mantém formato vertical de pôster
          />
        )}

        {/* Botão Comprar Ingressos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Button
  asChild
  size="xl" // 🔹 aumenta o tamanho base
  className="rounded-full font-extrabold shadow-xl px-10 py-6 text-lg md:text-xl bg-primary hover:bg-primary/90 transition-transform transform hover:scale-105"
  data-testid="button-buy-tickets-carousel"
>
  <a
    href="https://csingresso.com.br/home/cidade/3516408"
    target="_blank"
    rel="noopener noreferrer"
  >
    🎟️ Comprar Ingressos
  </a>
</Button>

        </motion.div>
      </div>
    </section>
  );
}
