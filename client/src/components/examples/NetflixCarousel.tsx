"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";

// Tipagem para organizar melhor
interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}

export default function NetflixCarouselExample() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        // 🔹 Substitua "SUA_API_KEY" pela sua chave da OMDb API
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=SUA_API_KEY&s=batman`
        );
        const data = await res.json();
        if (data.Search) setMovies(data.Search);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    fetchMovies();
  }, []);

  // 🔹 Vídeos de prévia (trailers do YouTube)
  const trailers = [
    { id: "1", src: "https://www.youtube.com/embed/YoHD9XEInc0" }, // Inception
    { id: "2", src: "https://www.youtube.com/embed/EXeTwQWrcwY" }, // The Dark Knight
    { id: "3", src: "https://www.youtube.com/embed/8ugaeA-nMTc" }, // Interstellar
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* 🎬 Carrossel de cartazes verticais */}
      <section>
        <h2 className="text-white text-2xl font-bold mb-4 ml-2">
          Em Cartaz
        </h2>
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex-shrink-0 w-[200px] h-[300px] relative rounded-lg overflow-hidden"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "/fallback.jpg"
                  }
                  alt={movie.Title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          ) : (
            <p className="text-white/60">Carregando filmes...</p>
          )}
        </div>
      </section>

      {/* 🎥 Carrossel de trailers horizontais */}
      <section>
        <h2 className="text-white text-2xl font-bold mb-4 ml-2">
          Trailers em Destaque
        </h2>
        <div className="flex overflow-x-auto gap-6 px-4 pb-4 scrollbar-hide">
          {trailers.map((video) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[640px] h-[360px] rounded-xl overflow-hidden shadow-lg relative"
            >
              <iframe
                src={`${video.src}?autoplay=1&mute=1&loop=1&controls=0&playlist=${video.src
                  .split("/")
                  .pop()}`}
                title={`Trailer ${video.id}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
