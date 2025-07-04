"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react';
import DeleteUser from './DeleteUser';
const DeleteUserAccount = () => {
    const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
    return (
        <div className="">
            <h2 className="text-xl font-semibold mb-4 text-primaryDark">Delete Account</h2>
            <p className="mb-6" >
                This action cannot be undone. All your data will be permanently removed.
            </p>
            <Button variant={'destructive'}
                onClick={() => setVisibleComponent('deleteUser')}
            >
                Delete Account
            </Button>
            {visibleComponent === 'deleteUser' && (
                <DeleteUser />
            )}
        </div>
    );
};
export default DeleteUserAccount;