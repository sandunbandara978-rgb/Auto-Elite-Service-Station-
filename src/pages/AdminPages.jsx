export function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Revenue</p>
            <h2 className="mt-3 text-3xl font-semibold">Rs. 1.24B</h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold">184</h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Customers</p>
            <h2 className="mt-3 text-3xl font-semibold">620</h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-carbon/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Bookings</p>
            <h2 className="mt-3 text-3xl font-semibold">42</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ManageUsersPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">Manage Users</div>;
}

export function ManageProductsPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">Manage Products</div>;
}

export function ManageProjectsPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">Manage Projects</div>;
}

export function ReportsPage() {
  return <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">Reports</div>;
}
