"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { ChatInterface } from "./components/ChatInterface"
import { UIView } from "./components/UIView"
import { ModelSelectionSidebar } from "./components/ModelSelectionSidebar"
import { Settings } from "./components/Settings"
import { CreateBotFlow } from "./components/CreateBotFlow"
import { KnowledgeBase } from "./components/KnowledgeBase"
import { TeamMembers } from "./components/TeamMembers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import {
  Bot,
  MessageSquare,
  BarChart3,
  ArrowUp,
  ImageIcon,
  Brain,
  SparklesIcon,
  ChevronDown,
  Cpu,
  Database,
  Globe,
  MessageCircle,
  Code,
  Layers,
  Zap,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatHistoryItem {
  id: string
  title: string
  timestamp: string
  messages: Message[]
}

// Mock chat history data
const mockChatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "Kiểm tra đơn hàng ORD-001",
    timestamp: "2 hours ago",
    messages: [
      {
        id: "1",
        type: "user",
        content: "Kiểm tra trạng thái đơn hàng ORD-001",
        timestamp: "14:30",
      },
      {
        id: "2",
        type: "assistant",
        content:
          'Đơn hàng ORD-001 hiện đang ở trạng thái "Chờ xử lý". Khách hàng: Nguyễn Văn A, Tổng tiền: 1,250,000 VNĐ. Bạn có muốn cập nhật trạng thái không?',
        timestamp: "14:31",
      },
    ],
  },
  {
    id: "2",
    title: "Cập nhật tồn kho SP-003",
    timestamp: "1 day ago",
    messages: [],
  },
  {
    id: "3",
    title: "Tạo đơn hàng mới",
    timestamp: "2 days ago",
    messages: [],
  },
]

const mockUser = {
  name: "Henry Pham",
  email: "dev@bubobot.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
}

