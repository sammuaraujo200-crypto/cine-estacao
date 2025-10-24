import express from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.get("/api/movies/batch", async (_req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.goto("https://csingresso.com.br/home/cidade/3516408", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Espera os pôsteres aparecerem
    await page.waitForSelector(".swiper-slide img", { timeout: 15000 });

    // Faz scroll para carregar imagens lazy
    const scrollStep = 300;
    const scrollDelay = 500;
    for (let pos = 0; pos < 2000; pos += scrollStep) {
      await page.evaluate((y) => window.scrollTo(0, y), pos);
    await new Promise(resolve => setTimeout(resolve, scrollDelay));

    }

   await new Promise(resolve => setTimeout(resolve, 1000));


    // Extrai os dados dos filmes
    const movies = await page.evaluate(() => {
      const results: { title: string; image: string; rating?: string }[] = [];
      const slides = document.querySelectorAll(".swiper-slide");

      slides.forEach((slide) => {
        const img = slide.querySelector("img");
        if (!img) return;

        let image =
          img.getAttribute("src") || img.getAttribute("data-src") || "";
        let title =
          img.getAttribute("alt") ||
          slide.querySelector(".titulo")?.textContent?.trim() ||
          "Sem título";

        // Corrige URLs relativas
        if (image && image.startsWith("/")) {
          image = `https://csingresso.com.br${image}`;
        } else if (image && !image.startsWith("http")) {
          image = `https://csingresso.com.br/${image}`;
        }

        // Filtra imagens inválidas
        if (image && !image.includes("icon-filme-footer")) {
          results.push({ title, image });
        }
      });

      return results;
    });

    await browser.close();

    if (!movies.length) {
      return res.status(404).json({
        error: "Nenhum filme encontrado — o site pode ter mudado o layout.",
      });
    }

    res.json(movies);
  } catch (err) {
    console.error("❌ Erro ao capturar filmes:", err);
    res.status(500).json({ error: "Falha ao obter filmes automaticamente." });
  } finally {
    await browser.close().catch(() => {});
  }
});

export default router;
