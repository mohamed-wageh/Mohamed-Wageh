import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const Footer = () => {
  const { portfolioData } = usePortfolio();

  if (!portfolioData) {
    return null;
  }

  const { hero, footer } = portfolioData;
  const socialLinks = [
    {
      icon: Github,
      href: hero.socialLinks.github,
      label: "GitHub",
      external: true,
    },
    {
      icon: Linkedin,
      href: hero.socialLinks.linkedin,
      label: "LinkedIn",
      external: true,
    },
    { icon: Mail, href: hero.socialLinks.email, label: "Email", external: false },
  ];

  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{ backgroundColor: "#0A0A0A", borderColor: "#27272A" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: "#A1A1AA" }}
            className="text-center md:text-left"
          >
            <p>{footer.copyright}</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {socialLinks.map(({ icon: Icon, href, label, external }, index) => (
              <motion.a
                key={label}
                href={href}
                className="transition-colors"
                style={{ color: "#A1A1AA" }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#34D399";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#A1A1AA";
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-colors"
            style={{ color: "#A1A1AA" }}
            onMouseEnter={(e) => {
              e.target.style.color = "#34D399";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#A1A1AA";
            }}
            whileHover={{ y: -5 }}
          >
            <span className="text-sm">Back to Top ↑</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
