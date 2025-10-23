import { motion } from "framer-motion";
import { Play } from "lucide-react";
import NetflixCarousel from "./NetflixCarousel";
import { getYouTubeThumbnail } from "@/lib/youtube";

const mockVideos = [
  {
    id: "1",
    title: "Trailer Oficial (Completo) - Se Não Fosse Você",
    videoUrl: "https://www.youtube.com/watch?v=-Ib1ZpsRvek",
  },
  {
    id: "2",
    title: "Trailer Oficial (Completo) - O Telefone Preto 2",
    videoUrl: "https://www.youtube.com/watch?v=AUxwvvVkyqw",
  },
  {
    id: "3",
    title: "Trailer Oficial (Completo) - Zootopia 2",
    videoUrl: "https://www.youtube.com/watch?v=rhAmaPsQnWE",
  },
  {
    id: "4",
    title: "Trailer Oficial (Completo) - Animais Perigosos",
    videoUrl: "https://www.youtube.com/watch?v=VqJW_VABvRU",
  },
  {
    id: "5",
    title: "Trailer Oficial (Completo) - Invocação do mal 4",
    videoUrl: "https://www.youtube.com/watch?v=z_659Kq9mRQ",
  },
  {
    id: "6",
    title: "Trailer Oficial (Completo) - Tron: Ares",
    videoUrl: "https://www.youtube.com/watch?v=ynDbqYyiuoY",
  },
  {
    id: "7",
    title: "Trailer Oficial (Completo) - Uma Mulher Sem Filtro",
    videoUrl: "https://www.youtube.com/watch?v=GHgGWKeaej4",
  },
  {
    id: "8",
    title: "Trailer Oficial (Completo) - Corra Que a Polícia Vem Aí!",
    videoUrl: "https://www.youtube.com/watch?v=RHJ4OOtO17c",
  },
];

export default function YouTubeSection() {
  const carouselItems = mockVideos.map((video) => ({
    id: video.id,
    image: getYouTubeThumbnail(video.videoUrl, 'hq'),
    title: video.title,
    link: video.videoUrl,
    overlay: (
      <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
        <Play className="w-8 h-8 text-primary-foreground ml-1" />
      </div>
    ),
  }));

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Inscreva-se no nosso canal do YouTube:
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <img 
              src="/@assets/cine estação_1761218675649.png" 
              alt="Cine Estação" 
              className="h-8 w-auto"
            />
            <p className="text-muted-foreground font-medium">Cine Estação</p>
          </div>
        </motion.div>

        <NetflixCarousel items={carouselItems} autoplay={true} autoplayDelay={5000} />
      </div>
    </section>
  );
}
