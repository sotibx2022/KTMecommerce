"use client"
interface PrimaryButton {
  searchText: string;
  onClick?:()=>void;
}
const PrimaryButton: React.FC<PrimaryButton> = ({ searchText,onClick }) => {
  return (
    <button type="submit"
      className="py-6 text-white border-2 border-primaryDark relative cursor-pointer w-[100px] p-0" // Applying all previous styles to the button
      onClick={onClick}
    >
      <div className="absolute top-[5px] left-[5px] w-full h-full bg-primaryDark transition-all duration-500 hover:top-0 hover:left-0 flex justify-center items-center cursor-pointer">
        {searchText}
      </div>
    </button>
  );
};
export default PrimaryButton;
