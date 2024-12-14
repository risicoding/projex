import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import AppSidebar from "./(sidebar)/_components/AppSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
          <AppSidebar>
          {children}
        </AppSidebar>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default DashboardLayout;
