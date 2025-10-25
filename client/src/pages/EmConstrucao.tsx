import Header from "@/components/Header";

export default function EmConstrucao() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header theme="cinema" />
      <main className="flex-1 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Ops... parece que ainda não desenvolvemos essa parte 😅
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Por hora, que tal dar uma olhadinha no meu perfil?
        </p>
        <a
          href="https://www.instagram.com/sz_samz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 font-medium underline hover:text-orange-300 transition-colors"
        >
          @sz_samz
        </a>
      </main>
    </div>
  );
}
