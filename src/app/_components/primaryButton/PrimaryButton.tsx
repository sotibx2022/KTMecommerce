"use client";
interface PrimaryButtonProps {
  searchText: string;
  onClick?: () => void;
  disabled?: boolean; // Added optional `disabled` prop
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ searchText, onClick, disabled }) => {
  return (
    <button
      type="submit"
      className={`py-6 text-white border-2 border-primaryDark relative w-[100px] p-0 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`} // Apply styles conditionally for the disabled state
      onClick={onClick}
      disabled={disabled} // Bind `disabled` to the button
    >
      <div className="absolute top-[5px] left-[5px] w-full h-full bg-primaryDark transition-all duration-500 hover:top-0 hover:left-0 flex justify-center items-center">
        {searchText}
      </div>
    </button>
  );
};
export default PrimaryButton;
