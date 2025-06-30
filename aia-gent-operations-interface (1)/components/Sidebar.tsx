import React, { useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ModernIcons } from './ui/custom-icons';
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
  ChevronUp
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  chatHistory: ChatHistoryItem[];
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onEditChatName?: (chatId: string, newTitle: string) => void;
  onDeleteChat?: (chatId: string) => void;
  activeChatId: string;
  user: User;
  onSettings: () => void;
  onKnowledgeBase: () => void;
  onTeamMembers: () => void;
  onLogout: () => void;
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
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = () => {
    if (editingChatId && editTitle.trim() && onEditChatName) {
      onEditChatName(editingChatId, editTitle.trim());
    }
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditTitle('');
  };

  const handleDelete = (chatId: string) => {
    if (onDeleteChat && confirm('Are you sure you want to delete this chat?')) {
      onDeleteChat(chatId);
    }
  };

  return (
    <div className={`h-full grok-surface border-r transition-grok-transform flex flex-col ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Header with Premium Logo */}
      <div className="p-4 border-b border-grok">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              {/* Simple Logo */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-6 to-purple-9 flex items-center justify-center bg-[rgba(144,0,255,1)]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              
              {/* Brand name */}
              <h2 className="text-lg font-semibold text-grok-primary">
                Amybot
              </h2>
            </div>
          )}
          
          {/* Collapsed logo */}
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-6 to-purple-9 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleCollapse}
            className="text-grok-secondary hover:text-grok-primary hover:bg-purple-1 transition-all duration-200"
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
        <div className="px-4 pb-3 space-y-2 animate-slide-in">
          <Card className="grok-elevated">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-grok-tertiary">Số đơn đã tạo từ Zalo, Mess</p>
                  <p className="text-base font-semibold text-grok-primary mt-1">247</p>
                </div>
                <div className="p-2 bg-blue-1 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-blue-7" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="grok-elevated">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-grok-tertiary">Số phiếu nhập kho</p>
                  <p className="text-base font-semibold text-grok-primary mt-1">156</p>
                </div>
                <div className="p-2 bg-purple-1 rounded-lg">
                  <FileText className="h-4 w-4 text-purple-7" />
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
          className="w-full h-10 rounded-grok-lg shadow-grok-sm hover:shadow-grok interactive-grok bg-gradient-to-r from-purple-1 to-purple-2 border-purple-3 hover:from-purple-2 hover:to-purple-3 text-purple-9 font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          {!isCollapsed && "New Chat"}
        </Button>
      </div>

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden">
          <div className="px-4 pb-2">
            <p className="text-xs font-medium text-grok-tertiary uppercase tracking-wide">
              Recent Chats
            </p>
          </div>
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 pb-4">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative rounded-grok-lg transition-grok hover:bg-accent ${
                    activeChatId === chat.id 
                      ? 'bg-accent border border-border shadow-grok-sm' 
                      : ''
                  }`}
                >
                  <div className="flex items-center pr-2">
                    <button
                      onClick={() => onSelectChat(chat.id)}
                      className="flex-1 text-left p-3 rounded-grok-lg transition-grok"
                    >
                      {editingChatId === chat.id ? (
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                          onBlur={handleSaveEdit}
                          className="h-7 text-sm px-2 bg-background border-border focus-visible:border-blue-7 rounded-grok"
                          autoFocus
                        />
                      ) : (
                        <p className="font-medium text-sm text-grok-primary truncate pr-8">
                          {chat.title}
                        </p>
                      )}
                    </button>
                    
                    {editingChatId !== chat.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-grok-secondary hover:text-grok-primary"
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
                            className="flex items-center gap-2 text-destructive hover:bg-red-3 hover:text-destructive cursor-pointer"
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
                  className={`w-full p-2 rounded-grok-lg transition-grok hover:bg-accent ${
                    activeChatId === chat.id 
                      ? 'bg-accent border border-border shadow-grok-sm' 
                      : ''
                  }`}
                  title={chat.title}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-grok mx-auto">
                    <MessageSquare className="h-4 w-4 text-grok-secondary" />
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* User Profile at Bottom */}
      <div className="border-t border-grok">
        {!isCollapsed ? (
          /* Expanded User Profile */
          <div className="p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full p-2 h-auto rounded-grok-lg hover:bg-accent transition-grok justify-start"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-8 w-8 shadow-grok-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-grok-primary truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-grok-tertiary truncate">
                        {user.email}
                      </p>
                    </div>
                    <ChevronUp className="h-4 w-4 text-grok-secondary flex-shrink-0" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 mb-2"
                align="start"
                side="top"
                sideOffset={8}
              >
                <div className="px-3 py-2 border-b border-grok">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shadow-grok-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-grok-primary text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-grok-tertiary truncate">
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
                    <ModernIcons.Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onKnowledgeBase}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <ModernIcons.Database className="h-4 w-4" />
                    Knowledge Base
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onTeamMembers}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <ModernIcons.Users className="h-4 w-4" />
                    Team Members
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator />
                
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2 text-destructive hover:bg-red-1 hover:text-destructive"
                  >
                    <ModernIcons.LogOut className="h-4 w-4" />
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
                  className="w-full h-8 rounded-grok-lg hover:bg-accent transition-grok"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
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
                <div className="px-3 py-2 border-b border-grok">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shadow-grok-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-grok-primary text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-grok-tertiary truncate">
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
                    <ModernIcons.Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onKnowledgeBase}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <ModernIcons.Database className="h-4 w-4" />
                    Knowledge Base
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onTeamMembers}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2"
                  >
                    <ModernIcons.Users className="h-4 w-4" />
                    Team Members
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator />
                
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="flex items-center gap-3 cursor-pointer px-3 py-2 text-destructive hover:bg-red-1 hover:text-destructive"
                  >
                    <ModernIcons.LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
