import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const Hero = () => {
  const { portfolioData, loading } = usePortfolio();

  if (loading || !portfolioData) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </section>
    );
  }

  const { hero } = portfolioData;
  const socialLinks = [
    { icon: Github, href: hero.socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: hero.socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, href: hero.socialLinks.email, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#18181B] to-[#0A0A0A]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-[#E5E7EB]"
          >
            Hi, I'm{" "}
            <span className="inline-block animate-float bg-gradient-to-r from-[#34D399] via-[#2FBB8A] to-[#34D399] bg-clip-text text-transparent">
              {hero.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[#E5E7EB] mb-4"
          >
            {hero.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-[#A1A1AA] max-w-2xl mx-auto mb-8"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  const offset = 80; // Account for fixed navbar
                  const elementPosition =
                    contactSection.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] text-[#0A0A0A] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#34D399]/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Get In Touch
            </button>
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-[#34D399] text-[#34D399] rounded-lg font-semibold hover:bg-[#34D399] hover:text-[#0A0A0A] transition-all duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map(({ icon: Icon, href, label }, index) => {
              const isExternal = href.startsWith("http");
              return (
                <motion.a
                  key={label}
                  href={href}
                  className="text-[#A1A1AA] hover:text-[#34D399] transition-colors"
                  whileHover={{ scale: 1.2, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  aria-label={label}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <Icon size={28} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
