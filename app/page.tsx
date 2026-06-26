"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LandingPage } from "@/components/landing-page";
import { AuthPage } from "@/components/auth-page";

const FigmaWorkspace = dynamic(() => import("./app"), { ssr: false });

export default function Home() {
  const [view, setView] = useState<"landing" | "auth" | "workspace">("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Check auth state on mount
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem("figma_clone_loggedin");
    const savedUsername = localStorage.getItem("figma_clone_username");
    if (savedLoggedIn === "true") {
      setIsLoggedIn(true);
      setUsername(savedUsername || "Designer");
      setView("workspace");
    }
  }, []);

  const handleLoginSuccess = (name: string) => {
    localStorage.setItem("figma_clone_loggedin", "true");
    localStorage.setItem("figma_clone_username", name);
    setIsLoggedIn(true);
    setUsername(name);
    setView("workspace");
  };

  const handleLogout = () => {
    localStorage.removeItem("figma_clone_loggedin");
    localStorage.removeItem("figma_clone_username");
    setIsLoggedIn(false);
    setUsername("");
    setView("landing");
  };

  if (view === "workspace" && isLoggedIn) {
    return <FigmaWorkspace onLogout={handleLogout} />;
  }

  if (view === "auth") {
    return (
      <AuthPage
        onSuccess={handleLoginSuccess}
        onBack={() => setView("landing")}
      />
    );
  }

  return (
    <LandingPage
      onStartDesigning={() => setView("auth")}
      isLoggedIn={isLoggedIn}
      onGoToWorkspace={() => setView("workspace")}
    />
  );
}

