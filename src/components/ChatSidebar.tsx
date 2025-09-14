import { Plus, MessageSquare } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";

export const ChatSidebar = () => {
  const { prevPrompts, setRecentPrompt, newChat } = useChatContext();

  const loadPrompt = async (prompt: string) => {
    setRecentPrompt(prompt);
  };

  return (
    <div className="min-h-screen w-80 bg-gradient-surface flex flex-col border-r border-border">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
          Floatchat
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          ARGO Data Analysis Tool
        </p>
      </div>
      
      <div className="flex-1 p-4">
        <Button
          onClick={newChat}
          variant="outline"
          className="w-full justify-start gap-2 mb-6 bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-soft"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        
        <div className="space-y-3">
          {prevPrompts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent</h3>
              <div className="space-y-1">
                {prevPrompts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200 group"
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 group-hover:text-primary transition-colors" />
                      <p className="text-sm text-foreground truncate leading-relaxed">
                        {item.slice(0, 50)}{item.length > 50 ? "..." : ""}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Analyzing oceanographic data with AI
        </div>
      </div>
    </div>
  );
};