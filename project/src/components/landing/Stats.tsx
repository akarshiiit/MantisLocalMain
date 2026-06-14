// components/landing/StatsStrip.tsx

import { Wrench, Package, ShieldCheck, Activity } from "lucide-react";

function StatsStrip() {
return ( <section className="relative border-y border-[#E4E7EB] bg-[#F8F9FA]">


  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2 lg:grid-cols-4">

    {/* Card 1 */}
    <div className="rounded-3xl border border-[#E4E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F2F4]">

        <Wrench className="h-5 w-5 text-[#5F6772]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        12K+
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-[#5F6772]">
        Diagnostics completed across multiple product categories.
      </p>

    </div>

    {/* Card 2 */}
    <div className="rounded-3xl border border-[#E4E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F2F4]">

        <Package className="h-5 w-5 text-[#5F6772]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        320+
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-[#5F6772]">
        Products supported with manuals, diagrams, and service guides.
      </p>

    </div>

    {/* Card 3 */}
    <div className="rounded-3xl border border-[#E4E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F2F4]">

        <ShieldCheck className="h-5 w-5 text-[#5F6772]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        94%
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-[#5F6772]">
        Diagnostic accuracy powered by verified official documentation.
      </p>

    </div>

    {/* Card 4 */}
    <div className="rounded-3xl border border-[#E4E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F2F4]">

        <Activity className="h-5 w-5 text-[#5F6772]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        24/7
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-[#5F6772]">
        Intelligent assistance available anytime for troubleshooting.
      </p>

    </div>

  </div>

</section>


);
}

export default StatsStrip;
