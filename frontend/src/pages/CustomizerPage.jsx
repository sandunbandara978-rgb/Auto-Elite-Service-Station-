import { useMemo, useState } from 'react';

const vehicleOptions = {
  brand: ['BMW', 'Nissan', 'Toyota', 'Mercedes', 'Porsche'],
  model: {
    BMW: ['M4', 'M3', 'X5 M'],
    Nissan: ['GT-R R35', '350Z'],
    Toyota: ['Supra MK5', 'GR86'],
    Mercedes: ['AMG GT', 'C63'],
    Porsche: ['911 Turbo S', 'Cayenne'],
  },
  years: ['2020', '2021', '2022', '2023', '2024', '2025'],
};

const exteriorOptions = ['Front bumper', 'Rear diffuser', 'Spoiler', 'Side skirts', 'Carbon fiber parts', 'Vinyl wrap'];
const wheelOptions = ['Alloy wheels', 'Wheel size', 'Tire type'];
const performanceOptions = ['Turbo upgrade', 'Exhaust system', 'ECU tuning', 'Suspension'];
const interiorOptions = ['Racing seats', 'Steering wheel', 'Ambient lighting'];

const priceMap = {
  'Front bumper': 1800,
  'Rear diffuser': 1400,
  'Spoiler': 1200,
  'Side skirts': 1600,
  'Carbon fiber parts': 2400,
  'Vinyl wrap': 2200,
  'Alloy wheels': 3400,
  'Wheel size': 900,
  'Tire type': 650,
  'Turbo upgrade': 5600,
  'Exhaust system': 2800,
  'ECU tuning': 3200,
  'Suspension': 2600,
  'Racing seats': 4100,
  'Steering wheel': 1800,
  'Ambient lighting': 1100,
};

export function CustomizerPage() {
  const [vehicle, setVehicle] = useState({ brand: 'BMW', model: 'M4', year: '2024' });
  const [selected, setSelected] = useState([]);

  const modelOptions = vehicleOptions.model[vehicle.brand] || [];

  const toggleOption = (option) => {
    setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const totalPrice = useMemo(() => selected.reduce((sum, option) => sum + priceMap[option], 0), [selected]);

  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">3D Vehicle Customizer</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Design your next build.</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Select your platform, refine the spec, and see the projected build cost instantly.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block">Brand</span>
                <select value={vehicle.brand} onChange={(e) => setVehicle({ ...vehicle, brand: e.target.value, model: vehicleOptions.model[e.target.value][0] })} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white">
                  {vehicleOptions.brand.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                </select>
              </label>
              <label className="text-sm text-slate-300">
                <span className="mb-2 block">Model</span>
                <select value={vehicle.model} onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white">
                  {modelOptions.map((model) => <option key={model} value={model}>{model}</option>)}
                </select>
              </label>
              <label className="text-sm text-slate-300 md:col-span-2">
                <span className="mb-2 block">Year</span>
                <select value={vehicle.year} onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white">
                  {vehicleOptions.years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              </label>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Exterior</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {exteriorOptions.map((option) => (
                    <button key={option} onClick={() => toggleOption(option)} className={`rounded-full border px-4 py-2 text-sm ${selected.includes(option) ? 'border-accent bg-accent/20 text-white' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Wheels</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {wheelOptions.map((option) => (
                    <button key={option} onClick={() => toggleOption(option)} className={`rounded-full border px-4 py-2 text-sm ${selected.includes(option) ? 'border-accent bg-accent/20 text-white' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Performance</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {performanceOptions.map((option) => (
                    <button key={option} onClick={() => toggleOption(option)} className={`rounded-full border px-4 py-2 text-sm ${selected.includes(option) ? 'border-accent bg-accent/20 text-white' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Interior</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {interiorOptions.map((option) => (
                    <button key={option} onClick={() => toggleOption(option)} className={`rounded-full border px-4 py-2 text-sm ${selected.includes(option) ? 'border-accent bg-accent/20 text-white' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-black to-carbon p-6">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" alt="Custom vehicle preview" className="h-64 w-full rounded-[1.5rem] object-cover" />
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Build Summary</h2>
              <p className="mt-3 text-slate-300">{vehicle.year} {vehicle.brand} {vehicle.model}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {selected.length > 0 ? selected.map((option) => <li key={option}>• {option}</li>) : <li>Choose upgrades to build your specification.</li>}
              </ul>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-accent/20 bg-accent/10 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Estimated Price</p>
              <p className="mt-2 text-3xl font-semibold">Rs. {totalPrice.toLocaleString()}</p>
              <p className="mt-3 text-sm text-slate-300">Premium package estimate including parts, fitment, and tuning consultation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
