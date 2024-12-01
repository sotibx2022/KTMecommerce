interface PrimaryButton{
    searchText:string
}
const PrimaryButton:React.FC<PrimaryButton> = ({searchText}) => {
  return (
        <div className='py-6 text-white border-2  border-primaryDark relative cursor-pointer w-[100px]'>
      <div className='absolute top-[5px] left-[5px]  w-full h-full bg-primaryDark transition-all duration-500 hover:top-0 hover:left-0 flex justify-center items-center cursor-pointer'>{searchText}</div>
    </div>
  )
}
export default PrimaryButton