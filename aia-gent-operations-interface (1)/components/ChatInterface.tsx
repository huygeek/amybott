import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Package, BarChart3, Edit, Upload, Bot, Sparkles, Search, FileText, Truck, FileCheck } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSuggestionClick?: (text: string) => void;
}

const suggestions = [
  { 
    icon: Edit, 
    text: 'Cập nhật đơn: Sửa thông tin đơn', 
    id: 'update-order'
  },
  { 
    icon: Search, 
    text: 'Tìm đơn hàng', 
    id: 'find-order'
  },
  { 
    icon: BarChart3, 
    text: 'Theo dõi trạng thái đơn', 
    id: 'track-order'
  },
  { 
    icon: Package, 
    text: 'Kiểm tra tồn kho', 
    id: 'check-inventory'
  },
  { 
    icon: FileText, 
    text: 'Tạo phiếu nhập kho', 
    id: 'create-import'
  },
  { 
    icon: Truck, 
    text: 'Tạo phiếu xuất kho', 
    id: 'create-export'
  },
];

export function ChatInterface({ messages, onSuggestionClick }: ChatInterfaceProps) {
  const isEmpty = messages.length === 0;

  return (
    <div className="h-full overflow-hidden pb-32 bg-grok-surface">
      {isEmpty ? (
        /* Premium Empty State */
        <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-2xl text-center space-y-8 animate-fade-in">
            {/* Premium Operations Agent Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-grok-2xl shadow-grok-lg hover-lift-subtle transition-grok">
                    <Bot className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-green-6 text-white border-0 px-2 py-1 text-xs shadow-grok-sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-grok-primary tracking-tight">
                  Operations Agent
                </h1>
                <p className="text-base text-grok-secondary max-w-xl mx-auto leading-relaxed">
                  Your intelligent assistant for warehouse management and sales operations. Ask me anything about orders, inventory, or operational tasks.
                </p>
              </div>
            </div>

            {/* Premium Suggestions */}
            <div className="space-y-4">
              <p className="text-sm text-grok-tertiary font-medium">Try these suggestions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    variant="outline"
                    onClick={() => onSuggestionClick?.(suggestion.text)}
                    className="group h-auto p-4 text-left flex items-start gap-3 rounded-grok-xl hover:shadow-grok-md interactive-grok"
                  >
                    <suggestion.icon className="h-5 w-5 text-grok-secondary group-hover:text-grok-primary transition-grok mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-grok-secondary group-hover:text-grok-primary transition-grok">
                      {suggestion.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Premium Status Indicators */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="secondary" className="bg-green-1 text-green-8 border-green-3 text-xs px-3 py-1.5">
                <div className="w-2 h-2 bg-green-6 rounded-full mr-2"></div>
                System Active
              </Badge>
              <Badge variant="outline" className="text-xs px-3 py-1.5">
                Premium AI
              </Badge>
            </div>
          </div>
        </div>
      ) : (
        /* Premium Messages */
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto p-6 space-y-8 pt-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-fade-in ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-10 w-10 shrink-0 shadow-grok-sm">
                  {message.type === 'assistant' ? (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  ) : (
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  )}
                </Avatar>
                
                <div className={`flex-1 space-y-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-grok-xl max-w-[85%] shadow-grok-sm transition-grok hover:shadow-grok-md ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'grok-elevated text-grok-primary'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-inherit">{message.content}</p>
                  </div>
                  <p className="text-xs text-grok-tertiary px-2 transition-grok">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
