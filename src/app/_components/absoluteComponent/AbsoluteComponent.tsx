"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useContext } from "react";
import { DisplayContext } from "@/app/context/DisplayComponents";
interface AbsoluteModalProps {
  children: ReactNode;
}
export const AbsoluteComponent = ({
  children,
}: AbsoluteModalProps) => {
    const{visibleComponent, setVisibleComponent} = useContext(DisplayContext)
  return (
    <div className="absolute top-0 left-0 w-screen min-h-screen flex flex-col justify-center items-center z-100 bg-[rgba(0,0,0,0.7)]">
      <div className={`bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative`}>
        <FontAwesomeIcon
          icon={faTimes}
          className="text-background bg-helper w-[30px] h-[30px] absolute -top-3 -right-3 cursor-pointer rounded-full p-1"
          onClick={()=>setVisibleComponent('')}
        />
        {children}
      </div>
    </div>
  );
};