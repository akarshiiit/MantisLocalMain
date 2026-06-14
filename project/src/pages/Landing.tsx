// pages/Landing.tsx

import Navbar from "../components/layout/Navbar";
import StatsStrip from "../components/landing/Stats";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/layout/Footer";

function Landing() {
return ( <div className="min-h-screen overflow-hidden bg-[#F3F5F7] text-[#111315]">


  <Navbar />

  {/* HERO */}
  <section className="relative overflow-hidden">

    {/* Ambient Background */}
    <div className="absolute inset-0 overflow-hidden">

      <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#D6E2F0] blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[#E4EBF3] blur-3xl" />

    </div>

    {/* Grid */}
    <div
      className="absolute inset-0 opacity-[0.25]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(17,19,21,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(17,19,21,0.03) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
      }}
    />

    <div className="relative z-10 mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 items-center gap-20 px-6 py-16 lg:grid-cols-2">

      {/* LEFT */}
      <div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D8DCE2] bg-white/80 px-4 py-2 text-sm text-[#5F6772] shadow-sm backdrop-blur-md">

          <div className="h-2 w-2 rounded-full bg-[#7A8796]" />

          AI Powered Product Diagnostics

        </div>

        {/* Heading */}
        <h1 className="mt-8 text-6xl font-semibold leading-[1.02] tracking-tight text-[#111315] lg:text-7xl">

          Diagnose Products
          <br />

          <span className="text-[#60758A]">
            Like a Technician.
          </span>

        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#5F6772]">

          Intelligent product support trained on official manuals,
          troubleshooting workflows, technical documentation,
          and service resources for real-world devices.

        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">

          <button className="rounded-full bg-[#111315] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#1B1D21]">

            Start Diagnosis

          </button>

          <button className="rounded-full border border-[#D8DCE2] bg-white px-7 py-3 text-sm font-medium text-[#111315] shadow-sm transition hover:bg-[#EEF2F5]">

            Explore Products

          </button>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center">

        {/* Glow */}
        <div className="absolute h-[520px] w-[520px] rounded-full bg-[#D9E5F1]/70 blur-3xl" />

        {/* Main Diagnostic Window */}
        <div className="relative w-full max-w-xl overflow-hidden rounded-[36px] border border-[#D8DCE2] bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ECEFF3] px-6 py-5">

            <div>

              <p className="text-sm text-[#5F6772]">
                Active Diagnostic Session
              </p>

              <h3 className="mt-1 text-xl font-semibold text-[#111315]">
                Honda Activa 6G
              </h3>

            </div>

            <div className="rounded-full border border-[#D8DCE2] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#60758A]">

              LIVE

            </div>

          </div>

          {/* Chat */}
          <div className="space-y-4 px-6 py-6">

            {/* User */}
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#111315] px-4 py-3 text-sm text-white shadow-sm">

              My scooter horn is not working.

            </div>

            {/* AI */}
            <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-[#E4E7EB] bg-[#F7F9FB] px-4 py-3 text-sm leading-relaxed text-[#3B434C]">

              Does the headlight function normally when the ignition is on?

            </div>

            {/* User */}
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#111315] px-4 py-3 text-sm text-white shadow-sm">

              Yes, headlights are working properly.

            </div>

            {/* AI */}
            <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-[#E4E7EB] bg-[#F7F9FB] px-4 py-3 text-sm leading-relaxed text-[#3B434C]">

              Understood. The issue appears isolated to the horn circuit.
              Please inspect Fuse F3 (10A) beneath the front panel.

            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-[#ECEFF3] bg-[#FCFCFD] px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex-1 rounded-full border border-[#D8DCE2] bg-white px-5 py-3 text-sm text-[#7A8796]">

                Describe your issue...

              </div>

              <button className="rounded-full bg-[#111315] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1B1D21]">

                Send

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* SIMPLE STRUCTURE */}
  <StatsStrip />

  <CTASection />

  <Footer />

</div>


);
}

export default Landing;
