import Link from "next/link";
import { navigationLinks } from "@/app/data/navigationLinks";
export const QuickLinks = () => (
  <div className="grid grid-cols-4 gap-2">
    {navigationLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="bg-primaryLight hover:bg-primaryDark text-background rounded-md py-2 px-4 text-center transition-colors"
      >
        {link.text}
      </Link>
    ))}
  </div>
);