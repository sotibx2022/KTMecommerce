import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export const HeaderSection = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-between items-center">
    <Link href="/" className="flex-shrink-0">
      <img 
        src="../assets/brand/logo.png" 
        alt="Logo"
        className="h-12 w-auto" 
      />
    </Link>
    <FontAwesomeIcon
      icon={faTimes}
      className="text-background bg-helper w-[30px] h-[30px] cursor-pointer rounded-full p-1"
      onClick={onClose}
    />
  </div>
);