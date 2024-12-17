import React from "react";
import { motion } from "framer-motion";

const AnimationWrapper = ({ children, initial={opacity :0}, animate={opacity : 1}, transition={duration : 1} }) => {
  return (
    <motion.div
      initial={initial} // Sets the initial state of the animation
      animate={animate} // Sets the animation state
      transition={transition} // Defines how the transition behaves
    >
      {children} {/* Render the children */}
    </motion.div>
  );
};

export default AnimationWrapper;
