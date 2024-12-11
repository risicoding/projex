import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col items-center ">
      <Navbar />
      {children}
    </div>
  );
};

export default MarketingLayout;
