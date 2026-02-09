import React from "react";
import { useAppHelper } from "../context/AppContext";

const Layout = ({ children }) => {
  const { data } = useAppHelper();
  const theme = data?.theme || {
    background: "from-indigo-100 via-purple-100 to-pink-100",
    cardStyle: "bg-white/30 border-white/40",
  };

  const bgStyle = theme.customBackground
    ? { background: theme.customBackground }
    : {};

  return (
    <div
      className={`min-h-screen ${!theme.customBackground ? "bg-gradient-to-br " + theme.background : ""} flex justify-center md:py-10 md:px-4 transition-colors duration-500`}
      style={bgStyle}
    >
      <div
        className={`w-full max-w-md backdrop-blur-md overflow-x-hidden flex flex-col min-h-screen md:min-h-[85vh] md:h-auto relative transition-all duration-300
        ${theme.cardStyle}
        !bg-transparent !shadow-none !border-0
        md:!bg-opacity-100 md:!shadow-2xl md:!border md:rounded-3xl`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
