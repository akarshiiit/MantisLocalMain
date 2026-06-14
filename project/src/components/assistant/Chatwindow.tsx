// components/assistant/ChatWindow.tsx

import MessageBubble from "./MessageBubble";

function ChatWindow() {
return ( <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#60758A]/10 bg-white shadow-soft">

  {/* Header */}
  <div className="flex items-center justify-between border-b border-[#F3F5F7] px-6 py-5">
    <div>
      <p className="text-[13px] font-medium text-[#60758A]">
        Diagnostics
      </p>
      <h2 className="text-[15px] font-semibold text-[#111315]">
        Mantis Assistant
      </h2>
    </div>
    <div className="flex items-center gap-2 rounded-full bg-[#F3F5F7] px-3 py-1.5 text-[12px] font-medium text-[#60758A]">
      <div className="h-2 w-2 rounded-full bg-[#111315]"></div>
      Active
    </div>
  </div>

  {/* Chat Messages */}
  <div className="flex-1 space-y-6 overflow-y-auto bg-[#F3F5F7]/30 px-6 py-6">

    <MessageBubble
      sender="user"
      message="My scooter horn is not working."
    />

    <MessageBubble
      sender="assistant"
      message="Does the headlight work when the ignition is on?"
    />

    <MessageBubble
      sender="user"
      message="Yes, headlights are fine."
    />

    <MessageBubble
      sender="assistant"
      message="Check Fuse F3 (10A) under the front panel. It controls the horn relay."
    />

  </div>

  {/* Suggested Checks */}
  <div className="border-t border-[#F3F5F7] bg-white px-6 py-4">
    <p className="text-[12px] font-semibold uppercase tracking-wider text-[#60758A]">
      Suggested Actions
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      <button className="rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-4 py-2 text-[13px] font-medium text-[#111315] transition hover:bg-[#E6E8EA]">
        Show diagram for Fuse F3
      </button>
      <button className="rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-4 py-2 text-[13px] font-medium text-[#111315] transition hover:bg-[#E6E8EA]">
        How to access front panel
      </button>
    </div>
  </div>

  {/* Input Area */}
  <div className="border-t border-[#F3F5F7] bg-white px-6 py-5">
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Type a message..."
        className="h-12 flex-1 rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-5 text-[14px] text-[#111315] outline-none placeholder:text-[#60758A] focus:border-[#111315]/30 transition"
      />
      <button className="h-12 rounded-xl bg-[#111315] px-6 text-[14px] font-medium text-white shadow-soft transition hover:bg-black/80">
        Send
      </button>
    </div>
  </div>

</div>

);
}

export default ChatWindow;
