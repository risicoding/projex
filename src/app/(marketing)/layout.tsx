import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="h-full w-full flex flex-col items-center ">
      <div className="max-w-3xl">

      <Navbar />
      {children}
      </div>
    </div>
  );
};

export default MarketingLayout;
