"use client"
interface NotificationDatatoUpdate {
  notificationId: string,
  readValue: boolean,
}
import React, { useState } from 'react';
import { Bell, Mail, MailOpen } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { INotificationDisplay } from '@/app/types/notifications';
import axios, { AxiosError } from 'axios';
import { formatDistanceToNow } from 'date-fns';
import SkeletonNotifications from './SkeletonNotifications';
import { motion } from 'framer-motion';
const NotificationPage = () => {
  const [isNotificationUpdating,setIsNotificationUpdating] = useState(false);
  const queryClient = useQueryClient()
  const [unread, setUnread] = useState(true);
  const [hoveredNotificationId, setHoveredNotificationId] = useState<number | null>(null);
  const getAllNotifications = async (): Promise<APIResponseSuccess<INotificationDisplay[]> | APIResponseError> => {
    try {
      const response = await axios.get('/api/notifications');
      return response.data;
    } catch (error) {
      return { message: "Error To get notifications", status: 400, success: false };
    }
  };
  const { data, isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: getAllNotifications
  });
  const calculateDuration = (date: Date) => formatDistanceToNow(date, { addSuffix: true });
  const notifications = data?.success ? data.data : [];
  const filteredNotifications = unread
    ? notifications?.filter(notification => !notification.read)
    : notifications?.filter(notification => notification.read);
 const updateNotification = async ({ notificationId, readValue }: NotificationDatatoUpdate): Promise<APIResponseSuccess | APIResponseError> => {
  try {
    setIsNotificationUpdating(true)
    const response = await axios.post(`/api/notifications/${notificationId}`, { 
      read: !readValue // Toggle the read status
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update notification",
        status: error.response?.status || 500
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
      status: 500
    };
  }
};
const changeNotificationReadMutation = useMutation<
  APIResponseSuccess | APIResponseError,
  AxiosError,
  NotificationDatatoUpdate
>({
  mutationFn: updateNotification,
  onSuccess: (data) => {
    if (data.success) {
      queryClient.invalidateQueries({ 
        queryKey: ['notifications'],
        refetchType: 'active'
      });
      setIsNotificationUpdating(false);
    } else {
setIsNotificationUpdating(false);
      console.error(data.message);
    }
  },
  onError: (error) => {
    console.error("Mutation error:", error.message);
    // Optionally show a toast notification
  }
});
 if (isPending || isNotificationUpdating) {
    return <SkeletonNotifications />;
  }
  return (
    <div className="max-w-2xl mx-auto p-4 w-[400px]">
      <div className="notificationTitle flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-helper mr-2" />
          <h1 className="text-2xl font-bold text-primaryDark">Notifications</h1>
        </div>
        <div className="notificationToggleArea flex items-center gap-6">
          {unread ? (
            <div
              className="flex items-center gap-2 border border-helper p-2 rounded-lg text-primaryDark cursor-pointer hover:bg-helper hover:text-background duration-300"
              onClick={() => setUnread(!unread)}
            >
              <MailOpen className="h-5 w-5" />
              <h3 className="text-sm font-medium">Read</h3>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 border border-helper p-2 rounded-lg text-primaryDark cursor-pointer hover:bg-helper hover:text-background duration-300"
              onClick={() => setUnread(!unread)}
            >
              <Mail className="h-5 w-5" />
              <h3 className="text-sm font-medium">Unread</h3>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {filteredNotifications && filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={index}
              className="relative p-4 rounded-lg border cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredNotificationId(index)}
              onMouseLeave={() => setHoveredNotificationId(null)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primaryDark">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-primaryLight">
                    {notification.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-primaryLight">
                      {calculateDuration(notification.createdAt)}
                    </span>
                    {hoveredNotificationId === index &&
                      <motion.div
                        initial={{ top: "100%" }}
                        animate={{ top: 0 }}
                        exit={{ top: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute w-full h-[20px] bg-helper overflow-hidden left-0 flex justify-center items-center">
                        <button className='text-background'
                          onClick={() => changeNotificationReadMutation.mutate({
                            notificationId: notification._id.toString(),
                            readValue: notification.read
                          })}
                        > {!notification.read ? "Mark Read" : "Mark UnRead"}
                        </button>
                      </motion.div>
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-primaryLight">
            <h1>There are no notifications</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default NotificationPage;