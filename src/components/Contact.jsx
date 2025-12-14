import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const Contact = () => {
  const { portfolioData, loading } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (loading || !portfolioData) {
    return null;
  }

  const { contact } = portfolioData;
  const contactInfo = [
    {
      icon: Mail,
      text: contact.email,
      href: `mailto:${contact.email}`,
    },
    { icon: Phone, text: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, text: contact.location },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] bg-clip-text text-transparent">
            {contact.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#34D399] to-[#2FBB8A] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: "#E5E7EB" }}
            >
              Let&apos;s Connect
            </h3>
            <p style={{ color: "#A1A1AA" }} className="mb-8">
              {contact.description}
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.text || index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 text-gray-300"
                  >
                    <div className="bg-gradient-to-br from-[#34D399] to-[#2FBB8A] p-3 rounded-lg">
                      <Icon className="text-white" size={24} />
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="transition-colors"
                        onMouseEnter={(e) => {
                          e.target.style.color = "#34D399";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#A1A1AA";
                        }}
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span>{info.text}</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="p-8 rounded-lg"
            style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2"
                style={{ color: "#E5E7EB" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #27272A",
                  color: "#E5E7EB",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#34D399")}
                onBlur={(e) => (e.target.style.borderColor = "#27272A")}
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2"
                style={{ color: "#E5E7EB" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #27272A",
                  color: "#E5E7EB",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#34D399")}
                onBlur={(e) => (e.target.style.borderColor = "#27272A")}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2"
                style={{ color: "#E5E7EB" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg transition-colors resize-none"
                style={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #27272A",
                  color: "#E5E7EB",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#34D399")}
                onBlur={(e) => (e.target.style.borderColor = "#27272A")}
                placeholder="Your Message"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-[#0A0A0A]"
              style={{
                background: "linear-gradient(to right, #34D399, #2FBB8A)",
              }}
              whileHover={{
                boxShadow: "0 10px 20px rgba(52, 211, 153, 0.3)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
