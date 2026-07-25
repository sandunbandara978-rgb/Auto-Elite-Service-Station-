import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Gauge, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { featuredBuilds, services, stats } from '../data/content';

export function HomePage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=80" alt="Modified luxury car in a tuning garage" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-silver">
              <Sparkles className="mr-2 h-4 w-4 text-accent" /> Elite Automotive Atelier
            </div>
            <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">Transform Your Ride.<br />Build Your Dream Machine.</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">Premium vehicle customization, performance upgrades, and automotive styling solutions for the most discerning drivers.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-red-700">Start Your Build</a>
              <a href="/services" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">Book Consultation</a>
            </div>
          </motion.div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.25em] text-silver">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <SectionHeader eyebrow="Vehicle Showcase" title="Signature Builds" description="Luxury performance crafted to turn every detail into a statement." />
          <a href="/builds" className="text-sm font-semibold text-silver hover:text-white">View All Builds</a>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredBuilds.map((build, index) => (
            <motion.article key={build.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="overflow-hidden rounded-3xl border border-white/10 bg-carbon/80 shadow-premium">
              <img src={build.image} alt={build.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{build.category}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{build.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {build.mods.map((mod) => <li key={mod} className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-accent" />{mod}</li>)}
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-semibold text-white">{build.price}</span>
                  <a href="/builds" className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-silver hover:text-white">View Details</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-carbon to-black p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Why ModiDrive</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Crafted for performance, precision, and presence.</h2>
              <p className="mt-4 max-w-xl text-lg text-slate-300">From bespoke bodywork to dyno-tuned power, our atelier delivers luxury-level craftsmanship for every build.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Gauge className="h-8 w-8 text-accent" />
                  <h3 className="mt-3 text-lg font-semibold">Performance First</h3>
                  <p className="mt-2 text-sm text-slate-300">Advanced tuning architecture and premium hardware.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="h-8 w-8 text-accent" />
                  <h3 className="mt-3 text-lg font-semibold">Warranty Protected</h3>
                  <p className="mt-2 text-sm text-slate-300">Every installation is executed to the highest standard.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Wrench className="h-8 w-8 text-accent" />
                  <h3 className="mt-3 text-lg font-semibold">Factory-Level Finish</h3>
                  <p className="mt-2 text-sm text-slate-300">Perfect paint, trim, and detailing every time.</p>
                </div>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80" alt="Mechanic working in a premium garage" className="h-full min-h-[420px] rounded-[1.5rem] object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}

export function BuildsPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Vehicle Builds" title="Curated automotive masterpieces." description="Explore our catalog of performance icons, luxury statements, and JDM legends." />
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredBuilds.map((build) => (
            <div key={build.title} className="overflow-hidden rounded-3xl border border-white/10 bg-carbon/80">
              <img src={build.image} alt={build.title} className="h-60 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{build.category}</p>
                <h2 className="mt-2 text-2xl font-semibold">{build.title}</h2>
                <p className="mt-3 text-sm text-slate-300">Widebody styling, carbon fiber detailing, and high-performance tuning delivered in one package.</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold">{build.price}</span>
                  <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-silver">Request Quote</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Services" title="Luxury care for every build." description="From wraps to engine upgrades, our team delivers turnkey customization with premium finish quality." />
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="overflow-hidden rounded-3xl border border-white/10 bg-carbon/80">
              <img src={service.image} alt={service.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm text-slate-300">{service.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold text-accent">{service.price}</span>
                  <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold">Book Service</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StorePage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Modification Store" title="Performance parts for serious builds." />
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">Search • Filters • Wishlist • Checkout</div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="overflow-hidden rounded-3xl border border-white/10 bg-carbon/80">
              <img src={service.image} alt={service.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Performance Parts</p>
                <h2 className="mt-2 text-2xl font-semibold">{service.title}</h2>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold">{service.price}</span>
                  <button className="rounded-full border border-white/10 px-4 py-2 text-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GalleryPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Gallery" title="Before & after transformations." description="See the evolution from stock to statement." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-carbon/80">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" alt="Before stock car" className="h-72 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold">BMW M4</h2>
              <p className="mt-3 text-slate-300">Stock vehicle before transformation into a wide-body sculptural build.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-carbon/80">
            <img src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80" alt="After modified car" className="h-72 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold">BMW M4 — Widebody Edition</h2>
              <p className="mt-3 text-slate-300">Carbon fiber aero, custom wheels, and aggressive stance complete the transformation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80" alt="Workshop environment" className="h-full min-h-[420px] rounded-[2rem] object-cover" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">About ModiDrive</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">The atelier redefining modern automotive expression.</h1>
            <p className="mt-4 text-lg text-slate-300">We blend engineering discipline, design sensibility, and luxury execution to turn every vehicle into a statement.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-semibold">Design-Led Builds</h3>
                <p className="mt-2 text-sm text-slate-300">Every exterior and interior detail is curated for balance and impact.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-semibold">Performance Engineering</h3>
                <p className="mt-2 text-sm text-slate-300">Packages are built with drivability, safety, and long-term reliability in mind.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Contact</p>
              <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Start your next build.</h1>
              <p className="mt-4 text-lg text-slate-300">Consult with our team about a full transformation, performance-only upgrade, or custom interior design.</p>
              <div className="mt-8 space-y-4 text-slate-300">
                <p>sandunbandara978@gmail.com</p>
                <p>0703735156</p>
                <p>100 Apex Boulevard, Cinnamon Gardens, Colombo 07, Sri Lanka</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-6">
              <div className="grid gap-4">
                <input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Name" />
                <input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Email" />
                <input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Vehicle" />
                <textarea className="min-h-[150px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Tell us about your vision" />
                <button className="rounded-full bg-accent px-5 py-3 font-semibold">Book Consultation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
