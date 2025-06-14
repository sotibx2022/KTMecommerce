"use client";
interface PrimaryButtonProps {
  searchText: string;
  onClick?: () => void;
  disabled?: boolean;
  theme?:string
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  searchText, 
  onClick, 
  disabled,
  theme
}) => {
  const themeClasses = theme === "light" 
    ? "bg-background border-background text-primaryDak"
    : "bg-primaryDark border-primaryDark text-background"
  return (
    <button
      type="submit"
      className={`group py-6 border-2 border-primaryLight rounded-lg bg-transparent relative w-[110px] p-0 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${themeClasses}`} // Apply theme classes
      onClick={onClick}
      disabled={disabled}
    >
      <div className={`absolute top-[5px] left-[5px] w-full rounded-lg h-full ${theme==="light"?"":"bg-primaryLight flex justify-center items-center"}
      group-hover:top-0 group-hover:left-0 duration-300`}>
        {searchText}
      </div>
    </button>
  );
};
export default PrimaryButton;