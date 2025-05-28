import Link from "next/link";
import { navigationLinks } from "@/app/data/navigationLinks";
export const QuickLinks = () => (
  <>
  <h3 className="text-lg font-semibold mb-3 text-primaryDark">Quick Links</h3>
  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
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
  </>
);