const STATS = [
  { value: "10k+", label: "Active teams" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "Avg. rating" },
];

const BARS = [40, 65, 50, 80, 60, 95, 75];

export default function Hero() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-nexora-teal/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,55,72,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,55,72,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-nexora-teal/20 bg-nexora-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-nexora-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-nexora-teal" />
            Now in public beta
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-nexora-indigo sm:text-5xl lg:text-6xl">
            The smarter way to{" "}
            <span className="text-nexora-teal">run your business</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-nexora-indigo/70 lg:mx-0">
            NEXORA brings your data, workflows and team into one place, so you
            can spend less time switching tools and more time growing.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#pricing"
              className="w-full rounded-lg bg-nexora-teal px-6 py-3 text-center font-semibold text-white shadow-lg shadow-nexora-teal/25 transition hover:bg-nexora-teal/90 sm:w-auto"
            >
              Start free trial
            </a>
            <a
              href="#how-it-works"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-nexora-indigo/15 bg-white px-6 py-3 font-semibold text-nexora-indigo transition hover:border-nexora-indigo/30 sm:w-auto"
            >
              See how it works
              <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-nexora-indigo/10 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-nexora-indigo/60 sm:text-sm">{s.label}</dt>
                <dd className="mt-1 text-2xl font-bold text-nexora-indigo sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Product visual (placeholder — swap for a real screenshot later) */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="rounded-2xl border border-nexora-indigo/10 bg-white p-4 shadow-2xl shadow-nexora-indigo/10 sm:p-6">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-nexora-indigo/15" />
              <span className="h-3 w-3 rounded-full bg-nexora-indigo/15" />
              <span className="h-3 w-3 rounded-full bg-nexora-indigo/15" />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {["Revenue", "Users", "Growth"].map((label, i) => (
                <div key={label} className="rounded-xl bg-nexora-indigo/[0.03] p-3">
                  <p className="text-xs text-nexora-indigo/60">{label}</p>
                  <p className="mt-1 text-lg font-bold text-nexora-indigo">
                    {["$48.2k", "2,314", "+18%"][i]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-nexora-indigo/[0.03] p-4">
              <p className="text-xs font-medium text-nexora-indigo/60">Weekly activity</p>
              <div className="mt-4 flex h-32 items-end gap-2">
                {BARS.map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md ${i === 5 ? "bg-nexora-teal" : "bg-nexora-teal/30"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 hidden rounded-xl border border-nexora-indigo/10 bg-white px-4 py-3 shadow-xl sm:block">
            <p className="text-xs text-nexora-indigo/60">Tasks automated</p>
            <p className="text-xl font-bold text-nexora-teal">1,284</p>
          </div>
        </div>
      </div>
    </section>
  );
}
