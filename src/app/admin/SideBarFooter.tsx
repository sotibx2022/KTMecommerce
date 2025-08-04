import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { User, LogOut } from 'lucide-react';
import React, { useEffect } from 'react';
import { useAdminUser } from '../hooks/queryHooks/useAdminUser';
import { useAdminDetails } from '../context/AdminDetailsContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import SideBarFooterSkeleton from '../_components/loadingComponent/SideBarFooterSkeleton';
import { useRouter } from 'next/navigation';
interface ISideBarFooterProps {
    sidebarThemeClass: string;
    shouldShowText: boolean;
    onClick: () => void;
    sidebarTextThemeClass: string;
}
const SideBarFooter: React.FC<ISideBarFooterProps> = ({
    sidebarThemeClass,
    shouldShowText,
    onClick,
    sidebarTextThemeClass,
}) => {
    const router = useRouter()
    const { data: adminUserData, isPending } = useAdminUser();
    console.log(adminUserData);
    const { setAdminDetails, adminDetails, setAdminDetailsLoading, adminDetailsLoading } = useAdminDetails();
    useEffect(() => {
        setAdminDetailsLoading(isPending)
        if (adminUserData) {
            setAdminDetails({
                adminFullName: adminUserData.adminFullName || 'N/A',
                adminUserEmail: adminUserData.adminEmail || 'N/A',
                adminRole: adminUserData.role || 'user',
                adminUserName: adminUserData.adminUserName || 'N/A'
            });
        }
    }, [adminUserData, setAdminDetails]);
    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/admin/validateAdmin/logoutAdmin', null);
            return response.data;
        }, onSuccess: (response) => {
            toast.success(response.message);
            setAdminDetails({
                adminFullName: "",
                adminUserEmail: "",
                adminRole: "",
                adminUserName: ""
            })
            router.push('/pages/validateAdmin')
        }
    })
    function logoutHandler(): void {
        logoutMutation.mutate()
    }
    return (
        <div>
            {adminDetailsLoading ? <SideBarFooterSkeleton shouldShowText={shouldShowText} /> :
                <SidebarFooter className={sidebarThemeClass}>
                    <SidebarMenu>
                        {/* Admin Profile Button */}
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip={shouldShowText ? undefined : "Admin Profile"}
                                className={`sidebarFooterButton ${sidebarThemeClass}`}
                                onClick={onClick}
                            >
                                <div className="w-8 h-8 rounded-full  bg-primaryLight text-primaryDark text-lg font-bold flex justify-center items-center">{adminDetails.adminFullName[0]}</div>
                                {shouldShowText && (
                                    <div className="sidebarFooterText">
                                        <span className="sidebarFooterTitle capitalize text-lg">
                                            {adminDetails.adminFullName}
                                        </span>
                                        <span className={sidebarTextThemeClass}>
                                            {adminDetails.adminRole}
                                        </span>
                                    </div>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {/* Logout Button */}
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip={shouldShowText ? undefined : "Logout"}
                                className={`sidebarFooterButton ${sidebarThemeClass}`}
                                onClick={logoutHandler}
                            >
                                <LogOut className="sidebarIcon" />
                                {shouldShowText && (
                                    <span className="sidebarFooterText">Logout</span>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            }
        </div>
    );
};
export default SideBarFooter;