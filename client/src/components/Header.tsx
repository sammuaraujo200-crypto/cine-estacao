import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  theme?: "default" | "halloween" | "christmas" | "valentines" | "easter" | "children" | "independence" | "cinema";
}

export default function Header({ theme = "default" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ["Home", "Promoções", "Fidelidade", "Dúvidas", "Mais"];

  const getPrimaryColor = () => {
    switch (theme) {
      case "halloween":
        return "#ff7518";
      case "christmas":
        return "#e60023";
      case "valentines":
        return "#ff3366";
      case "easter":
        return "#9b59b6";
      case "children":
        return "#3498db";
      case "independence":
        return "#27ae60";
      case "cinema":
        return "#f39c12";
      default:
        return "#ff6600";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-b border-border/40"
        style={{
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              {navItems.slice(0, 2).map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  data-testid={`link-nav-${item.toLowerCase()}`}
                  className="text-foreground/90 hover:text-primary transition-all text-sm font-medium relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src="/@assets/cine estação_1761218675649.png"
                alt="Cine Estação"
                className="h-14 w-auto"
                data-testid="img-logo"
              />
            </div>

            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              {navItems.slice(2).map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  data-testid={`link-nav-${item.toLowerCase()}`}
                  className="text-foreground/90 hover:text-primary transition-all text-sm font-medium relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

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
                <a
                  key={item}
                  href="#"
                  data-testid={`link-mobile-${item.toLowerCase()}`}
                  className="block text-foreground/90 hover:text-primary active:scale-95 transition-all font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
