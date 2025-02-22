"use client";
import { useEffect, useState } from "react";
import styles from "./page.css";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show scroll-to-top button when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <main>
        {/* Navbar */}
        <div className="navbar">Focus-Flow</div>

        {/* Background Image */}
        <div className="container"></div>

        {/* Content Section (below image) */}
        <div className="content-section">
          <h1>🚀 Welcome to the Ultimate Hackathon Hub!</h1>
          <p className="description">
            Join the <b>Hackathon Collaboration Hub</b> 🎯 <br />
            Find teammates, brainstorm ideas, and build something amazing!
          </p>

          {/* Buttons */}
          <div className="button-section">
            <button className="button-1">🔍 Find a Team</button>
            <button className="button-2">✨ Join a Hackathon</button>
            <button className="button-3">💡 Post an Idea</button>
          </div>

          {/* Hackathon Cards */}
          <div className="hackathon-cards">
            <div className="card">
              <div className="card-front">⚡ AI Hackathon</div>
              <div className="card-back">
                Prize: $5000 🏆 <br />
                Date: March 15, 2025
              </div>
            </div>
            <div className="card">
              <div className="card-front">🌐 Web3 Challenge</div>
              <div className="card-back">
                Prize: $3000 🚀 <br />
                Date: April 10, 2025
              </div>
            </div>
          </div>
        </div>

        
      </main>
    </div>
  );
}
