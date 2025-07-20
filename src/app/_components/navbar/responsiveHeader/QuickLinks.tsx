"use client";
import { navigationLinks } from "@/app/data/navigationLinks";
import { useContext } from "react";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { useRouter } from "next/navigation";
export const QuickLinks = () => {
  const { setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  return (
    <>
      <h3 className="text-lg font-semibold mb-3 text-primaryDark">Quick Links</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {navigationLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => {
              router.push(`/${link.href}`);
              setVisibleComponent("");
            }}
            className="bg-primaryLight hover:bg-primaryDark text-background rounded-md py-2 px-4 text-center transition-colors"
          >
            {link.text}
          </button>
        ))}
      </div>
    </>
  );
};
