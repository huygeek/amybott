"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  PanelLeftClose, 
  PanelLeft, 
  Bot, 
  MessageSquare, 
  FileText, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  MessageCircle,
  Sparkles,
  ChevronUp,
  Settings,
  Database,
  Users,
  LogOut
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

interface User {
  name: string
  email: string
  avatar: string
}

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  chatHistory: ChatHistoryItem[]
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  onEditChatName?: (chatId: string, newTitle: string) => void
  onDeleteChat?: (chatId: string) => void
  activeChatId: string
  user: User
  onSettings: () => void
  onKnowledgeBase: () => void
  onTeamMembers: () => void
  onLogout: () => void
}

export function Sidebar({ 
  isCollapsed, 
  onToggleCollapse, 
  chatHistory, 
  onNewChat, 
  onSelectChat, 
  onEditChatName,
  onDeleteChat,
  activeChatId,
  user,
  onSettings,
  onKnowledgeBase,
  onTeamMembers,
  onLogout
}: SidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  const handleStartEdit = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId)
    setEditTitle(currentTitle)
  }

  const handleSaveEdit = () => {
    if (editingChatId && editTitle.trim() && onEditChatName) {
      onEditChatName(editingChatId, editTitle.trim())
    }
    setEditingChatId(null)
    setEditTitle("")
  }

  const handleCancelEdit = () => {
    setEditingChatId(null)
    setEditTitle("")
  }

  const handleDelete = (chatId: string) => {
    if (onDeleteChat && confirm("Are you sure you want to delete this chat?")) {
      onDeleteChat(chatId)
    }
  }

  return (
    <div className={`h-full bg-card border-r transition-all duration-300 flex flex-col ${
      isCollapsed ? "w-16" : "w-72"
    }`}>
      {/* Header with Premium Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              {/* Simple Logo */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              
              {/* Brand name */}
              <h2 className="text-lg font-semibold text-foreground">
                Amybot
              </h2>
            </div>
          )}
          
          {/* Collapsed logo */}
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {!isCollapsed && (
        <div className="px-4 pb-3 space-y-2">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Số đơn đã tạo từ Zalo, Mess</p>
                  <p className="text-base font-semibold text-foreground mt-1">247</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Số phiếu nhập kho</p>
                  <p className="text-base font-semibold text-foreground mt-1">156</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-4 w-4 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          variant="outline"
          className="w-full h-10 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 text-purple-900 font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          {!isCollapsed && "New Chat"}
        </Button>
      </div>

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden">
          <div className="px-4 pb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Recent Chats
            </p>
          </div>
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 pb-4">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative rounded-lg transition-colors hover:bg-accent ${
                    activeChatId === chat.id 
                      ? "bg-accent border border-border shadow-sm" 
                      : ""
                  }`}
                >
                  <div className="flex items-center pr-2">
                    <button
                      onClick={() => onSelectChat(chat.id)}
                      className="flex-1 text-left p-3 rounded-lg transition-colors"
                    >
                      {editingChatId === chat.id ? (
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveEdit()
                            } else if (e.key === "Escape") {
                              handleCancelEdit()
                            }
                          }}
                          onBlur={handleSaveEdit}
                          className="h-7 text-sm px-2 bg-background border-border focus-visible:border-blue-500"
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-sm text-foreground truncate pr-8">
                          {chat.title}
                        </p>
                      )}
                    </button>
                    
                    {editingChatId !== chat.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          className="w-40"
                          align="end"
                          sideOffset={4}
                        >
                          <DropdownMenuItem
                            onClick={() => handleStartEdit(chat.id, chat.title)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit name
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(chat.id)}
                            className="flex items-center gap-2 text-destructive hover:bg-red-50 hover:text-destructive cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Collapsed Chat History */}
      {isCollapsed && (
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-2 pb-4">
              {chatHistory.slice(0, 8).map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full p-2 rounded-lg transition-colors hover:bg-accent ${
                    activeChatId === chat.id 
                      ? "bg-accent border border-border shadow-sm" 
                      : ""
                  }`}
                  title={chat.title}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg mx-auto">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* User Profile at Bottom */}
      <div className="border-t">
        {!isCollapsed ? (
          /* Expanded User Profile */
          <div className="p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full p-2 h-auto rounded-lg hover:bg-accent transition-colors justify-start"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-8 w-8 shadow-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 mb-2"
                align="start"
                side="top"
                sideOffset={8}
              >
                <div className="px-3 py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shadow-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={onSettings}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onKnowledgeBase}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <Database className="h-4 w-4" />
                    Knowledge Base
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onTeamMembers}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <Users className="h-4 w-4" />
                    Team Members
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator />
                
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2 text-destructive hover:bg-red-50 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          /* Collapsed User Profile */
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full h-8 rounded-lg hover:bg-accent transition-colors"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 ml-2"
                align="start"
                side="right"
                sideOffset={8}
              >
                <div className="px-3 py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shadow-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={onSettings}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onKnowledgeBase}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <Database className="h-4 w-4" />
                    Knowledge Base
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onTeamMembers}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <Users className="h-4 w-4" />
                    Team Members
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator />
                
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2 text-destructive hover:bg-red-50 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}