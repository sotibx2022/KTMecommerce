"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { DisplayContext } from "@/app/context/DisplayComponents";
import gsap from 'gsap';
interface AbsoluteModalProps {
  children: ReactNode;
}
export const AbsoluteComponent = ({ children }: AbsoluteModalProps) => {
  const { setVisibleComponent } = useContext(DisplayContext);
  return (
    <div 
      className="fixed inset-0 overflow-y-auto z-100"
      style={{ background: "var(--gradientwithOpacity)" }}
    >
      <div className="flex min-h-full items-center justify-center p-2 md:p-4">
        <div className="relative bg-background max-w-[400px] w-full p-2 md:p-6 rounded-lg shadow-lg my-4 max-h-[90vh] overflow-y-auto">
          <FontAwesomeIcon
            icon={faTimes}
            className="text-background bg-helper w-[30px] h-[30px] z-10 absolute top-3 right-3 cursor-pointer rounded-full p-1"
          />
          {children}
        </div>
      </div>
    </div>
  );
};