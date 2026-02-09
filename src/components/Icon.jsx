import React from "react";
import * as LucideIcons from "lucide-react";

const Icon = ({ name, size = 24, className = "" }) => {
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icon;
