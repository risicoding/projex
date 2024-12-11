import { cn } from "@/lib/utils";
import { Folder, Users, BarChart2 } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

const Features = () => {
  const featuresData = [
    {
      icon: <Folder className="h-12 w-12 text-blue-400" />,
      heading: "Organize",
      description:
        "Simplify your workflow with tools to manage tasks, deadlines, and priorities effortlessly.",
    },
    {
      icon: <Users className="h-12 w-12 text-green-400" />,
      heading: "Collaborate",
      description:
        "Work seamlessly with your team using shared boards, real-time updates, and streamlined communication.",
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-purple-400" />,
      heading: "Track Progress",
      description:
        "Monitor timelines, measure performance, and keep your projects on track with detailed analytics.",
    },
  ];

  return (
    <section className="px-8 py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <FeaturesCard
            key={index}
            icon={feature.icon}
            heading={feature.heading}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

const FeaturesCard = ({
  icon,
  heading,
  description,
  className,
}: {
  icon: React.ReactNode;
  heading: string;
  description: string;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "p-8 rounded-lg shadow-md outline-neutral-50 outline-4 bg-black flex flex-col items-start space-y-4 hover:shadow-lg transition-shadow duration-300",
        className,
      )}
    >
      <CardHeader className="p-0 space-y-4">
        <div className="h-12 w-12">{icon}</div>
        <h3 className="text-xl font-semibold">{heading}</h3>
      </CardHeader>
      <p className="text-sm text-gray-400">{description}</p>
    </Card>
  );
};

export default Features;
