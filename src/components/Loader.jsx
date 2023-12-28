import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "4rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
};
const loadingCircle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "#3A36DB",
  borderRadius: "0.5rem",
};

const loadingAnimation = {
  duration: 0.4,
  yoyo: Infinity,
  ease: "easeInOut",
};

const Loader = ({ loadingText = "Loading..." }) => {
  return (
    <div aria-live="polite"> {/* Accessibility for screen readers */}
      <div className="fixed w-full min-h-screen z-50 bg-black opacity-30" />
      <div className="flex fixed w-full justify-center items-center h-screen">
        <motion.div
          style={loadingContainer}
          variants={{
            initial: {
              // Initial styles
            },
            loading: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="initial"
          animate="loading"
        >
          {Array.from({ length: 3 }, (_, i) => (
            <motion.span
              key={i}
              style={loadingCircle}
              variants={{
                initial: { y: "0%" },
                loading: { y: "60%" },
              }}
              transition={loadingAnimation}
            />
          ))}
        </motion.div>
        <div className="sr-only">{loadingText}</div> {/* Visually hidden label */}
      </div>
    </div>
  );
};

export default Loader;
