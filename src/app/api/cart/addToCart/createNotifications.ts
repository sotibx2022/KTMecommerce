import { NotificationModel } from "@/models/notification.model";
export const createNotifications = async (wishersId: string,
    currentUserName: string,
    itemsLength: number,
    userId: string,
    wishersFullName: String) => {
    await NotificationModel.create({
        userId: wishersId,
        title: "Public Wishlist Action",
        description: `${currentUserName} added ${itemsLength} item(s) from your public wishlist to their cart`,
        category: "PublicWishList",
        read: false,
    });
    await NotificationModel.create({
        userId: userId,
        title: "Public Wishlist Action",
        description: `You added ${itemsLength} item(s) from ${wishersFullName}'s public wishlist to your cart`,
        category: 'PublicWishList',
        read: false
    });
}
