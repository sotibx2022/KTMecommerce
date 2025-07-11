"use client"
import { DisplayContext } from '@/app/context/DisplayComponents'
import React, { useContext, useEffect, useState } from 'react'
import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation'
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import EditSingleProductReview from './EditSingleProductReview';
import { IProductIdentifier } from '@/app/types/remarks';
import useReviewDelete from '@/app/hooks/queryHooks/useMutation/useReviewDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
interface ReviewActionButtonsProps{
  productIdentifier:IProductIdentifier
}
const ReviewActionButtons:React.FC<ReviewActionButtonsProps> = ({productIdentifier}) => {
  const {productId,productName,productImage} = productIdentifier;
  const[deleteConfirmation,setDeleteConfirmation] = useState(false)
    const {visibleComponent,setVisibleComponent} =useContext(DisplayContext);
    const getConfirmValue =(value:boolean)=>{
      setDeleteConfirmation(value);
    }
    const user = useContext(UserDetailsContext);
    const userId = user!.userDetails!._id;
const mutation = useReviewDelete(userId,productId)
    function handleEditReview(): void {
        setVisibleComponent('editReview');
    }
    const deleteReview=() =>{
      setVisibleComponent('dilaugeBox');
    }
    useEffect(()=>{
      if(deleteConfirmation){
        const datasToDelete = {userId,productId}
      mutation.mutate(datasToDelete);
      }
    },[deleteConfirmation])
  return (
   <div className="reviewActions flex gap-2 mt-2">
    <button
      onClick={() => handleEditReview()}
      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
      aria-label="Edit review"
    >
       <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
    </button>
    <button
      onClick={deleteReview}
      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
      aria-label="Delete review"
    >
      <FontAwesomeIcon icon={faTrashAlt} className="w-5 h-5" />
    </button>
    {visibleComponent ==='dilaugeBox' && <DeleteConfirmation message='Are you Sure to Delete the Review' returnConfirmValue={getConfirmValue} loading={mutation.isPending}/>}
    {visibleComponent ==='editReview' && <EditSingleProductReview productIdentifier={productIdentifier}/>}
  </div>
  )
}
export default ReviewActionButtons