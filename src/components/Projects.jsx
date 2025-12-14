import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const { portfolioData, loading } = usePortfolio();

  // All hooks must be called before any conditional returns
  const projects = portfolioData?.projects || [];

  const categories = useMemo(() => {
    const cats = ["All"];
    for (const project of projects) {
      if (!cats.includes(project.category)) {
        cats.push(project.category);
      }
    }
    return cats;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  if (loading || !portfolioData) {
    return null;
  }

  return (
    <section
      id="projects"
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
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] mx-auto mb-8"></div>
          <p
            style={{ color: "#E5E7EB" }}
            className="text-lg max-w-3xl mx-auto mb-8"
          >
            Here are some of my recent projects that showcase my skills and
            experience.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === cat
                    ? "bg-gradient-to-r from-[#34D399] to-[#2FBB8A] text-[#0A0A0A]"
                    : "bg-[#0A0A0A] text-[#A1A1AA] hover:bg-[#27272A] border border-[#27272A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg overflow-hidden transition-colors group cursor-pointer border"
                style={{ backgroundColor: "#0A0A0A", borderColor: "#27272A" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#E5E7EB" }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ color: "#A1A1AA" }} className="text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{ backgroundColor: "#18181B", color: "#A1A1AA" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors"
                      style={{ color: "#A1A1AA" }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#34D399";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#A1A1AA";
                      }}
                    >
                      <Github size={20} />
                      <span className="text-sm">Code</span>
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-colors"
                        style={{ color: "#A1A1AA" }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#34D399";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#A1A1AA";
                        }}
                      >
                        <ExternalLink size={20} />
                        <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
