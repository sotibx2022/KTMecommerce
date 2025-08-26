"use client"
interface NotificationDatatoUpdate {
  notificationId: string,
  readValue: boolean,
}
import React, { useState } from 'react';
import { Bell, Mail, MailOpen, Trash } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { INotificationDisplay } from '@/app/types/notifications';
import axios, { AxiosError } from 'axios';
import { formatDistanceToNow } from 'date-fns';
import SkeletonNotifications from './SkeletonNotifications';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import NoData from '@/app/_components/noData/NoData';
const NotificationPage = () => {
  const [isNotificationUpdating, setIsNotificationUpdating] = useState(false);
  const [unread, setUnread] = useState(true);
  const [hoveredNotificationId, setHoveredNotificationId] = useState<number | null>(null);
  const [isDeleteSettled, setIsDeleteSettled] = useState(true);
  const [isUpdateSettled, setIsUpdateSettled] = useState(true);
  const queryClient = useQueryClient();
  const getAllNotifications = async (): Promise<APIResponseSuccess<INotificationDisplay[]> | APIResponseError> => {
    try {
      const response = await axios.get('/api/notifications');
      return response.data;
    } catch (error) {
      return { message: "Error To get notifications", status: 400, success: false };
    }
  };
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
    mutationFn: async (params) => {
      setIsUpdateSettled(false);
      return await updateNotification(params);
    },
    onSuccess: async (data) => {
      if (data.success) {
        await queryClient.refetchQueries({
          queryKey: ['notifications'],
          exact: true,
        });
      } else {
        console.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
    },
    onSettled: () => {
      setIsUpdateSettled(true);
    }
  });
  const deleteNotification = useMutation({
    mutationFn: async (notificationId: string) => {
      setIsDeleteSettled(false);
      const response = await axios.delete(`/api/notifications/${notificationId}`);
      return response.data;
    },
    onSuccess: async () => {
      toast.success("Notification Deleted Successfully");
      await queryClient.refetchQueries({
        queryKey: ['notifications'],
        exact: true,
      });
    },
    onError: () => {
      toast.error("Notification Can't be Deleted.");
    },
    onSettled: () => {
      setIsDeleteSettled(true);
    }
  });
  const { data, isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: getAllNotifications
  });
  const notifications = data?.success ? data.data : [];
  const filteredNotifications = unread
    ? notifications?.filter(notification => !notification.read)
    : notifications?.filter(notification => notification.read);
  const calculateDuration = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
const unreadNotifications = notifications?.filter(n => !n.read) ?? [];
const readNotifications = notifications?.filter(n => n.read) ?? [];
  if (isPending || !isUpdateSettled || !isDeleteSettled) {
    return <SkeletonNotifications />;
  }
  return (
    <div className="p-4 w-full max-w-[400px]">
      <div className="notificationTitle flex flex-col mb-6">
        <div className="flex items-center justify-between w-full flex-col md:flex-row">
          <div className="flex items-center ">
            <Bell className="h-6 w-6 text-helper mr-2" />
            <h2 className="secondaryHeading">Notifications</h2>
          </div>
          <div className="notificationToggleArea flex gap-1">
            <div
              className={` flex items-center gap-1  text-primaryDark cursor-pointer hover:text-helper duration-300 ${unread ? 'text-helper' : 'text-primaryLight border-2 border-transparent border-b-primaryLight'
                }`}
              onClick={() => setUnread(false)}
            >
              <MailOpen className="h-5 w-5" />
              <h3 className="text-sm font-medium">Read</h3>
              <span>
                {readNotifications.length}
              </span>
            </div>
            <div
              className={` flex items-center gap-1  text-primaryDark cursor-pointer hover:text-helper duration-300 ${!unread ? 'text-helper' : 'text-primaryLight border-2 border-transparent border-b-primaryLight'
                }`}
              onClick={() => setUnread(true)}
            >
              <Mail className="h-5 w-5" />
              <h3 className="text-sm font-medium">Unread</h3>
              <span className=' '>
                {unreadNotifications.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Notification List */}
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
                      {calculateDuration(notification.createdAt.toString())}
                    </span>
                    {hoveredNotificationId === index && (
                      <motion.div
                        initial={{ top: "100%" }}
                        animate={{ top: 0 }}
                        exit={{ top: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute w-full h-[20px] bg-helper overflow-hidden left-0 flex justify-center items-center"
                      >
                        <div className="buttonCollections flex items-center gap-4">
                          <button
                            className='text-background'
                            onClick={() => changeNotificationReadMutation.mutate({
                              notificationId: notification._id.toString(),
                              readValue: notification.read
                            })}
                          >
                            {!notification.read ? "Mark Read" : "Mark UnRead"}
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteNotification.mutate(notification._id.toString())}
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <NoData
            icon={<Bell className="w-12 h-12 text-red-500" strokeWidth={1.5} />}
            notFoundMessage="No notifications found"
            buttonText="Browse"
            buttonLink="/catalog/advanceSearch?highlighted=none"
          />
        )}
      </div>
    </div>
  );
};
export default NotificationPage;