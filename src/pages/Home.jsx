import React from "react";
import { Link } from "react-router-dom";
import { useAppHelper } from "../context/AppContext";
import Icon from "../components/Icon";
import Layout from "../components/Layout";
import * as LucideIcons from "lucide-react";

const Home = () => {
  const { data, isCloudLoading } = useAppHelper();

  // If loading and we haven't changed from dummy data, show a centered loader
  // This prevents the "glitch" where dummy data flashes before real data
  if (isCloudLoading && data.profile.name === "Nama Anda") {
    return (
      <Layout>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse">
          <div className="w-28 h-28 rounded-full bg-white/20" />
          <div className="h-8 w-48 bg-white/20 rounded-lg" />
          <div className="h-4 w-64 bg-white/20 rounded-lg" />
          <div className="space-y-3 w-full max-w-xs pt-8">
            <div className="h-14 bg-white/20 rounded-xl" />
            <div className="h-14 bg-white/20 rounded-xl" />
            <div className="h-14 bg-white/20 rounded-xl" />
          </div>
        </div>
      </Layout>
    );
  }

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
          <div className="w-28 h-28 rounded-full border-[3px] border-white/80 shadow-xl overflow-hidden mb-5 transition-transform hover:scale-105 hover:rotate-3 duration-500 animate-float">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className={`text-2xl md:text-3xl font-bold mb-2 tracking-tight`}
            style={{ color: theme.customTextColor || "white" }}
          >
            {profile.name}
          </h1>
          <p
            className={`text-sm md:text-base text-center max-w-xs font-medium bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10`}
            style={{ color: theme.customTextColor || "white" }}
          >
            {profile.bio}
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-4 w-full pb-32">
          {links
            .filter((l) => l.active)
            .map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "backwards",
                  backgroundColor: theme.customButtonColor || "",
                  color: theme.customButtonTextColor || "",
                }}
                className={`flex animate-slide-up items-center p-4 rounded-xl w-full group transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-md ${!theme.customButtonColor ? theme.buttonStyle : ""}`}
              >
                <div
                  className={`absolute left-4 transition-colors duration-300`}
                  style={{
                    color:
                      theme.customButtonTextColor ||
                      (isDarkTheme ? "white" : "gray"),
                  }}
                >
                  <Icon name={link.icon} size={22} />
                </div>
                <span className="flex-1 font-semibold text-center px-8 tracking-wide">
                  {link.title}
                </span>
                <div
                  className={`absolute right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300`}
                  style={{
                    color:
                      theme.customButtonTextColor ||
                      (isDarkTheme ? "white" : "gray"),
                  }}
                >
                  <LucideIcons.ArrowRight size={18} />
                </div>
              </a>
            ))}
        </div>
      </div>

      {/* Socials Footer - Always Floating "Smart" Capsule */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[90%] pointer-events-none">
        <div
          className={`flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border pointer-events-auto transition-all duration-500 hover:scale-105 active:scale-95
          ${isDarkTheme ? "bg-black/60 border-white/20" : "bg-white/70 border-gray-200/80"}`}
        >
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: `${index * 100 + 300}ms`,
                animationFillMode: "backwards",
              }}
              className={`animate-bounce-in p-2 rounded-full transition-all duration-300 hover:scale-125
              ${isDarkTheme ? "text-white/90 hover:text-white hover:bg-white/10" : "text-gray-800 hover:text-black hover:bg-black/5"}`}
            >
              <Icon name={social.icon} size={22} />
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
