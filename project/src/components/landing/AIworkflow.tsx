// components/landing/AIWorkflow.tsx

import {
Search,
MessagesSquare,
GitBranch,
Wrench,
} from "lucide-react";

const steps = [
{
icon: Search,
title: "Issue Detection",
description:
"Users describe symptoms, failures, or abnormal behavior.",
},

{
icon: MessagesSquare,
title: "Guided Investigation",
description:
"The assistant asks technician-style follow-up questions.",
},

{
icon: GitBranch,
title: "Cause Elimination",
description:
"Possible causes are narrowed down using diagnostics and responses.",
},

{
icon: Wrench,
title: "Probable Resolution",
description:
"Users receive corrective actions backed by official documentation.",
},
];

function AIWorkflow() {
return ( <section className="relative overflow-hidden border-t border-[#E4E7EB] bg-[#F8F9FA] py-28">


  {/* Ambient Background */}
  <div className="absolute inset-0">

    <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#DDE3EA] blur-3xl" />

    <div className="absolute bottom-[10%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#E7EAEE] blur-3xl" />

  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6">

    {/* Heading */}
    <div className="max-w-3xl">

      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#7A8796]">
        Diagnostic Workflow
      </p>

      <h2 className="mt-5 text-5xl font-semibold tracking-tight text-[#111315]">

        AI That Investigates
        <br />
        Problems Systematically.

      </h2>

      <p className="mt-6 text-lg leading-relaxed text-[#5F6772]">

        Instead of returning generic answers,
        the assistant behaves like a real technician —
        asking questions, narrowing possibilities,
        and identifying probable root causes.

      </p>

    </div>

    {/* Workflow Cards */}
    <div className="relative mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">

      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[32px] border border-[#E4E7EB] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            {/* Number */}
            <div className="absolute right-6 top-6 text-6xl font-semibold text-[#ECEFF3]">

              0{index + 1}

            </div>

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6] transition group-hover:bg-[#111315]">

              <Icon className="h-6 w-6 text-[#5F6772] transition group-hover:text-white" />

            </div>

            {/* Content */}
            <div className="mt-10">

              <h3 className="text-2xl font-semibold text-[#111315]">

                {step.title}

              </h3>

              <p className="mt-4 leading-relaxed text-[#5F6772]">

                {step.description}

              </p>

            </div>

          </div>
        );
      })}

    </div>

  </div>

</section>

);
}

export default AIWorkflow;
