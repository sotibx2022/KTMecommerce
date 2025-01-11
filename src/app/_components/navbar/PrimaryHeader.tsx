"use client";
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LinkComponent from '../linkComponent/LinkComponent';
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import NonRegisteredUsersOption from './NonRegisteredUsersOption';
import useLogout from '@/app/services/apiFunctions/logoutUser';
interface PrimaryHeader {
  classStyles?: string;
  classStyles2?: string;
}
const links = [
  { href: "/", text: "Home" },
  { href: "/pages/careers", text: "Careers" },
  { href: "/pages/help", text: "Help" },
  { href: "/pages/terms", text: "Terms" },
  { href: "/pages/contact", text: "Contact Us" },
];
const PrimaryHeader: React.FC<PrimaryHeader> = ({ classStyles, classStyles2 }) => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  const { setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  const handleDashboardClick = () => {
    router.push("/account");
  };
const logout = useLogout()
  return (
    <div className="wrapper flex">
      <nav className={classStyles}>
        <ul className="flex flex-wrap">
          {links.map((link, index) => (
            <li
              className="text-primaryDark list-none bg-primaryLight p-2 m-2 text-white"
              key={index}
            >
              <LinkComponent href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
        <div className="flex items-center h-[2rem] w-[20%] gap-2">
          <div className="flex items-center h-[2rem] w-auto gap-2">
            {userDetails ? (
              <>
              <SecondaryButton text="Account" onClick={handleDashboardClick} />
              <SecondaryButton text="LogOut" onClick={logout.mutate} />
              </>
            ) : (
              <NonRegisteredUsersOption />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default PrimaryHeader;
