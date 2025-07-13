import { NotificationModel } from "@/models/notification.model";
export const createNotifications = async (wishersId: string,
    currentUserName: string,
    productName: string,
    userId: string,
    wishersFullName: String) => {
    await NotificationModel.create({
        userId: wishersId,
        title: "Public Wishlist Action",
        description: `${currentUserName} added ${productName} from your public wishlist to his cart`,
        category: "PublicWishList",
        read: false,
    });
    await NotificationModel.create({
        userId: userId,
        title: "Public Wishlist Action",
        description: `You added ${productName} from ${wishersFullName}'s public wishlist to your cart`,
        category: 'PublicWishList',
        read: false
    });
}
