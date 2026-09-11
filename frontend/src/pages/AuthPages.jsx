export function LoginPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-carbon/80 p-8">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-slate-300">Sign in to continue your build journey.</p>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" />
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Password" />
            <button className="w-full rounded-full bg-accent px-5 py-3 font-semibold">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-dark px-6 py-24 text-white lg:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-carbon/80 p-8">
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="mt-3 text-slate-300">Join the ModiDrive community and start your next build.</p>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Full Name" />
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" />
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Password" />
            <button className="w-full rounded-full bg-accent px-5 py-3 font-semibold">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
