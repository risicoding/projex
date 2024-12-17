import { cn } from '@/lib/utils'
import { Open_Sans } from 'next/font/google'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const opensans = Open_Sans({
  weight: '300',
  subsets: ['latin'],
})

const ContactUs = () => {
  return (
    <section className="flex flex-col items-center justify-center px-8 py-20 bg-black rounded-xl shadow-lg">
      <h2 className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-500 animate-in fade-in duration-700 mb-8">
        Get in Touch with Us
      </h2>
      <p className={cn('text-lg text-center text-neutral-400 mb-8', opensans.className)}>
        Have any questions or feedback? We’d love to hear from you. Fill out the form below to reach
        out.
      </p>
      <form className="space-y-6 w-full max-w-3xl bg-black p-8 rounded-lg shadow-md border border-neutral-700">
        <div className="flex flex-col  gap-2">
          <label htmlFor="email" className="block text-lg font-medium text-gray-300">
            Email Address
          </label>
          <Input id="email" type="email" placeholder="Your email" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="block text-lg font-medium text-gray-300">
            Message
          </label>
          <Textarea id="message" placeholder="Your message" />
        </div>

        <div className="flex justify-center">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full max-w-lg">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-md font-medium text-white backdrop-blur-3xl">
              Submit
            </span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default ContactUs
