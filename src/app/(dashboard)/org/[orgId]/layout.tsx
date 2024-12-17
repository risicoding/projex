import React from 'react'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import OrgSwitcher from '@/features/dashboard/org-switcher/OrgSwitcher'
import Sidebar from '@/features/dashboard/sidebar/Sidebar'
import MobileSidebar from '@/features/dashboard/sidebar/MobileSidebar'
import Navbar from '@/features/dashboard/org-switcher/DashboardNavbar'

const OrgLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        <OrgSwitcher>
          <div className="flex flex-col">
            <div className="flex pt-4 px-4 w-full h-full">
              {/* Desktop Sidebar */}
              <div className="fixed h-full w-[260px]  top-0 left-0 hidden md:block">
                <Sidebar />
              </div>
              {/* Mobile sidebar */}
              <div className="md:hidden">
                <MobileSidebar />
              </div>

              <Navbar />
            </div>
            <div className="md:pl-[260px]">{children}</div>
          </div>
        </OrgSwitcher>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default OrgLayout
