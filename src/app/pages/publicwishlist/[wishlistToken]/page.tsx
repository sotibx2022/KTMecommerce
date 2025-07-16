import { config } from "@/config/configuration";
import PublicWishlistLayout from "./PublicWishlistLayout";
import { APIResponseSuccess } from "@/app/services/queryFunctions/users";
interface IWishListItem {
  url: string,
  alt: string,
}
interface IMinimalWishListDetails {
  message: string,
  data: {
    count: number,
    userName: string,
    profileImage?: string,
    wishlistDetails: IWishListItem[]
  }
}
const fetchMinimumWishlistDetails = async (wishlistCollectionToken: string): Promise<APIResponseSuccess<IMinimalWishListDetails>> => {
  const response = await fetch(`${config.websiteUrl}/api/wishList/publicwishlists/minimalWishlistDetails/${wishlistCollectionToken}`);
  return response.json()
}
export const generateMetadata = async ({
  searchParams
}: {
  searchParams: { wishlistCollectionToken?: string }
}) => {
  const { wishlistCollectionToken } = await searchParams
  if (wishlistCollectionToken) {
    let { message, data } = await fetchMinimumWishlistDetails(wishlistCollectionToken!)
    return {
      title: message,
      description: "This is public wishlist page",
      openGraph: {
        title: `Wishlist Items For ${data?.data.userName}`,
        description: `${data?.data.count === 0
          ? `${data.data.userName}'s Shared Wishlist is empty`
          : `${data?.data.userName}'s Shared Wishlist has ${data?.data.count} ${data?.data.count === 1 ? 'item' : 'items'}`
          }`,
        url: `http://localhost:3000/pages/publicwishlist/token?wishlistCollectionToken=${wishlistCollectionToken}`,
        images: data?.data.wishlistDetails,
        type: 'website',
        siteName: 'ecommerceKTM'
      }
    };
  } else {
    return {
      title: "nothing found",
      description: "This is public wishlist page"
    };
  }
};
export default async function Page({ searchParams }: { searchParams: { wishlistCollectionToken?: string } }) {
  const { wishlistCollectionToken } = await searchParams
  return (
    <div>
      <PublicWishlistLayout />
    </div>
  );
}