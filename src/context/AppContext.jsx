import React, { createContext, useContext, useState, useEffect } from "react";
import { hashPassword } from "../utils/security";

const AppContext = createContext();

const initialData = {
  profile: {
    name: "Nama Anda",
    bio: "Deskripsi singkat tentang diri Anda.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  links: [
    {
      id: 1,
      title: "Kunjungi Website Saya",
      url: "https://example.com",
      icon: "Globe",
      active: true,
    },
    {
      id: 2,
      title: "Lihat Portfolio",
      url: "https://github.com",
      icon: "Github",
      active: true,
    },
    {
      id: 3,
      title: "Hubungi via WhatsApp",
      url: "https://wa.me/",
      icon: "MessageCircle",
      active: true,
    },
  ],
  socials: [
    {
      id: 1,
      platform: "Instagram",
      url: "https://instagram.com",
      icon: "Instagram",
    },
    { id: 2, platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    {
      id: 3,
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: "Linkedin",
    },
  ],
  theme: {
    id: "default",
    name: "Classic Indigo",
    background: "from-indigo-100 via-purple-100 to-pink-100",
    buttonStyle: "bg-white/40 hover:bg-white/60 text-gray-800",
    cardStyle: "bg-white/30 border-white/40",
  },
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [isCloudLoading, setIsCloudLoading] = useState(true);

  // Load data from Cloud on mount, fallback to localStorage
  useEffect(() => {
    const initData = async () => {
      try {
        // SKIP cloud fetch on localhost to prevent proxy errors
        if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        ) {
          if (!window.location.port.includes("8888")) {
            console.log("Local development: using localStorage only.");
            throw new Error("Skipping cloud fetch on localhost");
          }
        }

        const response = await fetch("/.netlify/functions/cloud-data");
        if (response.ok) {
          const cloudData = await response.json();
          if (cloudData && Object.keys(cloudData).length > 0) {
            setData(cloudData);
            localStorage.setItem("linktree_data", JSON.stringify(cloudData));
          } else {
            // No cloud data, use local
            const savedData = localStorage.getItem("linktree_data");
            if (savedData) setData(JSON.parse(savedData));
          }
        } else {
          throw new Error("Function returned " + response.status);
        }
      } catch (err) {
        console.warn("Cloud connection skipped/failed, using local storage");
        const savedData = localStorage.getItem("linktree_data");
        if (savedData) setData(JSON.parse(savedData));
      } finally {
        setIsCloudLoading(false);
      }
    };
    initData();
  }, []);

  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem("admin_credentials");
    // Default: admin / admin (hashed)
    return saved
      ? JSON.parse(saved)
      : {
          username: "admin",
          password:
            "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const session = JSON.parse(localStorage.getItem("auth_session"));
      // Valid if session exists and expiry is in the future
      return session && session.expiry > Date.now();
    } catch (e) {
      return false;
    }
  });

  // Session Monitor: Check expiry every minute
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const session = JSON.parse(localStorage.getItem("auth_session") || "{}");
      if (!session.expiry || session.expiry <= Date.now()) {
        console.log("Session expired. Logging out...");
        logout();
      }
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isCloudLoading) {
      localStorage.setItem("linktree_data", JSON.stringify(data));

      // Auto-sync to Cloud
      const syncToCloud = async () => {
        // Skip on localhost
        if (
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1") &&
          !window.location.port.includes("8888")
        ) {
          return;
        }

        try {
          await fetch("/.netlify/functions/cloud-data", {
            method: "POST",
            body: JSON.stringify(data),
          });
        } catch (err) {
          console.error("Cloud sync failed", err);
        }
      };
      syncToCloud();
    }
  }, [data, isCloudLoading]);

  useEffect(() => {
    localStorage.setItem("admin_credentials", JSON.stringify(credentials));
  }, [credentials]);

  // Migration: Hash existing plain password if needed
  useEffect(() => {
    const migratePassword = async () => {
      // Basic check: SHA-256 hash is 64 chars hex. If length != 64 or contains non-hex, it might be plain.
      // NOTE: "admin" is 5 chars.
      if (credentials.password.length !== 64) {
        const hashedPassword = await hashPassword(credentials.password);
        setCredentials((prev) => ({ ...prev, password: hashedPassword }));
      }
    };
    migratePassword();
  }, []);

  const login = async (username, password) => {
    // Rate Limiting
    const attempts = JSON.parse(
      localStorage.getItem("login_attempts") || '{"count": 0, "lockUntil": 0}',
    );

    if (Date.now() < attempts.lockUntil) {
      const remainingSeconds = Math.ceil(
        (attempts.lockUntil - Date.now()) / 1000,
      );
      return {
        success: false,
        error: `Terlalu banyak percobaan. Tunggu ${remainingSeconds} detik.`,
      };
    }

    const hashedPassword = await hashPassword(password);

    if (
      username === credentials.username &&
      hashedPassword === credentials.password
    ) {
      setIsAuthenticated(true);
      // Set session for 2 hours (7200000 ms)
      const expiry = Date.now() + 2 * 60 * 60 * 1000;
      localStorage.setItem("auth_session", JSON.stringify({ expiry }));

      // Reset attempts on success
      localStorage.removeItem("login_attempts");
      return { success: true };
    }

    // Handle Failure
    const newCount = attempts.count + 1;
    let lockUntil = 0;
    // Lock for 30s after 3 failed attempts, 5m after 5
    if (newCount === 3) {
      lockUntil = Date.now() + 30 * 1000;
    } else if (newCount >= 5) {
      lockUntil = Date.now() + 5 * 60 * 1000;
    }

    localStorage.setItem(
      "login_attempts",
      JSON.stringify({ count: newCount, lockUntil }),
    );

    return { success: false, error: "Username atau Password salah!" };
  };

  const updateCredentials = (newCredentials) => {
    setCredentials((prev) => ({ ...prev, ...newCredentials }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth_session");
    // Optional: could reload page to clear memory state
    // window.location.href = "/";
  };

  const updateProfile = (profileData) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileData },
    }));
  };

  const addLink = (link) => {
    setData((prev) => ({
      ...prev,
      links: [...prev.links, { ...link, id: Date.now() }],
    }));
  };

  const updateLink = (id, updatedLink) => {
    setData((prev) => ({
      ...prev,
      links: prev.links.map((link) =>
        link.id === id ? { ...link, ...updatedLink } : link,
      ),
    }));
  };

  const deleteLink = (id) => {
    setData((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== id),
    }));
  };

  const updateSocials = (socials) => {
    setData((prev) => ({ ...prev, socials }));
  };

  const updateTheme = (themeData) => {
    setData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...themeData },
    }));
  };

  const moveLinkUp = (index) => {
    if (index === 0) return;
    setData((prev) => {
      const newLinks = [...prev.links];
      [newLinks[index - 1], newLinks[index]] = [
        newLinks[index],
        newLinks[index - 1],
      ];
      return { ...prev, links: newLinks };
    });
  };

  const moveLinkDown = (index) => {
    setData((prev) => {
      if (index === prev.links.length - 1) return prev;
      const newLinks = [...prev.links];
      [newLinks[index], newLinks[index + 1]] = [
        newLinks[index + 1],
        newLinks[index],
      ];
      return { ...prev, links: newLinks };
    });
  };

  const resetData = () => {
    setData(initialData);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        updateProfile,
        addLink,
        updateLink,
        deleteLink,
        updateSocials,
        updateTheme,
        moveLinkUp,
        moveLinkDown,
        resetData,
        isAuthenticated,
        login,
        logout,
        // Only expose credentials to authenticated users for security
        credentials: isAuthenticated ? credentials : null,
        updateCredentials,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppHelper = () => useContext(AppContext);
