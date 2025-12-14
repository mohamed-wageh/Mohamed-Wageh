import { motion } from "framer-motion";
import { Code, Target, Lightbulb } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const About = () => {
  const { portfolioData, loading } = usePortfolio();

  if (loading || !portfolioData) {
    return null;
  }

  const { about } = portfolioData;
  const iconMap = { Code, Target, Lightbulb };
  
  const features = about.features.map((feature, index) => ({
    ...feature,
    icon: [Code, Target, Lightbulb][index] || Code
  }));

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#18181B" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] bg-clip-text text-transparent">
            {about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] mx-auto mb-8"></div>
          <p className="text-[#E5E7EB] text-lg max-w-3xl mx-auto">
            {about.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-lg transition-colors cursor-pointer group"
                style={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #27272A",
                }}
              >
                <div className="bg-gradient-to-br from-[#34D399] to-[#2FBB8A] w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={32} />
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#E5E7EB" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#A1A1AA]">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
