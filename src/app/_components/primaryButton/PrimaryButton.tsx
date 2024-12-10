interface PrimaryButton {
  searchText: string;
}
const PrimaryButton: React.FC<PrimaryButton> = ({ searchText }) => {
  return (
    <button
      type="submit" // Setting the button type to "submit"
      className="py-6 text-white border-2 border-primaryDark relative cursor-pointer w-[100px] p-0" // Applying all previous styles to the button
    >
      <div className="absolute top-[5px] left-[5px] w-full h-full bg-primaryDark transition-all duration-500 hover:top-0 hover:left-0 flex justify-center items-center cursor-pointer">
        {searchText}
      </div>
    </button>
  );
};
export default PrimaryButton;
