"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLogout } from '@/app/hooks/queryHooks/useLogout';
import { AbsoluteComponent } from '@/app/_components/absoluteComponent/AbsoluteComponent';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
const DeleteUser = () => {
    const [confirmationText, setConfirmationText] = useState('');
    const { mutate: deleteUserMutation, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/deleteUser');
            return response.data
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const deleteHandler = () => {
        useLogout()
        deleteUserMutation()
    }
    return (
        <>
            <AbsoluteComponent>
                <div
                    className="p-6 rounded-lg max-w-md w-full"
                >
                    <h3 className="text-lg text-primaryDark" >
                        Confirm Account Deletion
                    </h3>
                    <p className="primaryParagraph" >
                        To confirm, please type <span className="font-bold">"delete my account"</span> below:
                    </p>
                    <input
                        type="text"
                        value={confirmationText}
                        disabled={isPending}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className="formItem"
                        placeholder="delete my account"
                    />
                    <Button variant={'destructive'}
                        className='mt-2'
                        onClick={deleteHandler}
                        disabled={confirmationText !== 'delete my account'}
                    >
                        {isPending ? 'Deleting...' : 'Delete Permanently'}
                    </Button>
                </div>
            </AbsoluteComponent>
            {isPending && <LoadingComponent />}
        </>
    )
}
export default DeleteUser