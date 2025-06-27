"use client"
import { motion, useAnimation, Variants } from 'framer-motion';
import React, { ReactNode, useEffect } from 'react';
interface TextRevealProps {
  children: ReactNode;
  delay?:number;
}
const TextReveal: React.FC<TextRevealProps> = ({ children,delay }) => {
    const entranceControl = useAnimation();
    const textControl= useAnimation();
    const entranceVariants:Variants={
        initial:{x:"100%",opacity:0},
        final:{x:0,opacity:1,transition:{duration:0.3,delay:delay}}
    }
    const textVarients:Variants={
        initial:{width:"100%"},
        final:{width:0,transition:{duration:0.3,delay:delay}}
    }
    useEffect(()=>{
        const animateInSequence=async()=>{
            await entranceControl.start('final');
            await textControl.start('final');
        }
        animateInSequence()
    },[entranceControl,textControl])
  return (
    <motion.div variants={entranceVariants} initial="initial" animate={entranceControl} className='relative inline-flex'>
            {children}
            <motion.div className='absolute to-0 left-0 h-full bg-[var(--helper)] z-50'variants={textVarients} initial="initial" animate={textControl}></motion.div>
        </motion.div>
  );
};
export default TextReveal;