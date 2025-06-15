"use client"
import React, { useContext } from 'react';
import { Bell, CheckCircle2, Truck, UserRound, Mail, MailCheck } from 'lucide-react';
import SecondaryButton from '@/app/_components/secondaryButton/SecondaryButton';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
const NotificationPage = () => {
  const context = useContext(UserDetailsContext)
console.log(context);
  const notifications = [
    {
      id: 1,
      type: 'account',
      title: 'Account Updated',
      description: 'Your profile information has been successfully updated.',
      time: '10 minutes ago',
      read: false,
      icon: <UserRound className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      type: 'email',
      title: 'No Emails',
      description: 'You have no unread emails in your inbox.',
      time: '1 hour ago',
      read: true,
      icon: <MailCheck className="h-5 w-5 text-gray-400" />
    },
    {
      id: 3,
      type: 'order',
      title: 'Order #12345 Shipped',
      description: 'Your shipment is on its way. Expected delivery: June 25, 2024.',
      time: '3 hours ago',
      read: false,
      icon: <Truck className="h-5 w-5 text-green-500" />,
      action: 'Track Order'
    }
  ];
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Bell className="h-6 w-6 text-helper mr-2" />
        <h1 className="text-2xl font-bold text-primaryDark">Notifications</h1>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-lg border text-primaryDark`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {notification.icon}
              </div>
              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-medium  text-primaryDark`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-primaryLight">
                  {notification.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-primaryLight">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationPage;