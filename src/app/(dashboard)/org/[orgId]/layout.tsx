import React from "react";
import OrgSwitcher from "./_components/OrgSwitcher";
import { SignedIn } from "@clerk/nextjs";
import Sidebar from "./_components/Sidebar";
import MobileSidebar from "./_components/MobileSidebar";
import Navbar from "./_components/Navbar";

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
    </>
  );
};

export default OrgLayout;
