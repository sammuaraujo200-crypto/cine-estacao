import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoCard {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

const mockVideos: VideoCard[] = [
  {
    id: "1",
    title: "Trailer Oficial (Completo) - Se Não Fosse Você",
    thumbnail: "/api/placeholder/400/225",
    description: "Assista ao trailer completo de #SeNãoFosseVocê Somos o melhor...",
  },
  {
    id: "2",
    title: "Trailer Oficial (Completo) - O Telefone Preto 2",
    thumbnail: "/api/placeholder/400/225",
    description: "Assista ao trailer completo de #OTelefonePreto2 Somos o melhor canal...",
  },
  {
    id: "3",
    title: "Trailer Oficial (Completo) - Zootopia 2",
    thumbnail: "/api/placeholder/400/225",
    description: "Assista ao trailer completo de #zootopia2 Somos o melhor canal...",
  },
  {
    id: "4",
    title: "Trailer Oficial (Completo) - Animais Perigosos",
    thumbnail: "/api/placeholder/400/225",
    description: "Assista ao trailer completo de #animaisperigosos",
  },
  {
    id: "5",
    title: "Trailer Oficial (Completo) - Invocação do mal 4",
    thumbnail: "/api/placeholder/400/225",
    description: "Assista ao trailer completo de #invocaçãodomal",
  },
  {
    id: "6",
    title: "Trailer Oficial (Completo) - Tron: Ares",
    thumbnail: "/api/placeholder/400/225",
    description: "Assista ao trailer completo de Tron: Ares",
  },
];

export default function YouTubeSection() {
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
          <p className="text-muted-foreground">Cine Estação</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group"
                data-testid={`card-video-${video.id}`}
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-video-thumbnail-${video.id}`}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold text-card-foreground mb-2 line-clamp-2"
                    data-testid={`text-video-title-${video.id}`}
                  >
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
