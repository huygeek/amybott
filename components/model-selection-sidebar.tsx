"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  X,
  Search,
  Star,
  Brain,
  Cpu,
  Database,
  Globe,
  MessageCircle,
  Code,
  Layers,
  Zap,
  Bot,
  SparklesIcon,
  Plus,
} from "lucide-react"
import { useState } from "react"

// AI Models data
const aiModels = [
  // Favorites
  {
    id: "operations-pro",
    name: "Operations Pro",
    description: "Advanced model for complex warehouse operations and inventory management",
    icon: Brain,
    badge: "Premium",
    category: "favorites",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    description: "Advanced reasoning model for complex problem solving",
    icon: Cpu,
    badge: "Official",
    category: "favorites",
  },
  {
    id: "claude-4-sonnet",
    name: "Claude 4 Sonnet",
    description: "Balanced model with strong analytical capabilities",
    icon: SparklesIcon,
    badge: "Official",
    category: "favorites",
  },

  // Official Models
  {
    id: "operations-standard",
    name: "Operations Standard",
    description: "Balanced performance for daily warehouse tasks",
    icon: Bot,
    badge: "Standard",
    category: "official",
  },
  {
    id: "operations-fast",
    name: "Operations Fast",
    description: "Quick responses for simple queries and routine operations",
    icon: Zap,
    badge: "Fast",
    category: "official",
  },
  {
    id: "claude-4-opus",
    name: "Claude 4 Opus",
    description: "Most capable model for complex reasoning and analysis",
    icon: Layers,
    badge: "Official",
    category: "official",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    description: "Powerful model for technical and analytical tasks",
    icon: Database,
    badge: "Official",
    category: "official",
  },
  {
    id: "grok-3",
    name: "Grok 3",
    description: "Real-time information and conversational AI",
    icon: Globe,
    badge: "Official",
    category: "official",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Multimodal model with vision and text capabilities",
    icon: MessageCircle,
    badge: "Official",
    category: "official",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    description: "Latest version with improved reasoning capabilities",
    icon: Code,
    badge: "Official",
    category: "official",
  },
]

interface ModelSelectionSidebarProps {
  isOpen: boolean
  onClose: () => void
  selectedModel: string
  onSelectModel: (modelId: string) => void
  onCreateBot?: () => void
}

export function ModelSelectionSidebar({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
  onCreateBot,
}: ModelSelectionSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredModels = aiModels.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const favorites = filteredModels.filter((model) => model.category === "favorites")
  const official = filteredModels.filter((model) => model.category === "official")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">Select Model</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Create Bot Button */}
          {onCreateBot && (
            <div className="mb-3">
              <Button
                onClick={() => {
                  onCreateBot()
                  onClose()
                }}
                className="w-full h-8 text-xs font-medium"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Create Custom Bot
              </Button>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>

        {/* Model List */}
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-4">
            {/* Favorites */}
            {favorites.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-yellow-500" />
                  <h3 className="text-xs font-medium text-foreground">Favorites</h3>
                </div>
                <div className="space-y-1.5">
                  {favorites.map((model) => (
                    <ModelCard
                      key={model.id}
                      model={model}
                      isSelected={model.id === selectedModel}
                      onSelect={() => {
                        onSelectModel(model.id)
                        onClose()
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Official Models */}
            {official.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-foreground">Official Models</h3>
                <div className="space-y-1.5">
                  {official.map((model) => (
                    <ModelCard
                      key={model.id}
                      model={model}
                      isSelected={model.id === selectedModel}
                      onSelect={() => {
                        onSelectModel(model.id)
                        onClose()
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredModels.length === 0 && (
              <div className="text-center py-6">
                <p className="text-xs text-muted-foreground">No models found matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

interface ModelCardProps {
  model: any
  isSelected: boolean
  onSelect: () => void
}

function ModelCard({ model, isSelected, onSelect }: ModelCardProps) {
  const IconComponent = model.icon

  return (
    <Card
      className={`cursor-pointer transition-colors hover:bg-accent border ${
        isSelected ? "border-primary bg-accent" : "border-border"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-md flex-shrink-0">
            <IconComponent className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h4 className="font-medium text-xs truncate">{model.name}</h4>
              <Badge
                variant={model.badge === "Premium" ? "default" : "outline"}
                className="text-[10px] px-1.5 py-0 h-4 font-medium flex-shrink-0"
              >
                {model.badge}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground leading-4">{model.description}</p>
          </div>
          {isSelected && <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1"></div>}
        </div>
      </CardContent>
    </Card>
  )
}