import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

const Skills = () => {
  const { portfolioData, loading } = usePortfolio();

  if (loading || !portfolioData) {
    return null;
  }

  const skillCategories = portfolioData.skills;

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="rounded-lg p-6"
              style={{
                backgroundColor: "#18181B",
                border: "1px solid #27272A",
              }}
            >
              <h3
                className="text-xl font-semibold mb-6 text-center"
                style={{ color: "#E5E7EB" }}
              >
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span style={{ color: "#E5E7EB" }}>{skill.name}</span>
                      <span style={{ color: "#A1A1AA" }}>{skill.level}%</span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: "#27272A" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#34D399] to-[#2FBB8A]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
