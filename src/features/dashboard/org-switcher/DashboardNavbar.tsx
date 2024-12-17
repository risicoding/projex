import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Bell, UserIcon } from 'lucide-react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className="flex flex-row pl-4 pr-2 w-full  gap-3 justify-between">
      <Image className="select-none" src="/logo.svg" width={40} height={40} alt="logo" />
      <div className="flex flex-row gap-4 ">
        <div className="flex flex-row items-center gap-3">
          <Bell className="size-5 text-gray-300" />
          <UserIcon className="size-5 text-gray-300" />
        </div>
        <OrganizationSwitcher
          afterSelectOrganizationUrl="/org/:id"
          afterCreateOrganizationUrl="/org/id"
        />
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
