import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase/config";
import { usePortfolio } from "../context/PortfolioContext";
import { Save, LogOut, Upload, Plus, Trash2, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  
  const { portfolioData, updatePortfolioData, reloadData } = usePortfolio();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setFormData({});
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (portfolioData) {
      setFormData(JSON.parse(JSON.stringify(portfolioData)));
    }
  }, [portfolioData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage({ type: "success", text: "Login successful!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleInputChange = (path, value) => {
    const keys = path.split(".");
    const newData = { ...formData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setFormData(newData);
  };

  const handleArrayChange = (path, index, field, value) => {
    const keys = path.split(".");
    const newData = { ...formData };
    let current = newData;
    
    for (const key of keys) {
      if (!current[key]) current[key] = [];
      current = current[key];
    }
    
    if (!current[index]) current[index] = {};
    current[index][field] = value;
    setFormData(newData);
  };

  const handleImageUpload = async (path, file) => {
    if (!file) return;
    
    setSaving(true);
    try {
      const storageRef = ref(storage, `portfolio/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      handleInputChange(path, url);
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    
    try {
      const result = await updatePortfolioData(formData);
      if (result.success) {
        setMessage({ type: "success", text: "Portfolio updated successfully!" });
        await reloadData();
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      tags: [],
      github: "#",
      demo: "#",
      category: "Mobile Apps"
    };
    setFormData({
      ...formData,
      projects: [...(formData.projects || []), newProject]
    });
  };

  const deleteProject = (id) => {
    setFormData({
      ...formData,
      projects: (formData.projects || []).filter(p => p.id !== id)
    });
  };

  const addSkill = (categoryIndex) => {
    const newSkill = { name: "New Skill", level: 50 };
    const newData = { ...formData };
    if (!newData.skills[categoryIndex].skills) {
      newData.skills[categoryIndex].skills = [];
    }
    newData.skills[categoryIndex].skills.push(newSkill);
    setFormData(newData);
  };

  const deleteSkill = (categoryIndex, skillIndex) => {
    const newData = { ...formData };
    newData.skills[categoryIndex].skills.splice(skillIndex, 1);
    setFormData(newData);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0A" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-lg"
          style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#34D399] to-[#2FBB8A] bg-clip-text text-transparent">
            Dashboard Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2" style={{ color: "#E5E7EB" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #27272A",
                  color: "#E5E7EB"
                }}
              />
            </div>
            <div>
              <label className="block mb-2" style={{ color: "#E5E7EB" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #27272A",
                  color: "#E5E7EB"
                }}
              />
            </div>
            {message.text && (
              <div
                className={`p-3 rounded-lg ${
                  message.type === "error" ? "bg-red-900/20 text-red-400" : "bg-green-900/20 text-green-400"
                }`}
              >
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-[#0A0A0A] disabled:opacity-50"
              style={{
                background: loading
                  ? "#27272A"
                  : "linear-gradient(to right, #34D399, #2FBB8A)"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
    { id: "navbar", label: "Navbar" },
    { id: "footer", label: "Footer" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 p-4 border-b" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#34D399] to-[#2FBB8A] bg-clip-text text-transparent">
            Portfolio Dashboard
          </h1>
          <div className="flex gap-4 items-center">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: "#27272A", color: "#E5E7EB" }}
            >
              View Portfolio
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg font-semibold text-[#0A0A0A] flex items-center gap-2 disabled:opacity-50"
              style={{
                background: saving
                  ? "#27272A"
                  : "linear-gradient(to right, #34D399, #2FBB8A)"
              }}
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: "#27272A", color: "#E5E7EB" }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
        {message.text && (
          <div className={`mt-2 p-2 rounded-lg text-sm ${
            message.type === "error" ? "bg-red-900/20 text-red-400" : "bg-green-900/20 text-green-400"
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#34D399] to-[#2FBB8A] text-[#0A0A0A]"
                  : "bg-[#18181B] text-[#A1A1AA] border border-[#27272A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}>
          {activeTab === "hero" && formData.hero && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#E5E7EB" }}>Hero Section</h3>
              <InputField label="Name" value={formData.hero.name} onChange={(v) => handleInputChange("hero.name", v)} />
              <InputField label="Title" value={formData.hero.title} onChange={(v) => handleInputChange("hero.title", v)} />
              <TextAreaField label="Description" value={formData.hero.description} onChange={(v) => handleInputChange("hero.description", v)} />
              <InputField label="Resume URL" value={formData.hero.resumeUrl} onChange={(v) => handleInputChange("hero.resumeUrl", v)} />
              <InputField label="GitHub URL" value={formData.hero.socialLinks?.github} onChange={(v) => handleInputChange("hero.socialLinks.github", v)} />
              <InputField label="LinkedIn URL" value={formData.hero.socialLinks?.linkedin} onChange={(v) => handleInputChange("hero.socialLinks.linkedin", v)} />
            </div>
          )}

          {activeTab === "about" && formData.about && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#E5E7EB" }}>About Section</h3>
              <InputField label="Title" value={formData.about.title} onChange={(v) => handleInputChange("about.title", v)} />
              <TextAreaField label="Description" value={formData.about.description} onChange={(v) => handleInputChange("about.description", v)} />
              <div className="space-y-4">
                <h4 className="text-lg font-semibold" style={{ color: "#E5E7EB" }}>Features</h4>
                {formData.about.features?.map((feature, index) => (
                  <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: "#0A0A0A", border: "1px solid #27272A" }}>
                    <InputField label="Title" value={feature.title} onChange={(v) => handleArrayChange("about.features", index, "title", v)} />
                    <TextAreaField label="Description" value={feature.description} onChange={(v) => handleArrayChange("about.features", index, "description", v)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "skills" && formData.skills && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#E5E7EB" }}>Skills Section</h3>
              {formData.skills.map((category, catIndex) => (
                <div key={catIndex} className="p-4 rounded-lg" style={{ backgroundColor: "#0A0A0A", border: "1px solid #27272A" }}>
                  <InputField label="Category" value={category.category} onChange={(v) => handleArrayChange("skills", catIndex, "category", v)} />
                  <div className="mt-4 space-y-3">
                    {category.skills?.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex gap-2 items-end">
                        <div className="flex-1">
                          <InputField label="Skill Name" value={skill.name} onChange={(v) => {
                            const newData = { ...formData };
                            newData.skills[catIndex].skills[skillIndex].name = v;
                            setFormData(newData);
                          }} />
                        </div>
                        <div className="w-24">
                          <InputField label="Level" type="number" value={skill.level} onChange={(v) => {
                            const newData = { ...formData };
                            newData.skills[catIndex].skills[skillIndex].level = parseInt(v) || 0;
                            setFormData(newData);
                          }} />
                        </div>
                        <button
                          onClick={() => deleteSkill(catIndex, skillIndex)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-900/20"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addSkill(catIndex)}
                      className="px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                      style={{ backgroundColor: "#27272A", color: "#E5E7EB" }}
                    >
                      <Plus size={16} />
                      Add Skill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && formData.projects && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold" style={{ color: "#E5E7EB" }}>Projects Section</h3>
                <button
                  onClick={addProject}
                  className="px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  style={{ backgroundColor: "#27272A", color: "#E5E7EB" }}
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>
              {formData.projects.map((project, index) => (
                <div key={project.id} className="p-4 rounded-lg" style={{ backgroundColor: "#0A0A0A", border: "1px solid #27272A" }}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold" style={{ color: "#E5E7EB" }}>Project {index + 1}</h4>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <InputField label="Title" value={project.title} onChange={(v) => handleArrayChange("projects", index, "title", v)} />
                  <TextAreaField label="Description" value={project.description} onChange={(v) => handleArrayChange("projects", index, "description", v)} />
                  <ImageUploadField label="Image URL" value={project.image} onChange={(v) => handleArrayChange("projects", index, "image", v)} onUpload={(file) => handleImageUpload(`projects.${index}.image`, file)} />
                  <InputField label="Category" value={project.category} onChange={(v) => handleArrayChange("projects", index, "category", v)} />
                  <InputField label="GitHub URL" value={project.github} onChange={(v) => handleArrayChange("projects", index, "github", v)} />
                  <InputField label="Demo URL" value={project.demo} onChange={(v) => handleArrayChange("projects", index, "demo", v)} />
                  <div className="mt-2">
                    <label className="block mb-2" style={{ color: "#E5E7EB" }}>Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={project.tags?.join(", ") || ""}
                      onChange={(e) => handleArrayChange("projects", index, "tags", e.target.value.split(",").map(t => t.trim()))}
                      className="w-full px-4 py-3 rounded-lg"
                      style={{ backgroundColor: "#18181B", border: "1px solid #27272A", color: "#E5E7EB" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contact" && formData.contact && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#E5E7EB" }}>Contact Section</h3>
              <InputField label="Title" value={formData.contact.title} onChange={(v) => handleInputChange("contact.title", v)} />
              <TextAreaField label="Description" value={formData.contact.description} onChange={(v) => handleInputChange("contact.description", v)} />
              <InputField label="Email" value={formData.contact.email} onChange={(v) => handleInputChange("contact.email", v)} />
              <InputField label="Phone" value={formData.contact.phone} onChange={(v) => handleInputChange("contact.phone", v)} />
              <InputField label="Location" value={formData.contact.location} onChange={(v) => handleInputChange("contact.location", v)} />
            </div>
          )}

          {activeTab === "navbar" && formData.navbar && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#E5E7EB" }}>Navbar</h3>
              <InputField label="Logo Text" value={formData.navbar.logo} onChange={(v) => handleInputChange("navbar.logo", v)} />
            </div>
          )}

          {activeTab === "footer" && formData.footer && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#E5E7EB" }}>Footer</h3>
              <InputField label="Copyright Text" value={formData.footer.copyright} onChange={(v) => handleInputChange("footer.copyright", v)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="mb-4">
    <label className="block mb-2" style={{ color: "#E5E7EB" }}>{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-lg"
      style={{ backgroundColor: "#0A0A0A", border: "1px solid #27272A", color: "#E5E7EB" }}
    />
  </div>
);

const TextAreaField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block mb-2" style={{ color: "#E5E7EB" }}>{label}</label>
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full px-4 py-3 rounded-lg resize-none"
      style={{ backgroundColor: "#0A0A0A", border: "1px solid #27272A", color: "#E5E7EB" }}
    />
  </div>
);

const ImageUploadField = ({ label, value, onChange, onUpload }) => (
  <div className="mb-4">
    <label className="block mb-2" style={{ color: "#E5E7EB" }}>{label}</label>
    <div className="flex gap-2">
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg"
        style={{ backgroundColor: "#0A0A0A", border: "1px solid #27272A", color: "#E5E7EB" }}
        placeholder="Image URL or upload file"
      />
      <label className="px-4 py-3 rounded-lg cursor-pointer flex items-center gap-2" style={{ backgroundColor: "#27272A", color: "#E5E7EB" }}>
        <Upload size={18} />
        Upload
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && onUpload) onUpload(file);
          }}
          className="hidden"
        />
      </label>
    </div>
    {value && (
      <img src={value} alt="Preview" className="mt-2 rounded-lg max-w-xs max-h-48 object-cover" />
    )}
  </div>
);

export default Dashboard;

