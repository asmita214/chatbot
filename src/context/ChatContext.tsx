// import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
// import { client, Client } from "@gradio/client";

// interface ChatContextType {
//   input: string;
//   setInput: (value: string) => void;
//   recentPrompt: string;
//   setRecentPrompt: (value: string) => void;
//   prevPrompts: string[];
//   setPrevPrompts: (value: string[] | ((prev: string[]) => string[])) => void;
//   showResult: boolean;
//   setShowResult: (value: boolean) => void;
//   loading: boolean;
//   setLoading: (value: boolean) => void;
//   resultData: string;
//   setResultData: (value: string | ((prev: string) => string)) => void;
//   onSent: (prompt?: string) => Promise<void>;
//   newChat: () => void;
// }

// const ChatContext = createContext<ChatContextType | undefined>(undefined);

// export const useChatContext = () => {
//   const context = useContext(ChatContext);
//   if (!context) throw new Error("useChatContext must be used within a ChatProvider");
//   return context;
// };

// interface ChatProviderProps {
//   children: ReactNode;
// }

// export const ChatProvider = ({ children }: ChatProviderProps) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const [gradioClient, setGradioClient] = useState<Client | null>(null);

//   // Initialize Gradio client
//   useEffect(() => {
//     const initializeGradioClient = async () => {
//       try {
//         const hfClient = await client("https://suyash1120-backend.hf.space/");
//         console.log("Gradio client initialized successfully");
//         console.log("Client object:", hfClient);
//         setGradioClient(hfClient);
//       } catch (error) {
//         console.error("Failed to initialize Gradio client:", error);
//       }
//     };
//     initializeGradioClient();
//   }, []);

//   // Typewriter effect for responses
//   const typeResponse = async (text: string) => {
//     setResultData("");
//     const words = text.split(" ");
//     for (const word of words) {
//       await new Promise((resolve) => setTimeout(resolve, 50));
//       setResultData((prev) => prev + word + " ");
//     }
//   };

//   const newChat = () => {
//     setLoading(false);
//     setShowResult(false);
//     setResultData("");
//     setInput("");
//   };

//   const onSent = async (prompt?: string) => {
//     const userPrompt = prompt ?? input;
//     setShowResult(true);
//     setLoading(true);
//     setRecentPrompt(userPrompt);
//     setPrevPrompts((prev) => [...prev, userPrompt]);

//     const greetings = ["hi", "hello", "hey", "hola"];
//     if (greetings.includes(userPrompt.toLowerCase().trim())) {
//       await typeResponse(
//         "Hello! I am Floatchat, a tool for analyzing ARGO data. You can ask me general questions about the ARGO program or provide data points to predict temperature."
//       );
//       setLoading(false);
//       setInput("");
//       return;
//     }

//     try {
//       const latMatch = userPrompt.match(/lat\s*:\s*([-\d.]+)/i);
//       const longMatch = userPrompt.match(/long\s*:\s*([-\d.]+)/i);
//       const presMatch = userPrompt.match(/pres\s*:\s*([-\d.]+)/i);
//       const psalMatch = userPrompt.match(/psal\s*:\s*([-\d.]+)/i);

//       if (!gradioClient) {
//         throw new Error("Gradio client is not initialized yet. Please wait a moment and try again.");
//       }

//       if (latMatch && longMatch && presMatch && psalMatch) {
//         const lat = parseFloat(latMatch[1]);
//         const lon = parseFloat(longMatch[1]);
//         const pres = parseFloat(presMatch[1]);
//         const psal = parseFloat(psalMatch[1]);

//         console.log("=== STARTING PREDICTION ===");
//         console.log("Input data:", { lat, lon, pres, psal });

//         // ✅ Call Gradio using the named endpoint `/predict`
//         const result = await gradioClient.predict("/predict", [lat, lon, pres, psal]);

//         const predictedTemp = result.data[0]; // string
//         const genaiExplanation = result.data[1]; // string

