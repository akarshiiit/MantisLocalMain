// components/assistant/ChatWindow.tsx

import MessageBubble from "./MessageBubble";

function ChatWindow() {
return ( <div className="flex h-[760px] flex-col overflow-hidden rounded-[32px] border border-[#E4E7EB] bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)]">


  {/* Header */}
  <div className="flex items-center justify-between border-b border-[#ECEFF3] px-6 py-5">

    <div>

      <p className="text-sm text-[#7A8796]">
        AI Diagnostic Assistant
      </p>

      <h2 className="mt-1 text-xl font-semibold text-[#111315]">
        Honda Activa 6G
      </h2>

    </div>

    <div className="rounded-full border border-[#D8DCE2] bg-[#F8F9FA] px-3 py-1 text-xs font-medium text-[#5F6772]">

      ACTIVE

    </div>

  </div>

  {/* Chat Messages */}
  <div className="flex-1 space-y-4 overflow-y-auto bg-[#FCFCFB] px-6 py-6">

    <MessageBubble
      sender="user"
      message="My scooter horn is not working."
    />

    <MessageBubble
      sender="assistant"
      message="Does the headlight function normally when the ignition is on?"
    />

    <MessageBubble
      sender="user"
      message="Yes, headlights are working properly."
    />

    <MessageBubble
      sender="assistant"
      message="Understood. The issue is likely isolated to the horn circuit. Please inspect Fuse F3 (10A) beneath the front panel."
    />

    <MessageBubble
      sender="assistant"
      message="Has any electrical repair or battery replacement been performed recently?"
    />

  </div>

  {/* Suggested Checks */}
  <div className="border-t border-[#ECEFF3] bg-[#FAFAF9] px-6 py-4">

    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#7A8796]">
      Suggested Checks
    </p>

    <div className="mt-3 flex flex-wrap gap-2">

      <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#3B434C] transition hover:bg-[#F3F4F6]">
        Check Fuse F3
      </button>

      <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#3B434C] transition hover:bg-[#F3F4F6]">
        Inspect Horn Wiring
      </button>

      <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#3B434C] transition hover:bg-[#F3F4F6]">
        Test Battery Voltage
      </button>

    </div>

  </div>

  {/* Input Area */}
  <div className="border-t border-[#ECEFF3] bg-white px-6 py-5">

    <div className="flex items-center gap-3">

      <input
        type="text"
        placeholder="Describe your issue..."
        className="h-14 flex-1 rounded-full border border-[#D8DCE2] bg-[#F8F9FA] px-5 text-sm text-[#111315] outline-none placeholder:text-[#9BA6B2]"
      />

      <button className="h-14 rounded-full bg-[#111315] px-6 text-sm font-medium text-white transition hover:bg-[#1B1D21]">

        Send

      </button>

    </div>

  </div>

</div>


);
}

export default ChatWindow;
