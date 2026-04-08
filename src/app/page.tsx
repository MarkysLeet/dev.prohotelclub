import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { Hotel, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="flex-1 w-full flex justify-center">
      <div className="w-full max-w-7xl px-6 py-24 flex flex-col gap-16 animate-fade-in" style={{ animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', animationDuration: '700ms' }}>
        <header className="flex flex-col gap-4">
          <Badge className="w-fit">UI Kit</Badge>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Atomic Components</h1>
          <p className="text-text-secondary max-w-2xl text-lg">
            A showcase of the foundational UI elements for the ProHotelClub platform, designed with the Quiet Luxury aesthetic.
          </p>
        </header>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">Buttons</h2>
            <p className="text-text-secondary text-sm">Interactive elements with 150-200ms transition times.</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center bg-surface p-8 rounded-xl shadow-sm">
            <Button>
              Primary Button
            </Button>
            <Button>
              <Hotel size={18} className="mr-2 stroke-[1.5px]" />
              With Icon
            </Button>
            <Button variant="outline">
              Outline Button
            </Button>
            <Button variant="ghost">
              Ghost Button
            </Button>
            <Button size="icon">
              <ArrowRight size={20} className="stroke-[1.5px]" />
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">Inputs</h2>
            <p className="text-text-secondary text-sm">Form controls with clean, subtle focus states.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface p-8 rounded-xl shadow-sm">
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-sm font-medium">Email address</label>
              <Input id="email" type="email" placeholder="agent@example.com" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="disabled" className="text-sm font-medium">Disabled input</label>
              <Input id="disabled" disabled placeholder="Not accessible" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">Badges</h2>
            <p className="text-text-secondary text-sm">Small status indicators and tags.</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center bg-surface p-8 rounded-xl shadow-sm">
            <Badge>New Arrival</Badge>
            <Badge variant="secondary">Premium</Badge>
            <Badge variant="outline">Draft</Badge>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">Skeletons</h2>
            <p className="text-text-secondary text-sm">Loading states with subtle pulse animation.</p>
          </div>
          <div className="flex flex-col gap-6 bg-surface p-8 rounded-xl shadow-sm w-full md:w-1/2">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
          </div>
        </section>
      </div>
    </main>
  )
}
