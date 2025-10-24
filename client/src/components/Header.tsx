import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface HeaderProps {
  theme?:
    | "default"
    | "halloween"
    | "christmas"
    | "valentines"
    | "easter"
    | "children"
    | "independence"
    | "cinema";
}

export default function Header({ theme = "default" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Sobre nós", path: "/sobre" },
    { name: "Promoções", path: "/promocoes" },
    { name: "Fidelidade", path: "/fidelidade" },
    { name: "Dúvidas", path: "/duvidas" },
    { name: "Mais", path: "/mais" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-b border-border/40"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">

           {/* MENU CENTRALIZADO */}
<div className="flex items-center justify-center w-full">
  {/* Botões da esquerda */}
  <div className="hidden md:flex items-center justify-end gap-10 flex-1">
    {navItems.slice(0, Math.ceil(navItems.length / 2)).map((item) => (
      <motion.div
        key={item.name}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={item.path}
          onClick={() => setMobileMenuOpen(false)}
          className="text-foreground/90 hover:text-primary transition-all text-sm font-medium relative group"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
        </Link>
      </motion.div>
    ))}
  </div>

{/* LOGO CENTRAL */}
<div className="flex justify-center items-center mx-10">
  <img
    src="/images/cine-estação_1761215287537.png"
    alt="Cine Estação"
    className="h-14 w-auto"
  />
</div>



  {/* Botões da direita */}
  <div className="hidden md:flex items-center justify-start gap-10 flex-1">
    {navItems.slice(Math.ceil(navItems.length / 2)).map((item) => (
      <motion.div
        key={item.name}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={item.path}
          onClick={() => setMobileMenuOpen(false)}
          className="text-foreground/90 hover:text-primary transition-all text-sm font-medium relative group"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
        </Link>
      </motion.div>
    ))}
  </div>
</div>


            {/* Mobile menu toggle */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1a1a1a] border-b border-border/40 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-foreground/90 hover:text-primary active:scale-95 transition-all font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
