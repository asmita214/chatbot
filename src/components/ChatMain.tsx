import { Send, User, Bot } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const ChatMain = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useChatContext();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSent();
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Floatchat</h1>
            <p className="text-sm text-muted-foreground">Ocean Temperature Prediction</p>
          </div>
          <div className="h-10 w-10 bg-gradient-ocean rounded-full flex items-center justify-center shadow-soft">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {!showResult ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="animate-float">
                  <div className="h-20 w-20 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto shadow-floating">
                    <Bot className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-foreground">
                    Hello, <span className="bg-gradient-ocean bg-clip-text text-transparent">Analyst</span>
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    How can I help you analyze ARGO data today?
                  </p>
                </div>
                <div className="text-sm text-muted-foreground max-w-md mx-auto">
                  <p>
                    Provide oceanographic data (lat, long, pres, psal) to predict temperature,
                    or ask general questions about the ARGO program.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 bg-gradient-ocean rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground leading-relaxed">{recentPrompt}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    {loading ? (
                      <div className="space-y-3">
                        <div className="h-4 bg-muted rounded animate-pulse-soft"></div>
                        <div className="h-4 bg-muted rounded animate-pulse-soft"></div>
                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse-soft"></div>
                      </div>
                    ) : (
                      <div 
                        className="text-foreground leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: resultData }}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter ARGO data (lat: 45.5 long: -125.3 pres: 100 psal: 34.5) or ask a question..."
                className="bg-background border-border focus:ring-primary focus:border-primary"
              />
            </div>
            {input && (
              <Button 
                onClick={() => onSent()}
                size="icon"
                className="bg-gradient-ocean hover:bg-gradient-deep shadow-ocean transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Floatchat may display inaccurate info, including about oceanographic data, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};