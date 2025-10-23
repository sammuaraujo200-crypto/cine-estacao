import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const OMDB_API_KEY = process.env.OMDB_API_KEY;

  app.get("/api/movie/:title", async (req, res) => {
    try {
      const { title } = req.params;
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
      );
      const data = await response.json();
      
      if (data.Response === "False") {
        return res.status(404).json({ error: data.Error });
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movie data" });
    }
  });

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
          
          if (data.Response === "False") {
            return {
              ...movie,
              Title: movie.title,
              Poster: "N/A",
              imdbID: null,
            };
          }
          
          return {
            ...data,
            rating: movie.rating,
            trailerUrl: movie.trailerUrl,
          };
        } catch {
          return {
            ...movie,
            Title: movie.title,
            Poster: "N/A",
            imdbID: null,
          };
        }
      });

      const movies = await Promise.all(moviePromises);
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
