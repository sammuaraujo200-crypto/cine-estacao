import { motion } from "framer-motion";
import { Facebook, Youtube, Instagram, ShoppingBag } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function SocialSection() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/cineestacaooficial",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/c/CineEstação",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/cine.estacao/",
    },
    {
      name: "Itens Colecionáveis",
      icon: ShoppingBag,
      href: "https://biolivre.com.br/lojasmiriam",
    },
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      href: "#",
      isReactIcon: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-card">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-12">
            Explore mais do Cine Estação
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                  data-testid={`link-social-${social.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-sm md:text-base font-medium text-card-foreground text-center max-w-[100px]">
                      {social.name}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
