import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { House,  Settings, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Projects from "./Projects";

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <Sidebar>
        <SidebarHeader>
          <div className="flex flex-row p-2 gap-3 items-center">
            <Image
              className="select-none"
              src="/logo.svg"
              width={40}
              height={40}
              alt="logo"
            />
            <h2 className="text-xl">Projex</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="overflow-clip">
            <SidebarGroupLabel>Dahboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div>
                      <House/>
                      <Link href="/dashboard">Home</Link>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div>
                      <UserIcon />
                      <Link href="/dashboard">Users</Link>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div>
                      <Settings />
                      <Link href="/dashboard">Settings</Link>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Projects />
        </SidebarContent>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
};

export default AppSidebar;
