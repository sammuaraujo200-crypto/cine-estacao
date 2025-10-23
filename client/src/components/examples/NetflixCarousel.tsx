import NetflixCarousel from "../NetflixCarousel";
import { Play } from "lucide-react";

export default function NetflixCarouselExample() {
  const items = [
    {
      id: "1",
      image: "/api/placeholder/640/360",
      title: "Example Movie 1",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      overlay: (
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <Play className="w-8 h-8 text-primary-foreground ml-1" />
        </div>
      ),
    },
    {
      id: "2",
      image: "/api/placeholder/640/360",
      title: "Example Movie 2",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      overlay: (
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <Play className="w-8 h-8 text-primary-foreground ml-1" />
        </div>
      ),
    },
    {
      id: "3",
      image: "/api/placeholder/640/360",
      title: "Example Movie 3",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      overlay: (
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <Play className="w-8 h-8 text-primary-foreground ml-1" />
        </div>
      ),
    },
  ];

  return <NetflixCarousel items={items} autoplay={true} autoplayDelay={3000} />;
}
