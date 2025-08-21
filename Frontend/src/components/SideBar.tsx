import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../baseUrl.js"; // Adjust path as needed

interface Chat {
  _id: string;
  chatId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  providers: any[];
}

function SideBar({ currentChatId }: { currentChatId?: string }) {
  const [collapsed, setCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [creatingNewChat, setCreatingNewChat] = useState(false);

  const navigate = useNavigate();

  const toggle = useCallback(() => setCollapsed((p) => !p), []);

  useEffect(() => {
    if (!sidebarRef.current) return;

    const mq = window.matchMedia("(min-width: 768px)");

    if (mq.matches) {
      gsap.to(sidebarRef.current, {
        width: collapsed ? 72 : 272,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Mobile: animate slide in/out
      gsap.to(sidebarRef.current, {
        x: collapsed ? -272 : 0,
        width: 272,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [collapsed]);

  // Fetch all chats on component mount
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/chats`, { withCredentials: true });
      if (response.data?.data) {
        setChats(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      // Could add toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    if (creatingNewChat) return; // Prevent multiple clicks
    
    setCreatingNewChat(true);
    
    try {
      // Create new chat via API
      const response = await axios.post(
        `${baseUrl}/chats/new`, 
        { title: "New Chat" }, 
        { withCredentials: true }
      );
      
      if (response.data?.data) {
        const newChat = response.data.data;
        
        // Add the new chat to the top of the list
        setChats(prev => [newChat, ...prev]);
        
        // Navigate to the new chat
        navigate(`/chat/${newChat.chatId}`);
        
        // Close sidebar on mobile after creating chat
        if (window.innerWidth < 768) {
          setCollapsed(true);
        }
      }
    } catch (error) {
      console.error("Failed to create new chat:", error);
      // Fallback: navigate to /chat and let the Chat component handle creation
      navigate('/chat');
    } finally {
      setCreatingNewChat(false);
    }
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
    
    // Close sidebar on mobile after selecting chat
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  const deleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent chat navigation when deleting
    
    // Optimistic update - remove from UI immediately
    const previousChats = [...chats];
    setChats(prev => prev.filter(chat => chat.chatId !== chatId));
    
    try {
      await axios.delete(`${baseUrl}/chats/${chatId}`, { withCredentials: true });
      
      // If we're currently viewing this chat, navigate away
      if (currentChatId === chatId) {
        const remainingChats = chats.filter(chat => chat.chatId !== chatId);
        if (remainingChats.length > 0) {
          navigate(`/chat/${remainingChats[0].chatId}`);
        } else {
          // No chats left, create a new one or go home
          handleNewChat();
        }
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      // Rollback optimistic update on error
      setChats(previousChats);
      // Could add toast notification here
    }
  };

  // Generate chat title from first user message or use default
  const getChatTitle = (chat: Chat) => {
    if (chat.title && chat.title !== "New Chat") {
      return chat.title;
    }
    
    // Try to find first user message
    for (const provider of chat.providers || []) {
      if (provider.messages && provider.messages.length > 0) {
        const firstUserMessage = provider.messages.find((msg: any) => 
          msg.provider?.includes('149071.png') // User avatar
        );
        if (firstUserMessage) {
          return firstUserMessage.text.length > 30 
            ? `${firstUserMessage.text.substring(0, 30)}...`
            : firstUserMessage.text;
        }
      }
    }
    
    return "New Chat";
  };

  return (
    <>
      {/* Floating toggle button (always visible on mobile, inside sidebar on desktop) */}
      <button
        onClick={toggle}
        aria-expanded={!collapsed}
        aria-label="Toggle Sidebar"
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-full bg-[#282A2C] text-white hover:bg-[#3a3d3f] transition-colors"
      >
        <i className="fa-solid fa-bars" />
      </button>

      {/* Sidebar container */}
      <div
        ref={sidebarRef}
        className="sidebar fixed md:relative top-0 left-0 h-screen bg-[#282A2C] p-3 flex flex-col justify-start overflow-hidden z-40"
        style={{ width: 72 }} // default for desktop, overridden by GSAP
      >
        {/* Top toggle for desktop */}
        <div className="hidden md:flex w-full h-[50px] items-center justify-center">
          <button
            onClick={toggle}
            aria-expanded={!collapsed}
            aria-label="Toggle Sidebar"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>

        {/* Sidebar content */}
        {!collapsed && (
          <button 
            onClick={handleNewChat}
            disabled={creatingNewChat}
            className={`mt-3 sidebarchat text-nowrap text-white w-full my-1 rounded-2xl py-2 flex items-center px-2 hover:bg-[#3a3d3f] transition text-[15px] ${
              creatingNewChat ? 'opacity-50 cursor-not-allowed' : ''
            }`} 
          > 
            <i className={`fa-solid ${creatingNewChat ? 'fa-spinner fa-spin' : 'fa-plus'} pr-4 flex items-center justify-center pt-[2px]`}></i> 
            {creatingNewChat ? 'Creating...' : 'New Chat'}
          </button>
        )}
        
        {!collapsed && (
          <div className="sidebarBottom w-full h-full mt-3 pl-3 overflow-y-auto">
            <div className="sticky top-0 bg-[#282A2C] pb-1">
              <h4 className="text-[#9A9B9C]">Recent</h4>
            </div>

            {loading ? (
              <div className="text-[#9B9B9C] text-sm py-2 flex items-center">
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Loading chats...
              </div>
            ) : chats.length === 0 ? (
              <div className="text-[#9B9B9C] text-sm py-2 text-center">
                <p>No chats yet</p>
                <p className="text-xs mt-1 opacity-75">Click "New Chat" to start</p>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`group sidebarchat text-nowrap w-full my-1 rounded-2xl py-2 flex items-center px-2 hover:bg-[#3a3d3f] transition text-[15px] cursor-pointer ${
                    currentChatId === chat.chatId ? 'bg-[#3a3d3f]' : ''
                  }`}
                  onClick={() => handleChatClick(chat.chatId)}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <i className="fa-regular fa-message text-[#9B9B9C] text-xs mr-2 flex-shrink-0"></i>
                    <p className="truncate text-[#9B9B9C] flex-1">
                      {getChatTitle(chat)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat.chatId, e)}
                    className="opacity-0 group-hover:opacity-100 ml-2 text-[#9B9B9C] hover:text-red-400 transition-all p-1 rounded"
                    title="Delete chat"
                  >
                    <i className="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Backdrop on mobile when sidebar open */}
      {!collapsed && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default SideBar;