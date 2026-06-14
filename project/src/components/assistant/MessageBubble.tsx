// components/assistant/MessageBubble.tsx

type MessageBubbleProps = {
message: string;
sender: "user" | "assistant";
};

function MessageBubble({
message,
sender,
}: MessageBubbleProps) {
const isUser = sender === "user";

return (
<div
className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
>


  <div
    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
      isUser
        ? "rounded-br-md bg-[#111315] text-white"
        : "rounded-bl-md border border-[#E4E7EB] bg-[#F8F9FA] text-[#3B434C]"
    }`}
  >
    {message}
  </div>

</div>


);
}

export default MessageBubble;
