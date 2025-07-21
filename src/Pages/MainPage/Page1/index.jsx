import React from "react";
import Home from "./Home";
import About from "./About";
import Header from "./Header";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-y-auto">
      {/* Floating Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* PAGE 1: Home */}
      <div className="h-screen sticky top-0 z-0 pt-[30px]">
        {/* pt-20 supaya konten Home tidak tertutup header */}
        <Home />
      </div>

      {/* PAGE 2: About */}
      <div className="min-h-screen">
        <About />
      </div>
    </div>
  );
};

export default LandingPage;
