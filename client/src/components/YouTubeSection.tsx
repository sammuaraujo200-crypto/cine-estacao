import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import NetflixCarousel from "./NetflixCarousel";
import { getYouTubeThumbnail } from "@/lib/youtube";

export default function YouTubeSection() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const channelId = "UCPbg9yFDmA6uy_7iBQXXnTg"; // ID do canal Cine Estação
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    fetch(feedUrl)
      .then((res) => res.text())
      .then((str) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const entries = Array.from(xml.getElementsByTagName("entry"));

        // Filtra vídeos até 2 meses atrás
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

        const data = entries
          .map((entry) => {
            const id = entry.getElementsByTagName("yt:videoId")[0]?.textContent;
            const title = entry.getElementsByTagName("title")[0]?.textContent;
            const link = entry.getElementsByTagName("link")[0]?.getAttribute("href");
            const published = new Date(
              entry.getElementsByTagName("published")[0]?.textContent || ""
            );

            return { id, title, videoUrl: link, published };
          })
          .filter((v) => v.published >= twoMonthsAgo) // só vídeos dos últimos 2 meses
          .slice(0, 8); // limita a 8 vídeos

        setVideos(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar vídeos:", err);

        // 🔸 Fallback se o feed falhar (CORS ou erro de rede)
        setVideos([
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
        ]);
      });
  }, []);

  const carouselItems = videos.map((video) => ({
    id: video.id,
    image: getYouTubeThumbnail(video.videoUrl, "hq"),
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Inscreva-se no nosso canal do YouTube:
          </h2>

          {/* 🔹 Banner clicável */}
          <div className="flex justify-center mt-4">
            <a
              href="https://www.youtube.com/c/CineEsta%C3%A7%C3%A3o/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:scale-105 transition-transform duration-300"
            >
              <img
                src="/images/youtube.png"
                alt="Cine Estação - Inscreva-se no canal"
                className="h-16 md:h-24 w-auto rounded-xl shadow-lg"
              />
            </a>
          </div>
        </motion.div>

        {/* 🎥 Carrossel de vídeos */}
        <NetflixCarousel
          items={carouselItems}
          autoplay={true}
          autoplayDelay={5000}
          aspectRatio="16/9"
        />
      </div>
    </section>
  );
}
