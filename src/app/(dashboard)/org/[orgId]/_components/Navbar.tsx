import { OrganizationSwitcher, UserButton  } from "@clerk/nextjs";
import { Bell, UserIcon } from "lucide-react";
const Navbar = () => {
  return (
    <div className="flex flex-row w-full  gap-3 justify-end">
      <div className="flex flex-row items-center gap-3">
        <Bell className="size-5 text-gray-300"/>
        <UserIcon className="size-5 text-gray-300"/>
      </div>
      <OrganizationSwitcher />
      <UserButton />
    </div>
  );
};

export default Navbar;
