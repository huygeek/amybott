import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from './ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ModernIcons } from './ui/custom-icons';
import { 
  Plus, 
  Search,
  Users,
  UserPlus,
  Crown,
  Shield,
  Eye
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatar?: string;
  joinedDate: string;
  lastActive: string;
}

interface TeamMembersProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<TeamMember, 'id' | 'joinedDate' | 'lastActive'>) => void;
  member?: TeamMember;
  title: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Henry Pham',
    email: 'dev@bubobot.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2024-01-15',
    lastActive: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@bubobot.com',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5aa?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2024-02-01',
    lastActive: '1 hour ago'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@bubobot.com',
    role: 'Viewer',
    joinedDate: '2024-02-15',
    lastActive: '3 days ago'
  },
  {
    id: '4',
    name: 'Anna Wilson',
    email: 'anna.wilson@bubobot.com',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2024-03-01',
    lastActive: '5 hours ago'
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@bubobot.com',
    role: 'Viewer',
    joinedDate: '2024-03-10',
    lastActive: '1 day ago'
  }
];

const teamRoles = ['Admin', 'Editor', 'Viewer'] as const;

function getRoleBadgeColor(role: string) {
  switch (role) {
    case 'Admin':
      return 'bg-red-1 text-red-8 border-red-3';
    case 'Editor':
      return 'bg-blue-1 text-blue-8 border-blue-3';
    case 'Viewer':
      return 'bg-gray-3 text-gray-8 border-gray-4';
    default:
      return 'bg-gray-3 text-gray-8 border-gray-4';
  }
}

function getRoleIcon(role: string) {
  switch (role) {
    case 'Admin':
      return Crown;
    case 'Editor':
      return Shield;
    case 'Viewer':
      return Eye;
    default:
      return Eye;
  }
}

function AddMemberModal({ isOpen, onClose, onSave, member, title }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    role: member?.role || 'Viewer' as const
  });

  const handleSave = () => {
    if (formData.name.trim() && formData.email.trim()) {
      onSave(formData);
      onClose();
      setFormData({ name: '', email: '', role: 'Viewer' });
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', role: 'Viewer' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0 grok-floating">
        <DialogHeader className="px-5 py-4 border-b border-grok">
          <DialogTitle className="text-base font-medium text-grok-primary">{title}</DialogTitle>
          {member && (
            <DialogDescription className="text-xs text-grok-secondary">
              Update team member information and role assignment
            </DialogDescription>
          )}
          {!member && (
            <DialogDescription className="text-xs text-grok-secondary">
              Add a new team member to your workspace
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-grok-primary">Name</label>
            <Input
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="rounded-grok-lg h-9 text-sm"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-grok-primary">Email</label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="rounded-grok-lg h-9 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-grok-primary">Role</label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as any }))}>
              <SelectTrigger className="rounded-grok-lg h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {teamRoles.map((role) => {
                  const RoleIcon = getRoleIcon(role);
                  return (
                    <SelectItem key={role} value={role}>
                      <div className="flex items-center gap-2">
                        <RoleIcon className="h-3 w-3" />
                        <span className="text-xs font-medium">{role}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-grok">
          <Button
            variant="ghost" 
            onClick={handleCancel}
            className="text-grok-secondary hover:text-grok-primary h-8 px-3 text-xs"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.name.trim() || !formData.email.trim()}
            className="rounded-grok-lg shadow-grok-sm h-8 px-3 text-xs"
          >
            {member ? 'Save Changes' : 'Add Member'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TeamMembers({ isOpen, onClose }: TeamMembersProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | undefined>(undefined);

  const handleAddMember = () => {
    setEditingMember(undefined);
    setShowAddMemberModal(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setShowAddMemberModal(true);
  };

  const handleSaveMember = (memberData: Omit<TeamMember, 'id' | 'joinedDate' | 'lastActive'>) => {
    if (editingMember) {
      // Edit existing member
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === editingMember.id 
            ? { ...member, ...memberData }
            : member
        )
      );
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...memberData,
        joinedDate: new Date().toISOString().split('T')[0],
        lastActive: 'Just now'
      };
      setTeamMembers(prev => [...prev, newMember]);
    }
  };

  const handleDeleteMember = (member: TeamMember) => {
    if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
      setTeamMembers(prev => prev.filter(m => m.id !== member.id));
    }
  };

  const handleChangeRole = (memberId: string, newRole: 'Admin' | 'Editor' | 'Viewer') => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, role: newRole }
          : member
      )
    );
  };

  // Filter members based on search and role
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 grok-floating">
          <DialogHeader className="px-5 py-4 border-b border-grok">
            <DialogTitle className="text-lg font-medium text-grok-primary">
              Team Members
            </DialogTitle>
            <DialogDescription className="text-sm text-grok-secondary">
              Manage your team members and their permissions
            </DialogDescription>
          </DialogHeader>

          {/* Filters and Actions */}
          <div className="px-5 py-3 border-b border-grok">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-grok-tertiary" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 rounded-grok-lg h-8 text-xs"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-32 rounded-grok-lg h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admins</SelectItem>
                    <SelectItem value="Editor">Editors</SelectItem>
                    <SelectItem value="Viewer">Viewers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAddMember}
                className="rounded-grok-lg shadow-grok-sm h-8 px-3 text-xs"
              >
                <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                Add Member
              </Button>
            </div>
          </div>

          {/* Members List */}
          <ScrollArea className="flex-1 px-5 py-3">
            <div className="space-y-2">
              {filteredMembers.map((member) => {
                const RoleIcon = getRoleIcon(member.role);
                return (
                  <div
                    key={member.id}
                    className="p-3 grok-surface rounded-grok-lg hover:shadow-grok-sm transition-grok"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 shadow-grok-sm">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm font-medium text-grok-primary">{member.name}</h4>
                            <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${getRoleBadgeColor(member.role)}`}>
                              <RoleIcon className="h-2.5 w-2.5 mr-1" />
                              {member.role}
                            </Badge>
                          </div>
                          <p className="text-xs text-grok-secondary mb-0.5">{member.email}</p>
                          <div className="flex items-center gap-3 text-xs text-grok-tertiary">
                            <span>Joined {member.joinedDate}</span>
                            <span>•</span>
                            <span>Active {member.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Quick Role Change - Right aligned */}
                        <Select 
                          value={member.role} 
                          onValueChange={(value) => handleChangeRole(member.id, value as any)}
                        >
                          <SelectTrigger className="w-24 h-7 text-xs rounded-grok">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {teamRoles.map((role) => (
                              <SelectItem key={role} value={role} disabled={role === member.role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Actions Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="h-7 w-7 text-grok-secondary hover:text-grok-primary"
                            >
                              <ModernIcons.MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" sideOffset={4}>
                            <DropdownMenuItem
                              onClick={() => handleEditMember(member)}
                              className="flex items-center gap-2 cursor-pointer text-xs"
                            >
                              <ModernIcons.Edit className="h-3.5 w-3.5" />
                              Edit Member
                            </DropdownMenuItem>
                            {member.role !== 'Admin' && (
                              <DropdownMenuItem
                                onClick={() => handleDeleteMember(member)}
                                className="flex items-center gap-2 text-destructive hover:bg-red-3 hover:text-destructive cursor-pointer text-xs"
                              >
                                <ModernIcons.Trash className="h-3.5 w-3.5" />
                                Remove Member
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-8 w-8 text-grok-tertiary mx-auto mb-2" />
                <p className="text-xs text-grok-secondary">No members found matching your search.</p>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Member Modal */}
      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        onSave={handleSaveMember}
        member={editingMember}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
      />
    </>
  );
}
