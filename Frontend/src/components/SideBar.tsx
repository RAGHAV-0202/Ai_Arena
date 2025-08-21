import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../baseUrl.js";

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

  // Sidebar animation
  useEffect(() => {
    if (!sidebarRef.current) return;

    const mq = window.matchMedia("(min-width: 768px)");

    if (mq.matches) {
      gsap.to(sidebarRef.current, {
        width: collapsed ? 72 : 280,
        duration: 0.4,
        ease: "power3.out",
        backdropFilter: "blur(12px)",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: collapsed ? -300 : 0,
        width: 280,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [collapsed]);

  // Fetch chats
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/chats`, { withCredentials: true });
      setChats(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch chats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    if (creatingNewChat) return;
    setCreatingNewChat(true);

    try {
      const response = await axios.post(`${baseUrl}/chats/new`, { title: "New Chat" }, { withCredentials: true });
      const newChat = response.data?.data;
      if (newChat) {
        setChats(prev => [newChat, ...prev]);
        navigate(`/chat/${newChat.chatId}`);
        if (window.innerWidth < 768) setCollapsed(true);
      }
    } catch (err) {
      console.error("Failed to create chat:", err);
      navigate("/chat");
    } finally {
      setCreatingNewChat(false);
    }
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
    if (window.innerWidth < 768) setCollapsed(true);
  };

  const deleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const previousChats = [...chats];
    setChats(prev => prev.filter(c => c.chatId !== chatId));

    try {
      await axios.delete(`${baseUrl}/chats/${chatId}`, { withCredentials: true });
      if (currentChatId === chatId) {
        const remaining = chats.filter(c => c.chatId !== chatId);
        remaining.length ? navigate(`/chat/${remaining[0].chatId}`) : handleNewChat();
      }
    } catch (err) {
      console.error(err);
      setChats(previousChats);
    }
  };

  const getChatTitle = (chat: Chat) => {
    if (chat.title && chat.title !== "New Chat") return chat.title;

    for (const provider of chat.providers || []) {
      const firstUser = provider.messages?.find((m: any) => m.provider?.includes("149071.png"));
      if (firstUser) return firstUser.text.length > 30 ? `${firstUser.text.slice(0, 30)}...` : firstUser.text;
    }
    return "New Chat";
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={toggle}
        className="md:hidden fixed top-1/2 left-3 z-50 p-3 rounded-full bg-[#1F2123] text-white shadow-lg hover:bg-[#2A2D30] transition-colors -translate-y-1/2"
      >
        <i className="fa-solid fa-bars" />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="sidebar fixed md:relative top-0 left-0 h-screen bg-[#1F2123]/70 backdrop-blur-md shadow-xl p-3 flex flex-col overflow-hidden z-40 rounded-r-2xl"
        style={{ width: 72 }}
      >
        {/* Desktop toggle */}
        <div className="hidden md:flex w-full h-[50px] items-center justify-center">
          <button onClick={toggle} className="text-white hover:text-gray-300 transition">
            <i className="fa-solid fa-bars" />
          </button>
        </div>

        {/* New Chat Button */}
        {!collapsed && (
          <button
            onClick={handleNewChat}
            disabled={creatingNewChat}
            className={`mt-3 w-full flex items-center px-3 py-2 rounded-2xl text-white hover:bg-[#2A2D30] transition-all ${
              creatingNewChat ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <i className={`fa-solid ${creatingNewChat ? "fa-spinner fa-spin" : "fa-plus"} mr-3`}></i>
            {creatingNewChat ? "Creating..." : "New Chat"}
          </button>
        )}

        {/* Chat List */}
        {!collapsed && (
          <div className="sidebarBottom flex-1 mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div className="sticky top-0 bg-[#1F2123]/70 backdrop-blur-md py-2 px-2 rounded-b-xl shadow-sm mb-2">
              <h4 className="text-gray-400 uppercase text-xs tracking-wide">Recent</h4>
            </div>

            {loading ? (
              <div className="text-gray-400 text-sm py-2 flex items-center">
                <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading chats...
              </div>
            ) : chats.length === 0 ? (
              <div className="text-gray-500 text-sm py-4 text-center opacity-80">
                <p>No chats yet</p>
                <p className="text-xs mt-1">Click "New Chat" to start</p>
              </div>
            ) : (
              chats.map(chat => (
                <div
                  key={chat.chatId}
                  className={`group flex items-center justify-between p-2 mb-2 rounded-xl cursor-pointer transition-all hover:bg-[#2A2D30] ${
                    currentChatId === chat.chatId ? "bg-[#2A2D30]" : ""
                  }`}
                  onClick={() => handleChatClick(chat.chatId)}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <i className="fa-regular fa-message text-gray-400 text-sm mr-2 flex-shrink-0" />
                    <p className="truncate text-gray-300">{getChatTitle(chat)}</p>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat.chatId, e)}
                    className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400 hover:text-red-500 p-1 rounded transition-all"
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

      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}

export default SideBar;
