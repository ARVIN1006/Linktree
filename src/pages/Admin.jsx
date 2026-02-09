import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppHelper } from "../context/AppContext";
import Icon from "../components/Icon";
import * as LucideIcons from "lucide-react";
import { hashPassword } from "../utils/security";

const Admin = () => {
  const {
    data,
    updateProfile,
    addLink,
    updateLink,
    deleteLink,
    updateSocials,
    updateTheme,
    logout,
    credentials,
    updateCredentials,
    moveLinkUp,
    moveLinkDown,
  } = useAppHelper();
  const { profile, links, socials, theme } = data;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const themes = [
    {
      id: "default",
      name: "Classic Indigo",
      background: "from-indigo-100 via-purple-100 to-pink-100",
      buttonStyle: "bg-white/40 hover:bg-white/60 text-gray-800",
      cardStyle: "bg-white/30 border-white/40 shadow-xl",
      textColor: "text-gray-800",
      subTextColor: "text-gray-600",
    },1
    {
      id: "midnight",
      name: "Midnight Dark",
      background: "from-gray-900 via-slate-800 to-gray-900",
      buttonStyle:
        "bg-white/10 hover:bg-white/20 text-white border border-white/10",
      cardStyle: "bg-white/5 border-white/10 shadow-2xl skew-y-0",
      textColor: "text-white",
      subTextColor: "text-gray-400",
    },
    {
      id: "emerald",
      name: "Emerald Forest",
      background: "from-emerald-100 via-teal-100 to-green-100",
      buttonStyle: "bg-white/50 hover:bg-white/70 text-emerald-900 shadow-sm",
      cardStyle: "bg-white/40 border-emerald-200 shadow-lg",
      textColor: "text-emerald-900",
      subTextColor: "text-emerald-700",
    },
    {
      id: "sunset",
      name: "Sunset Rose",
      background: "from-orange-100 via-rose-100 to-amber-100",
      buttonStyle: "bg-white/50 hover:bg-white/70 text-rose-900 shadow-sm",
      cardStyle: "bg-white/40 border-rose-200 shadow-lg",
      textColor: "text-rose-900",
      subTextColor: "text-rose-700",
    },
    {
      id: "electric",
      name: "Electric Blue",
      background: "from-blue-600 via-indigo-700 to-purple-800",
      buttonStyle:
        "bg-white/20 hover:bg-white/30 text-white border border-white/20",
      cardStyle: "bg-white/10 border-white/20 shadow-2xl backdrop-blur-xl",
      textColor: "text-white",
      subTextColor: "text-blue-200",
    },
    {
      id: "monochrome",
      name: "Monochrome Minimal",
      background: "from-gray-100 to-gray-200",
      buttonStyle:
        "bg-black hover:bg-gray-800 text-white shadow-lg transform hover:-translate-y-1 border-2 border-transparent hover:border-black",
      cardStyle:
        "bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      textColor: "text-black",
      subTextColor: "text-gray-600",
    },
    {
      id: "peach",
      name: "Soft Peach",
      background: "from-rose-50 via-orange-50 to-amber-50",
      buttonStyle:
        "bg-white/80 hover:bg-white text-rose-900 shadow-sm border border-rose-100 rounded-full",
      cardStyle:
        "bg-white/60 border-rose-200 backdrop-blur-xl rounded-[2rem] shadow-xl",
      textColor: "text-rose-800",
      subTextColor: "text-rose-600",
    },
    {
      id: "nature",
      name: "Deep Forest",
      background: "from-green-900 via-emerald-950 to-teal-900",
      buttonStyle:
        "bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-100 border border-emerald-500/30 backdrop-blur-sm",
      cardStyle:
        "bg-black/30 border-emerald-500/20 backdrop-blur-md shadow-2xl",
      textColor: "text-emerald-50",
      subTextColor: "text-emerald-300",
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk Neon",
      background: "from-slate-950 via-purple-950 to-slate-900",
      buttonStyle:
        "bg-black/80 hover:bg-black text-cyan-400 border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
      cardStyle:
        "bg-black/60 border-cyan-500/50 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      textColor: "text-cyan-400",
      subTextColor: "text-purple-300",
    },
    {
      id: "ocean",
      name: "Ocean Breeze",
      background: "from-cyan-500 via-blue-500 to-indigo-600",
      buttonStyle:
        "bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl backdrop-blur-sm",
      cardStyle: "bg-white/10 border-white/20 shadow-xl backdrop-blur-md",
      textColor: "text-white",
      subTextColor: "text-blue-100",
    },
    {
      id: "galaxy",
      name: "Galaxy Stars",
      background: "from-gray-900 via-purple-900 to-violet-900",
      buttonStyle:
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg border-0",
      cardStyle: "bg-black/40 border-purple-500/30 backdrop-blur-xl shadow-2xl",
      textColor: "text-white",
      subTextColor: "text-purple-200",
    },
    {
      id: "luxury",
      name: "Luxury Gold",
      background: "from-slate-900 to-black",
      buttonStyle:
        "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] border border-yellow-500/50",
      cardStyle:
        "bg-black/80 border border-amber-500/30 shadow-2xl backdrop-blur-sm",
      textColor: "text-amber-100",
      subTextColor: "text-amber-400/80",
    },
    {
      id: "vintage",
      name: "Vintage Paper",
      background: "from-orange-100 via-amber-100 to-yellow-50",
      buttonStyle:
        "bg-[#fdf6e3] hover:bg-[#eee8d5] text-[#5b4636] border-2 border-[#d3c6b1] shadow-[4px_4px_0px_#d3c6b1]",
      cardStyle:
        "bg-[#fffdf5] border-2 border-[#d3c6b1] shadow-xl p-6 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/paper.png')] before:opacity-50",
      textColor: "text-[#433422]",
      subTextColor: "text-[#8a6d3b]",
    },
    {
      id: "candy",
      name: "Candy Pop",
      background: "from-pink-400 via-purple-400 to-indigo-400",
      buttonStyle:
        "bg-white hover:scale-105 transition-transform text-pink-500 font-bold shadow-lg rounded-full border-4 border-pink-200",
      cardStyle:
        "bg-white/30 border-2 border-white/50 backdrop-blur-lg rounded-3xl",
      textColor: "text-white",
      subTextColor: "text-pink-100 font-bold",
    },
  ];
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    icon: "Link",
    active: true,
  });

  const [accountForm, setAccountForm] = useState({
    username: credentials.username,
    currentPassword: "",
    newPassword: "",
  });

  const [newSocial, setNewSocial] = useState({
    platform: "",
    url: "",
    icon: "Instagram",
  });

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    // Verify current password by hashing it first
    const currentPasswordHash = await hashPassword(accountForm.currentPassword);

    if (currentPasswordHash === credentials.password) {
      let newPasswordHash = credentials.password;

      if (accountForm.newPassword) {
        newPasswordHash = await hashPassword(accountForm.newPassword);
      }

      updateCredentials({
        username: accountForm.username,
        password: newPasswordHash,
      });
      alert("Akun berhasil diperbarui!");
      setAccountForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } else {
      alert("Password saat ini salah!");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (newLink.title && newLink.url) {
      addLink(newLink);
      setNewLink({ title: "", url: "", icon: "Link", active: true });
    }
  };

  const handleAddSocial = (e) => {
    e.preventDefault();
    if (newSocial.platform && newSocial.url) {
      updateSocials([...socials, { id: Date.now(), ...newSocial }]);
      setNewSocial({ platform: "", url: "", icon: "Instagram" });
    }
  };

  const handleDeleteSocial = (id) => {
    if (confirm("Hapus sosial media ini?")) {
      updateSocials(socials.filter((s) => s.id !== id));
    }
  };

  const NavButton = ({ tab, icon: LucideIcon, label }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
      }}
      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === tab ? "bg-primary text-white" : "hover:bg-gray-800 text-gray-300"}`}
    >
      <LucideIcon size={20} /> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-0 md:pt-10 pb-4 md:pb-10 px-0 md:px-4">
      {/* Mobile Header */}
      <div className="md:hidden w-full bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <LucideIcons.LayoutDashboard size={20} className="text-secondary" />
          <span className="font-bold">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 hover:bg-gray-800 rounded-md transition-colors"
        >
          {isSidebarOpen ? (
            <LucideIcons.X size={24} />
          ) : (
            <LucideIcons.Menu size={24} />
          )}
        </button>
      </div>

      <div className="w-full max-w-4xl bg-white md:rounded-xl shadow-none md:shadow-lg overflow-hidden flex flex-col md:flex-row h-full min-h-[80vh] relative">
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed md:relative inset-y-0 left-0 z-50 md:z-0
          w-64 md:w-64 bg-gray-900 text-white p-6 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >
          <div className="flex items-center gap-2 mb-8">
            <LucideIcons.LayoutDashboard size={24} className="text-secondary" />
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>

          <nav className="flex-1 space-y-2">
            <NavButton tab="profile" icon={LucideIcons.User} label="Profil" />
            <NavButton tab="links" icon={LucideIcons.Link} label="Tautan" />
            <NavButton
              tab="socials"
              icon={LucideIcons.Share2}
              label="Sosial Media"
            />
            <NavButton tab="themes" icon={LucideIcons.Palette} label="Tema" />
            <NavButton tab="account" icon={LucideIcons.Settings} label="Akun" />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-700 space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <LucideIcons.LogOut size={18} /> Logout
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <LucideIcons.ExternalLink size={18} /> Lihat Live Site
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50 pb-24 md:pb-8">
          {/* Profile Editor */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Edit Profil
              </h2>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary bg-gray-100 relative group">
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs text-center p-1">
                      Upload Foto
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Klik foto untuk mengganti
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio Singkat
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => updateProfile({ bio: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Links Editor */}
          {activeTab === "links" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Kelola Tautan
              </h2>

              {/* Add New Link */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-700">
                  Tambah Tautan Baru
                </h3>
                <form
                  onSubmit={handleAddLink}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    type="text"
                    placeholder="Judul Tautan (mis: Website Saya)"
                    value={newLink.title}
                    onChange={(e) =>
                      setNewLink({ ...newLink, title: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <input
                    type="url"
                    placeholder="URL (https://...)"
                    value={newLink.url}
                    onChange={(e) =>
                      setNewLink({ ...newLink, url: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <div className="md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <select
                      value={newLink.icon}
                      onChange={(e) =>
                        setNewLink({ ...newLink, icon: e.target.value })
                      }
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
                    >
                      <option value="Link">Link Icon</option>
                      <option value="Globe">Globe</option>
                      <option value="Github">Github</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Linkedin">LinkedIn</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Mail">Mail</option>
                      <option value="Phone">Phone</option>
                      <option value="MessageCircle">WhatsApp/Message</option>
                      <option value="ShoppingBag">Shop</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <LucideIcons.Plus size={18} /> Tambah
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Links */}
              <div className="space-y-3">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                        <Icon name={link.icon} size={20} />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            updateLink(link.id, { title: e.target.value })
                          }
                          className="font-medium text-gray-800 bg-transparent border-b border-transparent focus:border-primary outline-none w-full"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            updateLink(link.id, { url: e.target.value })
                          }
                          className="text-sm text-gray-500 bg-transparent border-b border-transparent focus:border-primary outline-none w-full"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                      <div className="flex flex-col gap-1 mr-2">
                        <button
                          onClick={() => moveLinkUp(links.indexOf(link))}
                          disabled={links.indexOf(link) === 0}
                          className="text-gray-400 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                          title="Pindah ke Atas"
                        >
                          <LucideIcons.ChevronUp size={20} />
                        </button>
                        <button
                          onClick={() => moveLinkDown(links.indexOf(link))}
                          disabled={links.indexOf(link) === links.length - 1}
                          className="text-gray-400 hover:text-primary disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                          title="Pindah ke Bawah"
                        >
                          <LucideIcons.ChevronDown size={20} />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          updateLink(link.id, { active: !link.active })
                        }
                        className={`p-2 rounded-md transition-colors ${link.active ? "text-green-500 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}
                        title={link.active ? "Sembunyikan" : "Tampilkan"}
                      >
                        {link.active ? (
                          <LucideIcons.Eye size={18} />
                        ) : (
                          <LucideIcons.EyeOff size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => deleteLink(link.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Hapus"
                      >
                        <LucideIcons.Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {links.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Belum ada tautan. Tambahkan sekarang!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Socials Editor */}
          {activeTab === "socials" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Kelola Sosial Media
              </h2>

              {/* Add New Social */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-700">
                  Tambah Sosial Media Baru
                </h3>
                <form
                  onSubmit={handleAddSocial}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <input
                    type="text"
                    placeholder="Nama Platform (mis: TikTok)"
                    value={newSocial.platform}
                    onChange={(e) =>
                      setNewSocial({ ...newSocial, platform: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <input
                    type="url"
                    placeholder="URL (https://...)"
                    value={newSocial.url}
                    onChange={(e) =>
                      setNewSocial({ ...newSocial, url: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                  <div className="sm:col-span-2 flex flex-col xs:flex-row justify-between items-center gap-4">
                    <select
                      value={newSocial.icon}
                      onChange={(e) =>
                        setNewSocial({ ...newSocial, icon: e.target.value })
                      }
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white flex-1"
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Linkedin">LinkedIn</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Github">Github</option>
                      <option value="Mail">Mail</option>
                      <option value="MessageCircle">WhatsApp</option>
                      <option value="Globe">Website</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <LucideIcons.Plus size={18} /> Tambah
                    </button>
                  </div>
                </form>
              </div>

              {/* Socials List */}
              <div className="space-y-3">
                {socials.map((social, index) => (
                  <div
                    key={social.id || index}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                        <Icon name={social.icon} size={24} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-400 uppercase">
                          {social.platform}
                        </label>
                        <input
                          type="url"
                          value={social.url}
                          onChange={(e) => {
                            const newSocials = [...socials];
                            newSocials[index].url = e.target.value;
                            updateSocials(newSocials);
                          }}
                          className="text-sm text-gray-600 bg-transparent border-b border-transparent focus:border-primary outline-none w-full"
                          placeholder="Link URL"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSocial(social.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors sm:opacity-0 group-hover:opacity-100 self-end sm:self-auto"
                      title="Hapus"
                    >
                      <LucideIcons.Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {socials.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Belum ada sosial media.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Themes Editor */}
          {activeTab === "themes" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Kustomisasi Tema
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateTheme(t)}
                    className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden group ${theme.id === t.id ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/50"}`}
                  >
                    <div
                      className={`h-24 w-full rounded-lg bg-gradient-to-br ${t.background} mb-3 border border-gray-100`}
                    ></div>
                    <div className="font-semibold text-gray-800">{t.name}</div>
                    {theme.id === t.id && (
                      <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                        <LucideIcons.Check size={12} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Pengaturan Akun
              </h2>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <form
                  onSubmit={handleUpdateAccount}
                  className="space-y-4 max-w-md"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username (Login)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      value={accountForm.username}
                      onChange={(e) =>
                        setAccountForm({
                          ...accountForm,
                          username: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password Saat Ini
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      value={accountForm.currentPassword}
                      onChange={(e) =>
                        setAccountForm({
                          ...accountForm,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                      placeholder="Masukkan password lama untuk konfirmasi"
                      autoComplete="current-password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password Baru (Opsional)
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      value={accountForm.newPassword}
                      onChange={(e) =>
                        setAccountForm({
                          ...accountForm,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Kosongkan jika tidak ingin mengganti"
                      autoComplete="new-password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Simpan Perubahan
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
