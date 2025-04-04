import React from "react";
import { motion } from "framer-motion";
import LandingNavbar from "../components/landing/LandingNavbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import { BlockchainStats } from "../components/landing/BlockchainStats";
import Demo from "../components/landing/Demo";
import AnimatedCTA from "../components/landing/AnimatedCTA";
import AnimatedFooter from "../components/landing/AnimatedFooter";

const Landing = () => {
  

  return (
    <div className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        
        <LandingNavbar />
        
        <section className="relative z-10">
          <Hero />
        </section>

        <BlockchainStats />

        <Features />

        <Demo />

        <AnimatedCTA />

        <AnimatedFooter />
      </motion.div>
    </div>
  );
};

export default Landing;