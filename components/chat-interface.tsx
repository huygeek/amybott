"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, BarChart3, Edit, Upload, Bot, Sparkles, Search, FileText, Truck, FileCheck } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatInterfaceProps {
  messages: Message[]
  onSuggestionClick?: (text: string) => void
}

const suggestions = [
  { 
    icon: Edit, 
    text: "Cập nhật đơn: Sửa thông tin đơn", 
    id: "update-order"
  },
  { 
    icon: Search, 
    text: "Tìm đơn hàng", 
    id: "find-order"
  },
  { 
    icon: BarChart3, 
    text: "Theo dõi trạng thái đơn", 
    id: "track-order"
  },
  { 
    icon: Package, 
    text: "Kiểm tra tồn kho", 
    id: "check-inventory"
  },
  { 
    icon: FileText, 
    text: "Tạo phiếu nhập kho", 
    id: "create-import"
  },
  { 
    icon: Truck, 
    text: "Tạo phiếu xuất kho", 
    id: "create-export"
  },
]

export function ChatInterface({ messages, onSuggestionClick }: ChatInterfaceProps) {
  const isEmpty = messages.length === 0

  return (
    <div className="h-full overflow-hidden pb-32 bg-background">
      {isEmpty ? (
        /* Empty State */
        <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-2xl text-center space-y-8">
            {/* Operations Agent Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <Bot className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-green-600 text-white border-0 px-2 py-1 text-xs shadow-sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-foreground tracking-tight">
                  Operations Agent
                </h1>
                <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  Your intelligent assistant for warehouse management and sales operations. Ask me anything about orders, inventory, or operational tasks.
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">Try these suggestions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    variant="outline"
                    onClick={() => onSuggestionClick?.(suggestion.text)}
                    className="group h-auto p-4 text-left flex items-start gap-3 rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    <suggestion.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {suggestion.text}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs px-3 py-1.5">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                System Active
              </Badge>
              <Badge variant="outline" className="text-xs px-3 py-1.5">
                Premium AI
              </Badge>
            </div>
          </div>
        </div>
      ) : (
        /* Messages */
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto p-6 space-y-8 pt-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.type === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-10 w-10 shrink-0 shadow-sm">
                  {message.type === "assistant" ? (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  ) : (
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  )}
                </Avatar>
                
                <div className={`flex-1 space-y-2 ${message.type === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block p-4 rounded-xl max-w-[85%] shadow-sm transition-all duration-200 hover:shadow-md ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border"
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-inherit">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground px-2">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}