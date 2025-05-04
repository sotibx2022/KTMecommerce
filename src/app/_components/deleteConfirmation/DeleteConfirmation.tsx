"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { DisplayContext } from "@/app/context/DisplayComponents";
import LoadingComponent from "../loadingComponent/LoadingContainer";
interface IDeleteConfirmationProps{
    message:string;
    returnConfirmValue:(value:boolean)=>void;
    loading:boolean;
}
const DeleteConfirmation:React.FC<IDeleteConfirmationProps> = ({ message,returnConfirmValue,loading}) => {
    const {visibleComponent,setVisibleComponent} = useContext(DisplayContext);
    const onConfirm=()=>{
      returnConfirmValue(true)
    }
    const onCancel=()=>{
    }
  return (
    <div
      className="fixed inset-0 w-full min-h-screen flex items-center justify-center z-50"
      style={{ background: "var(--gradientwithOpacity)" }}
    >
      <div className="relative bg-background rounded-lg shadow-helper p-6 max-w-[400px]">
        {/* Close button */}
        <FontAwesomeIcon
                      icon={faTimes}
                      className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
        onClick={()=>setVisibleComponent('')}
                    />
        {loading ? <LoadingComponent/>:<div className="dilaugeBoxContainer">
          {/* Message */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-primaryDark mb-2">Confirm Deletion</h3>
          <p className="text-primaryLight">{message}</p>
        </div>
        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={()=>setVisibleComponent('')}
            className="px-4 py-2 bg-background text-priamryDark rounded-md hover:bg-primaryLight transition-colors border border-primaryLight"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primaryDark text-background rounded-md hover:bg-primaryLight transition-colors"
          >
            Yes, Delete
          </button>
        </div>
        </div>}
      </div>
    </div>
  );
};
export default DeleteConfirmation;