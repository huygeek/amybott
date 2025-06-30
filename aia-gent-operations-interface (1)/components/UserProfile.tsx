import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Settings, LogOut, User, ChevronDown, Database } from 'lucide-react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface UserProfileProps {
  user: User;
  onSettings: () => void;
  onKnowledgeBase?: () => void;
  onLogout: () => void;
}

export function UserProfile({ user, onSettings, onKnowledgeBase, onLogout }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 h-auto rounded-grok-lg hover:bg-accent transition-grok">
          <Avatar className="h-8 w-8 shadow-grok-sm">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-grok-primary leading-none">{user.name}</p>
              <p className="text-xs text-grok-tertiary mt-1">{user.email}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-grok-secondary transition-grok" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 grok-floating" 
        align="end" 
        sideOffset={8}
      >
        {/* User Info Header */}
        <div className="px-3 py-3 border-b border-grok">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 shadow-grok-sm">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-grok-primary truncate">{user.name}</p>
              <p className="text-xs text-grok-tertiary truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <DropdownMenuItem
            onClick={onSettings}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-grok transition-grok hover:bg-accent"
          >
            <Settings className="h-4 w-4 text-grok-secondary" />
            <span className="text-sm text-grok-primary">Settings</span>
          </DropdownMenuItem>
          
          {onKnowledgeBase && (
            <DropdownMenuItem
              onClick={onKnowledgeBase}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-grok transition-grok hover:bg-accent"
            >
              <Database className="h-4 w-4 text-grok-secondary" />
              <span className="text-sm text-grok-primary">Knowledge Base</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator className="my-1 bg-border" />
          
          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-grok transition-grok text-destructive hover:bg-red-1 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
