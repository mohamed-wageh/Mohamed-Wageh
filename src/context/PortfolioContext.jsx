import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default portfolio data structure
  const defaultData = {
    hero: {
      name: "Mohamed Wageh",
      title: "Software Engineer | Full Stack Mobile Developer",
      description: "Passionate about building scalable mobile applications | Enterprise solutions | Specializing in React Native & Mobile Development",
      resumeUrl: "https://drive.google.com/file/d/1xVq561f1CzcPB9bHWTyoPKAjh2tVscA6/view?usp=share_link",
      socialLinks: {
        github: "https://github.com/mohamed-wageh",
        linkedin: "https://www.linkedin.com/in/mohamed-wageh-ibrahim-ba1920210/",
        email: "#contact"
      }
    },
    about: {
      title: "About Me",
      description: "I'm Mohamed Wageh, a Software Engineer and Full Stack Mobile Developer specializing in React Native. With a passion for building scalable mobile applications and enterprise solutions, I bring expertise in mobile development, Firebase, and modern JavaScript technologies.",
      features: [
        {
          title: "Clean Code",
          description: "Writing maintainable, well-documented code that stands the test of time."
        },
        {
          title: "Problem Solver",
          description: "Turning complex problems into elegant, scalable solutions."
        },
        {
          title: "Continuous Learning",
          description: "Always exploring new technologies and best practices in the industry."
        }
      ]
    },
    skills: [
      {
        category: "Mobile Development",
        skills: [
          { name: "React Native", level: 95 },
          { name: "Expo", level: 90 },
          { name: "JavaScript", level: 98 },
          { name: "TypeScript", level: 85 },
          { name: "Mobile UI/UX", level: 92 },
          { name: "Redux", level: 88 }
        ]
      },
      {
        category: "Backend & Database",
        skills: [
          { name: "Node.js", level: 90 },
          { name: "Firebase", level: 95 },
          { name: "MongoDB", level: 88 },
          { name: "REST APIs", level: 93 },
          { name: "Express.js", level: 85 },
          { name: "Cloud Services", level: 87 }
        ]
      },
      {
        category: "Tools & Others",
        skills: [
          { name: "Git", level: 95 },
          { name: "GitHub", level: 93 },
          { name: "VS Code", level: 98 },
          { name: "HTML5/CSS3", level: 95 },
          { name: "Agile/CI/CD", level: 88 },
          { name: "API Integration", level: 92 }
        ]
      }
    ],
    projects: [
      {
        id: "1",
        title: "Restaurant Chain Management App",
        description: "Enterprise mobile application for restaurant chain management with real-time order tracking and inventory management.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        tags: ["React Native", "Firebase", "Node.js", "MongoDB"],
        github: "https://github.com/mohamed-wageh",
        demo: "#",
        category: "Mobile Apps"
      },
      {
        id: "2",
        title: "E-Commerce Mobile App",
        description: "Full-featured e-commerce mobile application with user authentication, payment integration, and product management.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        tags: ["React Native", "Redux", "Stripe", "Firebase"],
        github: "https://github.com/mohamed-wageh/The-project",
        demo: "#",
        category: "Mobile Apps"
      },
      {
        id: "3",
        title: "Social Media App",
        description: "Modern social media mobile app with real-time chat, media sharing, and push notifications.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
        tags: ["React Native", "Firebase", "WebSocket", "Cloud Storage"],
        github: "https://github.com/mohamed-wageh",
        demo: "#",
        category: "Mobile Apps"
      },
      {
        id: "4",
        title: "Task Management Platform",
        description: "Collaborative task management application with team features, offline support, and real-time sync.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
        tags: ["React Native", "Expo", "Firebase", "Redux"],
        github: "https://github.com/mohamed-wageh",
        demo: "#",
        category: "Mobile Apps"
      },
      {
        id: "5",
        title: "Analytics Dashboard",
        description: "Business analytics dashboard with data visualization, reporting, and real-time metrics for mobile and web.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        tags: ["React", "React Native", "Chart.js", "Node.js"],
        github: "https://github.com/mohamed-wageh",
        demo: "#",
        category: "Full Stack"
      },
      {
        id: "6",
        title: "Food Delivery App",
        description: "Complete food delivery solution with live tracking, order management, and multiple payment options.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        tags: ["React Native", "Firebase", "MongoDB", "REST APIs"],
        github: "https://github.com/mohamed-wageh",
        demo: "#",
        category: "Full Stack"
      }
    ],
    contact: {
      title: "Get In Touch",
      description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      email: "mido41239937@gmail.com",
      phone: "+201124495919",
      location: "Giza, Egypt"
    },
    navbar: {
      logo: "Mohamed Wageh"
    },
    footer: {
      copyright: "© 2025 Mohamed Wageh. All rights reserved."
    }
  };

  // Load portfolio data from Firestore
  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "portfolio", "data");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPortfolioData(docSnap.data());
      } else {
        // Initialize with default data if document doesn't exist
        await setDoc(docRef, defaultData);
        setPortfolioData(defaultData);
      }
      setError(null);
    } catch (err) {
      console.error("Error loading portfolio data:", err);
      setError(err.message);
      // Fallback to default data on error
      setPortfolioData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  // Update portfolio data in Firestore
  const updatePortfolioData = async (updates) => {
    try {
      const docRef = doc(db, "portfolio", "data");
      await updateDoc(docRef, updates);
      
      // Update local state
      setPortfolioData((prev) => ({
        ...prev,
        ...updates
      }));
      
      return { success: true };
    } catch (err) {
      console.error("Error updating portfolio data:", err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const value = {
    portfolioData,
    loading,
    error,
    updatePortfolioData,
    reloadData: loadPortfolioData
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};



