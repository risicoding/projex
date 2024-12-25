import { cn } from '@/lib/utils';
import { Open_Sans } from 'next/font/google';
const opensans = Open_Sans({
  weight: '300',
  subsets: ['latin'],
});

const CtaSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-20">
      <h2 className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-500 animate-in fade-in duration-700 mb-6">
        Ready to take control of your projects?
      </h2>
      <p className={cn('text-lg text-center text-neutral-400 mb-6', opensans.className)}>
        Projex streamlines your workflow, so you can focus on what truly matters.
      </p>
      <div className="flex gap-4">
        <a
          href="#get-started" // Use a link or route for the action
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-md font-medium text-white backdrop-blur-3xl">
            Get Started
          </span>
        </a>
        <a
          href="#learn-more" // Use a link or route for the action
          className="inline-flex items-center justify-center px-6 py-2 border-2 border-neutral-300 text-neutral-300 font-medium rounded-full bg-transparent hover:bg-neutral-800 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
