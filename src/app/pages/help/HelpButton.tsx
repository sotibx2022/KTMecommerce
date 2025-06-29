"use client"
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
const HelpButton = () => {
  const controls = useAnimation();
  const initialBackground = "linear-gradient(35deg,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 91%, rgba(0, 0, 0, 1))";
  const finalBackground = "linear-gradient(35deg,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1))";
  return (
    <div>
      <div className="relative inline-block">
        <motion.div
          className="absolute -top-[5px] -left-[5px] w-[calc(100%+10px)] h-[calc(100%+10px)]"
          style={{ background: initialBackground }}
          initial={{ background: initialBackground }}
          animate={controls}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.button
          className="bg-yellow-500 relative px-4 py-2 rounded"
          whileHover={{ scale: 1.01 }}
          onHoverStart={() =>
            controls.start({ background: finalBackground, transition: { duration: 0.5 } })
          }
          onHoverEnd={() =>
            controls.start({ background: initialBackground, transition: { duration: 0.5 } })
          }
        >
          Click Me
        </motion.button>
      </div>
    </div>
  );
};
export default HelpButton;
