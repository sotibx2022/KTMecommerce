import {
  faUser,
  faBox,
  faHeart,
  faCartShopping,
  faStar,
  faBell,
  faGear,
  faRightFromBracket, // ✅ Logout icon
} from '@fortawesome/free-solid-svg-icons';
export const userOptions = [
  { title: "Profile", href: "/dashboard/profile", icon: faUser },
  { title: "Orders", href: "/dashboard/orders", icon: faBox },
  { title: "Wishlist", href: "/dashboard/wishlist", icon: faHeart },
  { title: "Cart", href: "/dashboard/cart", icon: faCartShopping },
  { title: "Reviews", href: "/dashboard/reviews", icon: faStar },
  { title: "Notifications", href: "/dashboard/notifications", icon: faBell },
  { title: "Settings", href: "/dashboard/settings", icon: faGear },
];
