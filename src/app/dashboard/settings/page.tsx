import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpdatePassword from './DashboardSettingComponents/UpdatePassword';
import UpdateDeliveryDetails from './DashboardSettingComponents/UpdateDeliveryDetails';
import DeleteUserAccount from './DashboardSettingComponents/DeleteUserAccount';
const SettingsPage = () => {
  return (
    <div className="max-w-[500px]">
      <h2 className="secondaryHeading">Account Settings</h2>
      <Tabs defaultValue="delivery" className="w-full">
        <TabsList className="grid w-full max-w-[300px] grid-cols-3">
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery">
          <UpdateDeliveryDetails />
        </TabsContent>
        <TabsContent value="password" className="mt-6 p-6">
          <UpdatePassword />
        </TabsContent>
        <TabsContent value="account" className="mt-6 p-6">
          <DeleteUserAccount />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default SettingsPage;