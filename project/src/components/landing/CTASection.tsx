// components/landing/CTASection.tsx

import { ArrowRight } from "lucide-react";

function CTASection() {
return ( <section className="relative overflow-hidden border-t border-[#E4E7EB] bg-[#F8F9FA] py-32">


  {/* Ambient Background */}
  <div className="absolute inset-0">

    <div className="absolute left-[15%] top-[10%] h-[300px] w-[300px] rounded-full bg-[#E6EAEE] blur-3xl" />

    <div className="absolute bottom-[5%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#EEF1F4] blur-3xl" />

  </div>

  <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#7A8796]">
      Intelligent Product Support
    </p>

    <h2 className="mt-6 text-5xl font-semibold tracking-tight text-[#111315] lg:text-7xl">

      Support Should
      <br />
      Feel Intelligent.

    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#5F6772]">

      Transform manuals, service guides,
      and technical documentation into an intelligent
      diagnostic experience powered by AI.

    </p>

    {/* Buttons */}
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">

      <button className="flex items-center gap-2 rounded-full bg-[#111315] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#1B1D21]">

        Start Diagnosis

        <ArrowRight className="h-4 w-4" />

      </button>

      <button className="rounded-full border border-[#D8DCE2] bg-white px-7 py-3 text-sm font-medium text-[#111315] shadow-sm transition hover:bg-[#F0F2F4]">

        Explore Products

      </button>

    </div>

  </div>

</section>


);
}

export default CTASection;
