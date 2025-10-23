export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src="/@assets/cine estação_1761226674905.png"
            alt="Cine Estação"
            className="h-12 w-auto"
            data-testid="img-footer-logo"
          />
          <p className="text-center text-foreground/90 text-sm md:text-base" data-testid="text-footer-tagline">
            Cine Estação | A felicidade só é verdadeira quando compartilhada.
          </p>
        </div>
      </div>
    </footer>
  );
}
