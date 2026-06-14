// components/landing/FeaturesGrid.tsx

import {
Languages,
Mic,
BellRing,
ScanSearch,
Wrench,
FileSearch,
} from "lucide-react";

function FeaturesGrid() {
return ( <section className="bg-[#F5F5F3] py-28">


  <div className="mx-auto max-w-7xl px-6">

    {/* Heading */}
    <div className="max-w-3xl">

      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#7A8796]">
        Platform Capabilities
      </p>

      <h2 className="mt-5 text-5xl font-semibold tracking-tight text-[#111315]">

        Built For Real-World
        <br />
        Product Support.

      </h2>

      <p className="mt-6 text-lg leading-relaxed text-[#5F6772]">

        Intelligent diagnostics combined with manuals,
        troubleshooting workflows, maintenance tracking,
        and AI-powered technical assistance.

      </p>

    </div>

    {/* Bento Grid */}
    <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">

      {/* Large Card */}
      <div className="relative overflow-hidden rounded-[36px] border border-[#E4E7EB] bg-white p-8 shadow-sm lg:col-span-2 lg:min-h-[420px]">

        {/* Background Glow */}
        <div className="absolute right-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-[#EEF1F4] blur-3xl" />

        <div className="relative z-10">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6]">

            <ScanSearch className="h-6 w-6 text-[#5F6772]" />

          </div>

          <h3 className="mt-8 text-4xl font-semibold tracking-tight text-[#111315]">

            Intelligent
            <br />
            Diagnostics

          </h3>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5F6772]">

            The assistant investigates issues step-by-step,
            asks follow-up questions, narrows possible causes,
            and recommends corrective actions using official documentation.

          </p>

          {/* Mock Workflow */}
          <div className="mt-12 space-y-4">

            <div className="flex items-center justify-between rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] px-5 py-4">

              <p className="text-sm text-[#111315]">
                Headlight working normally?
              </p>

              <div className="rounded-full bg-[#111315] px-3 py-1 text-xs text-white">
                Checked
              </div>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] px-5 py-4">

              <p className="text-sm text-[#111315]">
                Fuse F3 inspection suggested
              </p>

              <div className="rounded-full border border-[#D8DCE2] bg-white px-3 py-1 text-xs text-[#5F6772]">
                Pending
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Voice Support */}
      <div className="rounded-[36px] border border-[#E4E7EB] bg-white p-8 shadow-sm">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6]">

          <Mic className="h-6 w-6 text-[#5F6772]" />

        </div>

        <h3 className="mt-8 text-3xl font-semibold text-[#111315]">

          Voice Guided
          Assistance

        </h3>

        <p className="mt-5 leading-relaxed text-[#5F6772]">

          Hands-free troubleshooting while repairing
          or inspecting products in real time.

        </p>

      </div>

      {/* Multilingual */}
      <div className="rounded-[36px] border border-[#E4E7EB] bg-white p-8 shadow-sm">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6]">

          <Languages className="h-6 w-6 text-[#5F6772]" />

        </div>

        <h3 className="mt-8 text-3xl font-semibold text-[#111315]">

          Multi-language
          Support

        </h3>

        <p className="mt-5 leading-relaxed text-[#5F6772]">

          Users can interact with the assistant
          in multiple regional languages.

        </p>

      </div>

      {/* Maintenance */}
      <div className="rounded-[36px] border border-[#E4E7EB] bg-white p-8 shadow-sm">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6]">

          <BellRing className="h-6 w-6 text-[#5F6772]" />

        </div>

        <h3 className="mt-8 text-3xl font-semibold text-[#111315]">

          Maintenance
          Tracking

        </h3>

        <p className="mt-5 leading-relaxed text-[#5F6772]">

          Smart reminders for servicing,
          inspections, replacements,
          and preventive maintenance.

        </p>

      </div>

      {/* Docs */}
      <div className="rounded-[36px] border border-[#E4E7EB] bg-white p-8 shadow-sm">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6]">

          <FileSearch className="h-6 w-6 text-[#5F6772]" />

        </div>

        <h3 className="mt-8 text-3xl font-semibold text-[#111315]">

          Official
          Documentation

        </h3>

        <p className="mt-5 leading-relaxed text-[#5F6772]">

          Manuals, diagrams, troubleshooting guides,
          PDFs, and technical resources connected to every product.

        </p>

      </div>

      {/* Spare Parts */}
      <div className="rounded-[36px] border border-[#E4E7EB] bg-white p-8 shadow-sm lg:col-span-2">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6]">

          <Wrench className="h-6 w-6 text-[#5F6772]" />

        </div>

        <h3 className="mt-8 text-4xl font-semibold tracking-tight text-[#111315]">

          Smart Spare Part
          Recommendations

        </h3>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5F6772]">

          Based on the identified issue and product model,
          the assistant can suggest compatible spare parts,
          consumables, accessories, and replacement components.

        </p>

      </div>

    </div>

  </div>

</section>


);
}

export default FeaturesGrid;
