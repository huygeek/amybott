"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  User, 
  Palette, 
  Zap,
  Check,
  Plus
} from "lucide-react"

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

interface AddIntegrationModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string, url: string) => void
}

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Zap },
]

const workRoles = [
  "Warehouse Manager",
  "Operations Supervisor", 
  "Inventory Specialist",
  "Sales Coordinator",
  "Logistics Manager",
  "Supply Chain Analyst",
  "Other"
]

const integrations = [
  {
    id: "zalo",
    name: "Zalo",
    icon: "💬",
    connected: true
  },
  {
    id: "messenger",
    name: "Messenger",
    icon: "📩",
    connected: true
  },
  {
    id: "google-drive",
    name: "Google Drive",
    icon: "📁",
    connected: false
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: "📧",
    connected: false
  }
]

function AddIntegrationModal({ isOpen, onClose, onAdd }: AddIntegrationModalProps) {
  const [integrationName, setIntegrationName] = useState("")
  const [integrationUrl, setIntegrationUrl] = useState("")

  const handleAdd = () => {
    if (integrationName.trim() && integrationUrl.trim()) {
      onAdd(integrationName.trim(), integrationUrl.trim())
      setIntegrationName("")
      setIntegrationUrl("")
      onClose()
    }
  }

  const handleCancel = () => {
    setIntegrationName("")
    setIntegrationUrl("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-medium">Add integration</DialogTitle>
            <Badge variant="outline" className="text-xs">
              BETA
            </Badge>
          </div>
          <DialogDescription className="text-sm mt-2">
            Create a custom integration by providing a name and URL endpoint.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Integration name"
              value={integrationName}
              onChange={(e) => setIntegrationName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Input
              placeholder="Integration URL"
              value={integrationUrl}
              onChange={(e) => setIntegrationUrl(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <Button
            variant="ghost" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!integrationName.trim() || !integrationUrl.trim()}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const [activeSection, setActiveSection] = useState("profile")
  const [showAddIntegration, setShowAddIntegration] = useState(false)
  const [connectedIntegrations, setConnectedIntegrations] = useState(integrations)
  const [profile, setProfile] = useState({
    fullName: "Henry Pham",
    displayName: "Henry",
    workRole: "Warehouse Manager",
    email: "dev@bubobot.com",
    language: "Vietnamese",
    timezone: "UTC+7"
  })

  const handleAddIntegration = (name: string, url: string) => {
    const newIntegration = {
      id: Date.now().toString(),
      name,
      icon: "🔗",
      connected: true
    }
    setConnectedIntegrations([...connectedIntegrations, newIntegration])
  }

  const handleConnectIntegration = (integrationId: string) => {
    setConnectedIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    )
  }

  if (!isOpen) return null

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-800 to-purple-900 shadow-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Update your account details and preferences</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <Input
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Work Role</label>
            <Select value={profile.workRole} onValueChange={(value) => setProfile(prev => ({ ...prev, workRole: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {workRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={profile.language} onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select value={profile.timezone} onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC+7">UTC+7 (Ho Chi Minh)</SelectItem>
                  <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                  <SelectItem value="UTC-5">UTC-5 (New York)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderIntegrationsSection = () => (
    <div className="space-y-4">
      {/* Integrations List */}
      <div className="space-y-3">
        {connectedIntegrations.map((integration) => (
          <div key={integration.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg text-lg">
                {integration.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium">{integration.name}</h4>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {integration.connected ? (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                  <Check className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8 px-3"
                  onClick={() => handleConnectIntegration(integration.id)}
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {/* Add Integration Card */}
        <div 
          onClick={() => setShowAddIntegration(true)}
          className="flex items-center justify-center p-4 bg-card rounded-lg border-2 border-dashed border-muted hover:border-purple-300 transition-colors cursor-pointer hover:bg-purple-50"
        >
          <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Add integration</h4>
              <p className="text-xs text-muted-foreground">Connect a new service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection()
      case "integrations":
        return renderIntegrationsSection()
      case "appearance":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize your interface preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Theme and display options coming soon...</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your account settings and preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r p-6 flex-shrink-0">
              <nav className="space-y-1">
                {settingsSections.map((section) => {
                  const IconComponent = section.icon
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "secondary" : "ghost"}
                      className={`w-full justify-start transition-colors ${
                        activeSection === section.id 
                          ? "bg-accent shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <IconComponent className="mr-3 h-4 w-4" />
                      {section.label}
                    </Button>
                  )
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
                <h2 className="text-xl font-semibold capitalize">
                  {settingsSections.find(s => s.id === activeSection)?.label}
                </h2>
              </div>
              
              <ScrollArea className="flex-1 p-6">
                {renderSection()}
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Integration Modal */}
      <AddIntegrationModal
        isOpen={showAddIntegration}
        onClose={() => setShowAddIntegration(false)}
        onAdd={handleAddIntegration}
      />
    </>
  )
}