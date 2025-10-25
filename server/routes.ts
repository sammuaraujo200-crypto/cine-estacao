import { Express } from "express";

const OMDB_API_KEY = process.env.OMDB_API_KEY || "demo"; // substitua pela sua chave real

export function registerRoutes(app: Express) {
  app.post("/api/movies/batch", async (req, res) => {
    try {
      const { movies: movieList } = req.body;

      if (!Array.isArray(movieList)) {
        return res.status(400).json({ error: "movies must be an array" });
      }

      const moviePromises = movieList.map(async (movie: { title: string; rating: string; trailerUrl: string }) => {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${OMDB_API_KEY}`
          );
          const data = await response.json();

          if (data.Response === "False" || !data.Poster || data.Poster === "N/A") {
            return {
              ...movie,
              Title: movie.title,
              Poster: null,
              imdbID: null,
            };
          }

          return {
            ...movie,
            Title: data.Title,
            Poster: data.Poster,
            imdbID: data.imdbID,
          };
        } catch (err) {
          console.error(`Erro ao buscar ${movie.title}:`, err);
          return {
            ...movie,
            Title: movie.title,
            Poster: null,
            imdbID: null,
          };
        }
      });

      const movies = await Promise.all(moviePromises);
      res.json(movies);
    } catch (error) {
      console.error("Erro geral no batch:", error);
      res.status(500).json({ error: "Failed to fetch movies data" });
    }
  });
}
