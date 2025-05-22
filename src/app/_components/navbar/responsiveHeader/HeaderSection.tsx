import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export const HeaderSection = ({ onClose }: { onClose: () => void }) => (
  <div className="flex justify-between items-center">
    <Link href="/">
      <img 
        src="../assets/brand/logo.png" 
        alt="Logo"
        className="h-12 w-auto" 
      />
    </Link>
    <div className="w-[40px] h-[40px] bg-helper flex justify-center items-center rounded-full">
      <FontAwesomeIcon
      icon={faTimes}
      size="xl"
      className="text-background cursor-pointer"
      onClick={onClose}
    />
    </div>
  </div>
);