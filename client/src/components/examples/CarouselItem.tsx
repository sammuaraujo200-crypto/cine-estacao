import { useState } from "react";

export default function CarouselItem({ item }: { item: any }) {
  const isYouTube = item.link?.includes("youtube.com");
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Detecta toque longo (mobile)
  let touchTimer: any;
  const handleTouchStart = () => {
    touchTimer = setTimeout(() => setIsPreviewing(true), 300);
  };
  const handleTouchEnd = () => {
    clearTimeout(touchTimer);
    setIsPreviewing(false);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-black transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsPreviewing(true)}
      onMouseLeave={() => setIsPreviewing(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full aspect-[2/3] bg-gray-900">
        {isYouTube && isPreviewing ? (
          <iframe
            src={`https://www.youtube.com/embed/${
              item.link?.split("v=")[1]
            }?autoplay=1&mute=1&loop=1&controls=0&playlist=${
              item.link?.split("v=")[1]
            }`}
            title={item.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Título (opcional) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm font-semibold p-2">
        {item.title}
      </div>
    </div>
  );
}
