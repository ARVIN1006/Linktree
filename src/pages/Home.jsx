import React from "react";
import { Link } from "react-router-dom";
import { useAppHelper } from "../context/AppContext";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import * as LucideIcons from "lucide-react";

const Home = () => {
  const { data } = useAppHelper();
  const {
    profile,
    links,
    socials,
    theme = { id: "default", buttonStyle: "" },
  } = data;

  // Use theme text colors if available, otherwise fallback to reasonable defaults
  const textColor = theme?.textColor || "text-gray-800";
  const subTextColor = theme?.subTextColor || "text-gray-600";
  const isDarkTheme =
    theme?.id === "midnight" ||
    theme?.id === "electric" ||
    theme?.id === "nature" ||
    theme?.id === "cyberpunk";

  return (
    <Layout>
      <div className="flex-1 px-6 py-12 flex flex-col items-center w-full max-w-md mx-auto">
        {/* Admin Access Button (Hidden/Subtle) */}
        <div className="absolute top-4 right-4 z-20">
          <Link
            to="/admin"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition shadow-sm block text-gray-700"
          >
            <LucideIcons.Settings
              size={20}
              className={isDarkTheme ? "text-white" : "text-gray-700"}
            />
          </Link>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-10 animate-fade-in relative z-10 w-full">
          <div className="w-28 h-28 rounded-full border-[3px] border-white/80 shadow-xl overflow-hidden mb-5 transition-transform hover:scale-105 hover:rotate-3 duration-500">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className={`text-2xl md:text-3xl font-bold ${textColor} mb-2 tracking-tight`}
          >
            {profile.name}
          </h1>
          <p
            className={`text-sm md:text-base ${subTextColor} text-center max-w-xs font-medium bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10`}
          >
            {profile.bio}
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-4 w-full animate-slide-up pb-32">
          {links
            .filter((l) => l.active)
            .map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 rounded-xl w-full group transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-md ${theme.buttonStyle}`}
              >
                <div
                  className={`absolute left-4 transition-colors duration-300 ${isDarkTheme ? "text-white/80" : "text-gray-700"}`}
                >
                  <Icon name={link.icon} size={22} />
                </div>
                <span className="flex-1 font-semibold text-center px-8 tracking-wide">
                  {link.title}
                </span>
                <div
                  className={`absolute right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300 ${isDarkTheme ? "text-white/80" : "text-gray-400"}`}
                >
                  <LucideIcons.ArrowRight size={18} />
                </div>
              </a>
            ))}
        </div>
      </div>

      {/* Socials Footer */}
      <div className="py-6 px-6 bg-white/10 backdrop-blur-md border-t border-white/10 flex justify-center gap-6 sticky bottom-0 z-30 w-full">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${isDarkTheme ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-black"} hover:scale-110 transition-transform`}
          >
            <Icon name={social.icon} size={24} />
          </a>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
