export function DashboardPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Project Tracking</p>
            <h1 className="mt-3 text-3xl font-semibold">GT-R Build Progress</h1>
            <p className="mt-3 text-slate-300">Progress 72%</p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[72%] rounded-full bg-accent" />
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <h2 className="text-xl font-semibold">Timeline</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>Vehicle Received</li>
              <li>Design Approved</li>
              <li>Parts Ordered</li>
              <li>Modification Started</li>
              <li>Testing</li>
              <li>Completed</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <h2 className="text-xl font-semibold">Estimated Completion</h2>
            <p className="mt-3 text-slate-300">24 August 2026</p>
            <img src="https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=900&q=80" alt="Vehicle in workshop" className="mt-4 h-48 w-full rounded-2xl object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MyVehiclesPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">My Vehicles</div>;
}

export function MyBuildsPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">My Builds</div>;
}

export function BookingsPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">Bookings</div>;
}

export function PaymentsPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">Payments</div>;
}

export function ProfilePage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">Profile</div>;
}
