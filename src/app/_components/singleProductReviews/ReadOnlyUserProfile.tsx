"use client";
import React, { useContext } from 'react';
import { User, UserCog, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
const ReadOnlyUserProfile = () => {
    const { userDetails } = useUserDetails();
    const hasProfileImage = Boolean(userDetails?.profileImage);
    const isGuest = !userDetails;
    const userNameInitial = userDetails?.fullName?.[0]?.toUpperCase() || 'G';
    return (
        <div className="bg-gradient-to-r from-primaryDark to-primaryLight text-background p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
                {/* Profile Image/Avatar */}
                <div className="relative">
                    {isGuest ? (
                        <div className="w-16 h-16 rounded-full bg-primaryLight flex items-center justify-center">
                            <User className="w-6 h-6 text-background" />
                        </div>
                    ) : hasProfileImage ? (
                        <img
                            src={userDetails.profileImage}
                            alt="User Profile"
                            className="w-16 h-16 rounded-full object-cover border-2 border-background"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-primaryDark text-xl font-bold">
                            {userNameInitial}
                        </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full">
                        {isGuest ? (
                            <UserCog className="w-4 h-4 text-gray-500" />
                        ) : (
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        )}
                    </div>
                </div>
                {/* User Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                            {isGuest ? 'Guest User' : userDetails.fullName || 'Unnamed User'}
                        </h3>
                    </div>
                    {!isGuest && (
                        <Badge variant="helper">
                            {userDetails.accountStatus}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ReadOnlyUserProfile;