//         const reply = `🌊 **Predicted Temperature: ${predictedTemp}**<br><br>${genaiExplanation}`;
//         await typeResponse(reply);
//       } else {
//         await typeResponse(
//           "⚠️ Please provide all four required values in this format: `lat: 12.3 long: 45.6 pres: 1000 psal: 35`."
//         );
//       }
//     } catch (error) {
//       console.error("Error in onSent:", error);
//       await typeResponse(
//         error instanceof Error ? `⚠️ Error: ${error.message}` : "⚠️ Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//       setInput("");
//     }
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         input,
//         setInput,
//         recentPrompt,
//         setRecentPrompt,
//         prevPrompts,
//         setPrevPrompts,
//         showResult,
//         setShowResult,
//         loading,
//         setLoading,
//         resultData,
//         setResultData,
//         onSent,
//         newChat,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { client, Client } from "@gradio/client";

interface ChatContextType {
  input: string;
  setInput: (value: string) => void;
  recentPrompt: string;
  setRecentPrompt: (value: string) => void;
  prevPrompts: string[];
  setPrevPrompts: (value: string[] | ((prev: string[]) => string[])) => void;
  showResult: boolean;
  setShowResult: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  resultData: string;
  setResultData: (value: string | ((prev: string) => string)) => void;
  onSent: (prompt?: string) => Promise<void>;
  newChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChatContext must be used within a ChatProvider");
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const [gradioClient, setGradioClient] = useState<Client | null>(null);

  // Initialize Gradio client
  useEffect(() => {
    const initializeGradioClient = async () => {
      try {
        const hfClient = await client("https://suyash1120-backend.hf.space/");
        console.log("Gradio client initialized successfully");
        setGradioClient(hfClient);
      } catch (error) {
        console.error("Failed to initialize Gradio client:", error);
      }
    };
    initializeGradioClient();
  }, []);

  // Typewriter effect for responses
  const typeResponse = async (text: string) => {
    setResultData("");
    const words = text.split(" ");
    for (const word of words) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setResultData((prev) => prev + word + " ");
    }
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const onSent = async (prompt?: string) => {
    const userPrompt = prompt ?? input;
    setShowResult(true);
    setLoading(true);
    setRecentPrompt(userPrompt);
    setPrevPrompts((prev) => [...prev, userPrompt]);

    const greetings = ["hi", "hello", "hey", "hola"];
    if (greetings.includes(userPrompt.toLowerCase().trim())) {
      await typeResponse(
        "Hello! I am Floatchat, a tool for analyzing ARGO data. You can ask me general questions about the ARGO program or provide data points to predict temperature."
      );
      setLoading(false);
      setInput("");
      return;
    }

    try {
      const latMatch = userPrompt.match(/lat\s*:\s*([-\d.]+)/i);
      const longMatch = userPrompt.match(/long\s*:\s*([-\d.]+)/i);
      const presMatch = userPrompt.match(/pres\s*:\s*([-\d.]+)/i);
      const psalMatch = userPrompt.match(/psal\s*:\s*([-\d.]+)/i);

      if (!gradioClient) throw new Error("Gradio client is not initialized yet.");

      if (latMatch && longMatch && presMatch && psalMatch) {
        const lat = parseFloat(latMatch[1]);
        const lon = parseFloat(longMatch[1]);
        const pres = parseFloat(presMatch[1]);
        const psal = parseFloat(psalMatch[1]);

        const result = await gradioClient.predict("/predict", [lat, lon, pres, psal]);

        // Only display the predicted temperature and clean up text
        const predictedTemp = result.data[0].replace(/\*\*/g, "").trim();

        await typeResponse(predictedTemp);
      } else {
        await typeResponse(
          "⚠️ Please provide all four required values in this format: `lat: 12.3 long: 45.6 pres: 1000 psal: 35`."
        );
      }
    } catch (error) {
      console.error("Error in onSent:", error);
      await typeResponse(
        error instanceof Error ? `⚠️ Error: ${error.message}` : "⚠️ Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
