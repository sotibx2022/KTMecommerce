"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useContext } from "react";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { motion } from "framer-motion";
import CloseIcon from "./CloseIcon";
interface AbsoluteModalProps {
  children: ReactNode;
}
export const AbsoluteComponent = ({ children }: AbsoluteModalProps) => {
  const { setVisibleComponent } = useContext(DisplayContext);
  return (
    <motion.div
      initial={{ x: "-100vw",}} 
      animate={{ x: 0,}}
      exit={{ y: "100vw",}} 
      transition={{ 
        duration: 0.5 
      }}
      className="fixed inset-0 overflow-y-auto z-50"
      style={{ background: "var(--gradientwithOpacity)" }}
    >
      <div className="flex min-h-full items-center justify-center p-2 md:p-4">
        <motion.div
          className="relative bg-background max-w-[400px] w-full p-2 md:p-6 rounded-lg shadow-lg my-4 max-h-[90vh] overflow-y-auto"
        >
          <CloseIcon onClick={() => setVisibleComponent('')}/>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};