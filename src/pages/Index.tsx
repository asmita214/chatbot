import { ChatProvider } from "@/context/ChatContext";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMain } from "@/components/ChatMain";

const Index = () => {
  return (
    <ChatProvider>
      <div className="flex min-h-screen bg-background">
        <ChatSidebar />
        <ChatMain />
      </div>
    </ChatProvider>
  );
};

export default Index;
