import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";


interface CarouselItem {
  id: string;
  image: string;
  title: string;
  link?: string; // se tiver link e for YouTube => vídeo
  overlay?: React.ReactNode;
  // opcional: tipo explícito se você quiser setar item.type = 'poster'|'video'
  type?: "poster" | "video";
}

interface NetflixCarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  aspectRatio?: "2/3" | "16/9"; // aceita só esses dois valores
}

export default function NetflixCarousel({
  items,
  autoplay = true,
  autoplayDelay = 3000,
  aspectRatio = "16/9",
}: NetflixCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // usado para mostrar preview do youtube apenas no hover/segurar
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

// controla autoplay e pausa durante hover/touch
useEffect(() => {
  if (!autoplay || !emblaApi) return;

  let interval: NodeJS.Timeout | null = null;
  let isPaused = false;

  const startAutoplay = () => {
    if (!interval) {
      interval = setInterval(() => {
        if (!isPaused) {
          if (emblaApi.canScrollNext()) emblaApi.scrollNext();
          else emblaApi.scrollTo(0);
        }
      }, autoplayDelay);
    }
  };

  const stopAutoplay = () => {
    if (interval) clearInterval(interval);
    interval = null;
  };

  startAutoplay();

  // pausa quando o mouse entra no carrossel
  const container = emblaApi.containerNode();
  container.addEventListener("mouseenter", () => { isPaused = true; });
  container.addEventListener("mouseleave", () => { isPaused = false; });

  // pausa no mobile quando o usuário toca
  container.addEventListener("touchstart", () => { isPaused = true; });
  container.addEventListener("touchend", () => { isPaused = false; });

  return () => {
    stopAutoplay();
    container.removeEventListener("mouseenter", () => { isPaused = true; });
    container.removeEventListener("mouseleave", () => { isPaused = false; });
    container.removeEventListener("touchstart", () => { isPaused = true; });
    container.removeEventListener("touchend", () => { isPaused = false; });
  };
}, [emblaApi, autoplay, autoplayDelay]);


  // converte valor do prop para classe Tailwind aspect-[]
  const getRatioClass = (ratio: "2/3" | "16/9") =>
    ratio === "16/9" ? "aspect-[16/9]" : "aspect-[2/3]";

  // não abrimos links ao clicar aqui, pois você disse que cartaz não deve ir pro youtube
  // se quiser abrir trailer em nova aba apenas para itens "video", pode colocar lógica condicional
  const handleItemClick = (item: CarouselItem) => {
    // se quiser abrir só quando for vídeo:
    // if (item.link && item.link.includes("youtube")) window.open(item.link, "_blank");
    // por ora, não abre nada (conforme pedido)
  };
  const [selectedMovie, setSelectedMovie] = useState<CarouselItem | null>(null);
const [dialogOpen, setDialogOpen] = useState(false);

const handlePosterClick = (item: CarouselItem) => {
  setSelectedMovie(item);
  setDialogOpen(true);
};


  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((item) => {
            const isYouTube = !!item.link && item.link.includes("youtube");
            const ratioClass = getRatioClass(aspectRatio);

            return (
              <motion.div
                key={item.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
               <Card
  className="overflow-hidden bg-card/50 backdrop-blur-sm h-full cursor-pointer"
  data-testid={`carousel-item-${item.id}`}
  onMouseEnter={() => setHoveredItem(item.id)}
  onMouseLeave={() => setHoveredItem(null)}
  onTouchStart={() => setTimeout(() => setHoveredItem(item.id), 300)}
  onTouchEnd={() => setHoveredItem(null)}
  onClick={() => {
    // ✅ Se for vídeo do YouTube e o clique for permitido
    if (isYouTube && item.link) {
      window.open(item.link, "_blank");
    }
  }}
>

                 {/* proporção controlada já definida em ratioClass */}
<div className={`relative w-full ${ratioClass}`}>
  {isYouTube && hoveredItem === item.id ? (
    <iframe
      src={`https://www.youtube.com/embed/${(item.link || "").split("v=")[1]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${(item.link || "").split("v=")[1]}`}
      title={item.title}
      allow="autoplay; encrypted-media"
      className="w-full h-full object-cover"
    />
  ) : (
   <img
  src={item.image}
  alt={item.title}
  onClick={() => handlePosterClick(item)}
  loading="lazy"
  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
/>

  )}

  {item.overlay && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      {item.overlay}
    </div>
  )}
  <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Deseja comprar ingressos para{" "}
        <span className="text-primary font-semibold">{selectedMovie?.title}</span>?
      </AlertDialogTitle>
      <AlertDialogDescription>
        Você será redirecionado para o site para a compra.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction
        onClick={() => {
          window.open("https://csingresso.com.br/home/cidade/3516408", "_blank");
        }}
      >
        Comprar ingresso
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

</div>


                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-card-foreground line-clamp-2">
                      {item.title}
                    </h3>
                    {/* Se quiser mostrar classificação sob o título, descomente e ajuste:
                    <div className="text-sm text-muted-foreground mt-1">{item.rating}</div>
                    */}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* botões de navegação */}
      <AnimatePresence>
        {canScrollPrev && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button
              size="icon"
              variant="ghost"
              className="bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canScrollNext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button
              size="icon"
              variant="ghost"
              className="bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full"
              onClick={scrollNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full transition-all ${index === selectedIndex ? "w-8 bg-primary" : "w-1 bg-foreground/30"}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
