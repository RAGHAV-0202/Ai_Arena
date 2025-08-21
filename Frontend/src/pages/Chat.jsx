import React from "react";
import SideBar from "../components/SideBar.tsx";
import PromptPanel from "../components/PromptPanel.jsx";
import GPTArea from "../components/GPT_Area.jsx";
import { GenerateChatGPT, GenerateLlama8b, GenerateGemini } from "../components/LLM_Generations.jsx";
import axios from "axios";
import { baseUrl } from "../baseUrl.js";
import { useParams, useNavigate } from "react-router-dom";

function Chat() {
  const { id: chatId } = useParams();
  const navigate = useNavigate();
  
  const textareaRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [chatData, setChatData] = React.useState(null);
  const [isInitializing, setIsInitializing] = React.useState(false);
  
  // Separate conversation histories for each provider
  const [conversationHistories, setConversationHistories] = React.useState({
    0: [], // ChatGPT
    1: [], // Gemini
    2: []  // Llama
  });

  const [providers, setProviders] = React.useState([
    { 
      id: 0, 
      title: "ChatGPT 4 Turbo", 
      logo: "https://waryhub.com/files/preview/960x960/11752154375agdpvjezbai7exuuwwhmbnkfy9cyqjzlvutbqqeoa8xyl6z28z1hlstnwtld5hhesltmqfxkvm31meksr9lei766fwfc5izp6bno.png", 
      messages: [] 
    },
    { 
      id: 1, 
      title: "Gemini 2.5 Flash", 
      logo: "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png", 
      messages: [] 
    },
    { 
      id: 2, 
      title: "Llama 3.1 8b", 
      logo: "https://cdn.pixabay.com/photo/2021/11/01/15/20/meta-logo-6760788_1280.png", 
      messages: [] 
    }
  ]);

  const completionStatus = React.useRef({ gemini: false, chatGPT: false, llama: false });

  // Helper function to extract conversation history from messages
  const extractConversationHistory = (messages, userLogo, aiLogo) => {
    const history = [];
    
    for (const message of messages) {
      if (message.provider === userLogo) {
        history.push({ role: 'user', content: message.text });
      } else if (message.provider === aiLogo) {
        history.push({ role: 'assistant', content: message.text });
      }
    }
    
    return history;
  };

  // Update conversation histories when providers change
  React.useEffect(() => {
    const userLogo = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const geminiLogo = "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png";
    const chatGPTLogo = "https://waryhub.com/files/preview/960x960/11752154375agdpvjezbai7exuuwwhmbnkfy9cyqjzlvutbqqeoa8xyl6z28z1hlstnwtld5hhesltmqfxkvm31meksr9lei766fwfc5izp6bno.png";
    const llamaLogo = "https://cdn.pixabay.com/photo/2021/11/01/15/20/meta-logo-6760788_1280.png";

    setConversationHistories({
      0: extractConversationHistory(providers[0].messages, userLogo, chatGPTLogo),
      1: extractConversationHistory(providers[1].messages, userLogo, geminiLogo),
      2: extractConversationHistory(providers[2].messages, userLogo, llamaLogo)
    });
  }, [providers]);

  const syncWithBackend = async (latestProviders) => {
    try {
      await axios.post(
        `${baseUrl}/chats/${chatId}`, 
        { providers: latestProviders }, 
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to sync chats:", err);
    }
  };

  const checkAllComplete = (latestProviders) => {
    const { gemini, chatGPT, llama } = completionStatus.current;
    if (gemini && chatGPT && llama) {
      setLoading(false);
      completionStatus.current = { gemini: false, chatGPT: false, llama: false };
      syncWithBackend(latestProviders);
    }
  };

  const handlePrompt = async () => {
    if (!textareaRef.current?.value) return;

    const prompt = textareaRef.current.value;
    const userLogo = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const geminiLogo = "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png";
    const chatGPTLogo = "https://waryhub.com/files/preview/960x960/11752154375agdpvjezbai7exuuwwhmbnkfy9cyqjzlvutbqqeoa8xyl6z28z1hlstnwtld5hhesltmqfxkvm31meksr9lei766fwfc5izp6bno.png";
    const llamaLogo = "https://cdn.pixabay.com/photo/2021/11/01/15/20/meta-logo-6760788_1280.png";

    // Add user message
    setProviders(prev => {
      const updated = prev.map(p => ({ ...p, messages: [...p.messages, { provider: userLogo, text: prompt }] }));
      return updated;
    });

    textareaRef.current.value = "";
    setLoading(true);
    completionStatus.current = { gemini: false, chatGPT: false, llama: false };

    // Generate AI responses concurrently with conversation history
    GenerateChatGPT(prompt, conversationHistories[0]).then((chatGPTRes) => {
      setProviders(prev => {
        const updated = prev.map(p => p.id === 0 ? { ...p, messages: [...p.messages, { provider: chatGPTLogo, text: chatGPTRes }] } : p);
        completionStatus.current.chatGPT = true;
        checkAllComplete(updated);
        return updated;
      });
    }).catch(error => {
      console.error("ChatGPT error:", error);
      setProviders(prev => {
        const updated = prev.map(p => p.id === 0 ? { ...p, messages: [...p.messages, { provider: chatGPTLogo, text: "Sorry, I encountered an error. Please try again." }] } : p);
        completionStatus.current.chatGPT = true;
        checkAllComplete(updated);
        return updated;
      });
    });

    GenerateGemini(prompt, conversationHistories[1]).then((geminiRes) => {
      setProviders(prev => {
        const updated = prev.map(p => p.id === 1 ? { ...p, messages: [...p.messages, { provider: geminiLogo, text: geminiRes }] } : p);
        completionStatus.current.gemini = true;
        checkAllComplete(updated);
        return updated;
      });
    }).catch(error => {
      console.error("Gemini error:", error);
      setProviders(prev => {
        const updated = prev.map(p => p.id === 1 ? { ...p, messages: [...p.messages, { provider: geminiLogo, text: "Sorry, I encountered an error. Please try again." }] } : p);
        completionStatus.current.gemini = true;
        checkAllComplete(updated);
        return updated;
      });
    });

    GenerateLlama8b(prompt, conversationHistories[2]).then((llamaRes) => {
      setProviders(prev => {
        const updated = prev.map(p => p.id === 2 ? { ...p, messages: [...p.messages, { provider: llamaLogo, text: llamaRes }] } : p);
        completionStatus.current.llama = true;
        checkAllComplete(updated);
        return updated;
      });
    }).catch(error => {
      console.error("Llama error:", error);
      setProviders(prev => {
        const updated = prev.map(p => p.id === 2 ? { ...p, messages: [...p.messages, { provider: llamaLogo, text: "Sorry, I encountered an error. Please try again." }] } : p);
        completionStatus.current.llama = true;
        checkAllComplete(updated);
        return updated;
      });
    });
  };

  // Create a new chat
  const createNewChat = async () => {
    if (isInitializing) return;
    
    setIsInitializing(true);
    try {
      const response = await axios.post(
        `${baseUrl}/chats/new`, 
        { title: "New Chat" }, 
        { withCredentials: true }
      );
      
      const newChatId = response.data.data.chatId;
      
      // Reset providers to default state for new chat
      setProviders([
        { id: 0, title: "ChatGPT 4 Turbo", logo: "https://waryhub.com/files/preview/960x960/11752154375agdpvjezbai7exuuwwhmbnkfy9cyqjzlvutbqqeoa8xyl6z28z1hlstnwtld5hhesltmqfxkvm31meksr9lei766fwfc5izp6bno.png", messages: [] },
        { id: 1, title: "Gemini 2.5 Flash", logo: "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png", messages: [] },
        { id: 2, title: "Llama 3.1 8b", logo: "https://cdn.pixabay.com/photo/2021/11/01/15/20/meta-logo-6760788_1280.png", messages: [] }
      ]);
      
      // Reset conversation histories
      setConversationHistories({
        0: [],
        1: [],
        2: []
      });
      
      setChatData(null); // Reset chat data
      
      // Navigate to the new chat
      navigate(`/chat/${newChatId}`, { replace: true });
      
    } catch (err) {
      console.error("Failed to create new chat:", err);
    } finally {
      setIsInitializing(false);
    }
  };

  // Load specific chat on mount or when chatId changes
  React.useEffect(() => {
    const loadChat = async () => {
      // If no chatId in URL, create a new chat immediately
      if (!chatId || chatId === 'new') {
        if (!isInitializing) {
          createNewChat();
        }
        return;
      }

      try {
        setIsInitializing(true);
        
        // Fetch specific chat
        const response = await axios.get(`${baseUrl}/chats/${chatId}`, { 
          withCredentials: true 
        });
        
        if (response.data?.data) {
          setChatData(response.data.data);
          setProviders(response.data.data.providers || providers);
        }
      } catch (err) {
        console.error("Failed to fetch chat:", err);
        
        // If chat not found or any error, create a new one
        if (err.response?.status === 404 || err.response?.status === 400) {
          console.log("Chat not found, creating new chat...");
          await createNewChat();
        } else {
          console.error("Unexpected error loading chat:", err);
        }
      } finally {
        setIsInitializing(false);
      }
    };

    loadChat();
  }, [chatId]);

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="chatPage bg-[#1B1C1D] h-screen w-screen flex items-center justify-center">
        <div className="text-white text-lg">Creating new chat...</div>
      </div>
    );
  }

  return (
    <div className="chatPage bg-[#1B1C1D] h-screen w-screen flex overflow-hidden">
      <div className="sidebar-container">
        <SideBar currentChatId={chatId} />
      </div>
      <div className="chat-window flex flex-col flex-1 min-w-0">
        <div className="chat-areas flex flex-1 overflow-x-scroll overflow-y-hidden">
          {providers.map((provider, index) => (
            <GPTArea 
              key={index} 
              title={provider.title} 
              logo={provider.logo} 
              messages={provider.messages} 
              id={provider.id} 
            />
          ))}
        </div>
        <div className="input-container flex justify-center p-4 bg-[#1B1C1D] border-t border-zinc-700">
          <PromptPanel 
            textareaRef={textareaRef} 
            handlePrompt={handlePrompt} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;