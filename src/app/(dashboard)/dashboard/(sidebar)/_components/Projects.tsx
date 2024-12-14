import {
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
const Projects = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex flex-row justify-between">
        <h3>Projects</h3>
        <div className="bg-gray-800 rounded-md  p-1">
          <Plus className="size-4" />
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="p-2">
          <SidebarMenuItem className="bg-gray-700 rounded-md ">
            <SidebarMenuButton className="flex flex-row justify-between">
              <p>Project 1</p>
              <ArrowRight/>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Projects;