// Complete AI Models configuration
const aiModels = [
  {
    id: "operations-pro",
    name: "Operations Pro",
    description: "Advanced model for complex warehouse operations and inventory management",
    icon: Brain,
    badge: "Premium",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    description: "Advanced reasoning model for complex problem solving",
    icon: Cpu,
    badge: "Official",
  },
  {
    id: "claude-4-sonnet",
    name: "Claude 4 Sonnet",
    description: "Balanced model with strong analytical capabilities",
    icon: SparklesIcon,
    badge: "Official",
  },
  {
    id: "operations-standard",
    name: "Operations Standard",
    description: "Balanced performance for daily warehouse tasks",
    icon: Bot,
    badge: "Standard",
  },
  {
    id: "operations-fast",
    name: "Operations Fast",
    description: "Quick responses for simple queries and routine operations",
    icon: Zap,
    badge: "Fast",
  },
  {
    id: "claude-4-opus",
    name: "Claude 4 Opus",
    description: "Most capable model for complex reasoning and analysis",
    icon: Layers,
    badge: "Official",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    description: "Powerful model for technical and analytical tasks",
    icon: Database,
    badge: "Official",
  },
  {
    id: "grok-3",
    name: "Grok 3",
    description: "Real-time information and conversational AI",
    icon: Globe,
    badge: "Official",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Multimodal model with vision and text capabilities",
    icon: MessageCircle,
    badge: "Official",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    description: "Latest version with improved reasoning capabilities",
    icon: Code,
    badge: "Official",
  },
]

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [activeChatId, setActiveChatId] = useState<string>("1")
  const [selectedModel, setSelectedModel] = useState("operations-pro")
  const [isModelSidebarOpen, setIsModelSidebarOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false)
  const [isCreateBotOpen, setIsCreateBotOpen] = useState(false)
  const [isTeamMembersOpen, setIsTeamMembersOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(mockChatHistory)
  const [currentMessages, setCurrentMessages] = useState<Message[]>(
    mockChatHistory.find((chat) => chat.id === activeChatId)?.messages || [],
  )
  const [inputValue, setInputValue] = useState("")

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleNewChat = () => {
    const newChatId = Date.now().toString()
    const newChat: ChatHistoryItem = {
      id: newChatId,
      title: "New conversation",
      timestamp: "Just now",
      messages: [],
    }

    setChatHistory([newChat, ...chatHistory])
    setActiveChatId(newChatId)
    setCurrentMessages([])
    setActiveTab("chat")
  }

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId)
    const selectedChat = chatHistory.find((chat) => chat.id === chatId)
    setCurrentMessages(selectedChat?.messages || [])
    setActiveTab("chat")
  }

  const handleEditChatName = (chatId: string, newTitle: string) => {
    setChatHistory((prevHistory) =>
      prevHistory.map((chat) => (chat.id === chatId ? { ...chat, title: newTitle } : chat)),
    )
  }

  const handleDeleteChat = (chatId: string) => {
    setChatHistory((prevHistory) => prevHistory.filter((chat) => chat.id !== chatId))

    if (chatId === activeChatId) {
      const remainingChats = chatHistory.filter((chat) => chat.id !== chatId)
      if (remainingChats.length > 0) {
        const newActiveChatId = remainingChats[0].id
        setActiveChatId(newActiveChatId)
        setCurrentMessages(remainingChats[0].messages)
      } else {
        handleNewChat()
      }
    }
  }

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    const newMessages = [...currentMessages, userMessage]
    setCurrentMessages(newMessages)

    // Update chat history
    setChatHistory((prevHistory) =>
      prevHistory.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: newMessages,
              title: chat.title === "New conversation" ? content.slice(0, 50) + "..." : chat.title,
            }
          : chat,
      ),
    )

    // Clear input
    setInputValue("")

    // Simulate assistant response
    setTimeout(() => {
      const selectedModelInfo = aiModels.find((model) => model.id === selectedModel)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `[${selectedModelInfo?.name}] Tôi đã nhận được yêu cầu của bạn. Đây là phản hồi mẫu từ Operations Agent. Trong thực tế, tôi sẽ xử lý yêu cầu cụ thể của bạn và cung cấp thông tin chính xác về đơn hàng, tồn kho hoặc các tác vụ vận hành khác.`,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      const updatedMessages = [...newMessages, assistantMessage]
      setCurrentMessages(updatedMessages)

      setChatHistory((prevHistory) =>
        prevHistory.map((chat) => (chat.id === activeChatId ? { ...chat, messages: updatedMessages } : chat)),
      )
    }, 1500)
  }

  const handleUploadImage = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("File selected:", file.name)
      }
    }
    input.click()
  }

  const handleSettings = () => setIsSettingsOpen(true)
  const handleKnowledgeBase = () => setIsKnowledgeBaseOpen(true)
  const handleTeamMembers = () => setIsTeamMembersOpen(true)
  const handleCreateBot = () => setIsCreateBotOpen(true)

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      alert("Signed out successfully!")
    }
  }

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId)
  }

  const handleCreateBotSuccess = (botData: any) => {
    console.log("Bot created:", botData)
  }

  const currentModel = aiModels.find((model) => model.id === selectedModel)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="transition-all duration-300 ease-in-out">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onEditChatName={handleEditChatName}
          onDeleteChat={handleDeleteChat}
          activeChatId={activeChatId}
          user={mockUser}
          onSettings={handleSettings}
          onKnowledgeBase={handleKnowledgeBase}
          onTeamMembers={handleTeamMembers}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex h-14 items-center px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-sm grid-cols-2 h-9">
                <TabsTrigger value="chat" className="flex items-center gap-1.5 text-xs font-medium px-3">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Chat Assistant
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center gap-1.5 text-xs font-medium px-3">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Data Dashboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsContent value="chat" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
              <div className="flex-1 overflow-hidden">
                <ChatInterface messages={currentMessages} onSuggestionClick={handleSendMessage} />
              </div>
            </TabsContent>
            <TabsContent value="dashboard" className="h-full m-0 overflow-auto">
              <div className="pb-32">
                <UIView />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Chat Input - Fixed at bottom, only visible on chat tab */}
      {activeTab === "chat" && (
        <div
          className="fixed bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-40"
          style={{
            left: isSidebarCollapsed ? "64px" : "288px",
            right: "0",
          }}
        >
          <div className="p-4">
            {/* Model Selection Button */}
            <div className="flex justify-center mb-3">
              <Button
                variant="outline"
                onClick={() => setIsModelSidebarOpen(true)}
                className="h-8 px-3 bg-background border-input hover:bg-accent hover:text-accent-foreground text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  {currentModel && (
                    <>
                      <currentModel.icon className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">{currentModel.name}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-medium">
                        {currentModel.badge}
                      </Badge>
                    </>
                  )}
                  <ChevronDown className="h-3 w-3 ml-0.5 text-muted-foreground" />
                </div>
              </Button>
            </div>

            {/* Chat Input Form */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-xl border bg-background shadow-sm p-3">
                <div className="flex items-end gap-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Operations Agent..."
                    className="flex-1 min-h-[44px] max-h-32 resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 leading-5"
                    rows={1}
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Upload Image Button */}
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={handleUploadImage}
                      className="h-8 w-8 hover:bg-accent"
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only">Upload image</span>
                    </Button>

                    {/* Send Button */}
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim()}
                      className="h-8 w-8"
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground text-center mt-2 leading-4">
                Operations Agent can make mistakes. Please verify important information.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ModelSelectionSidebar
        isOpen={isModelSidebarOpen}
        onClose={() => setIsModelSidebarOpen(false)}
        selectedModel={selectedModel}
        onSelectModel={handleSelectModel}
        onCreateBot={handleCreateBot}
      />

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <KnowledgeBase isOpen={isKnowledgeBaseOpen} onClose={() => setIsKnowledgeBaseOpen(false)} />

      <TeamMembers isOpen={isTeamMembersOpen} onClose={() => setIsTeamMembersOpen(false)} />

      <CreateBotFlow
        isOpen={isCreateBotOpen}
        onClose={() => setIsCreateBotOpen(false)}
        onSuccess={handleCreateBotSuccess}
      />
    </div>
  )
}
