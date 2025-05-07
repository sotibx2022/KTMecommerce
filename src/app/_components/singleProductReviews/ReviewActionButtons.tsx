"use client"
import { DisplayContext } from '@/app/context/DisplayComponents'
import React, { useContext, useEffect, useState } from 'react'
import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation'
import axios from 'axios';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSpecificReview } from '@/app/services/queryFunctions/remarks';
import toast from 'react-hot-toast';
import LoadingComponent from '../loadingComponent/LoadingContainer';
import AddSingleProductReviews from './AddSingleProductReviews';
import EditSingleProductReview from './EditSingleProductReview';
import { IProductIdentifier } from '@/app/types/remarks';
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
    const mutation = useMutation({mutationFn:deleteSpecificReview,onSuccess:(response)=>{
      toast.success(response.message);
      setVisibleComponent('')
    },onError:(error)=>{
      toast.error(error.message)
    }})
    const user = useContext(UserDetailsContext);
    const userEmail = user!.userDetails!.email
    function handleEditReview(): void {
        setVisibleComponent('editReview');
    }
    const deleteReview=() =>{
      setVisibleComponent('dilaugeBox');
    }
    useEffect(()=>{
      if(deleteConfirmation){
        const datasToDelete = {productId,userEmail}
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
    <button
      onClick={deleteReview}
      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
      aria-label="Delete review"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
    {visibleComponent ==='dilaugeBox' && <DeleteConfirmation message='Are you Sure to Delete the Review' returnConfirmValue={getConfirmValue} loading={mutation.isPending}/>}
    {visibleComponent ==='editReview' && <EditSingleProductReview productIdentifier={productIdentifier}/>}
  </div>
  )
}
export default ReviewActionButtons