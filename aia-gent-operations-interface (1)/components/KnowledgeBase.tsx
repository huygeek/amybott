import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  Plus, 
  FileText, 
  Upload, 
  ExternalLink,
  Calendar,
  Trash2,
  Edit
} from 'lucide-react';

interface KnowledgeBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddTextContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

interface KnowledgeItem {
  id: string;
  title: string;
  type: 'text' | 'file' | 'drive';
  date: string;
  size?: string;
}

// Mock knowledge base history
const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: '1',
    title: 'Quy trình xử lý đơn hàng',
    type: 'text',
    date: '2024-01-20'
  },
  {
    id: '2',
    title: 'Hướng dẫn sử dụng kho',
    type: 'file',
    date: '2024-01-18',
    size: '2.4 MB'
  },
  {
    id: '3',
    title: 'FAQ Khách hàng',
    type: 'text',
    date: '2024-01-15'
  },
  {
    id: '4',
    title: 'Báo cáo tồn kho Q4',
    type: 'drive',
    date: '2024-01-12',
    size: '1.8 MB'
  },
  {
    id: '5',
    title: 'Chính sách đổi trả',
    type: 'text',
    date: '2024-01-10'
  },
  {
    id: '6',
    title: 'Manual vận hành',
    type: 'file',
    date: '2024-01-08',
    size: '5.2 MB'
  }
];

function AddTextContentModal({ isOpen, onClose, onSave }: AddTextContentModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title.trim(), content.trim());
      setTitle('');
      setContent('');
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 grok-floating">
        <DialogHeader className="px-5 py-4 border-b border-grok">
          <DialogTitle className="text-base font-medium text-grok-primary">Add Text Content</DialogTitle>
          <DialogDescription className="text-sm text-grok-secondary">
            Create new text content to add to your knowledge base
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-grok-primary">Title</label>
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-grok-lg h-9 text-sm"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-grok-primary">Content</label>
            <Textarea
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-grok-lg min-h-[180px] resize-none text-sm"
            />
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
            disabled={!title.trim() || !content.trim()}
            className="rounded-grok-lg shadow-grok-sm h-8 px-3 text-xs"
          >
            Save Content
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getTypeIcon(type: KnowledgeItem['type']) {
  switch (type) {
    case 'text':
      return FileText;
    case 'file':
      return Upload;
    case 'drive':
      return ExternalLink;
    default:
      return FileText;
  }
}

function getTypeBadge(type: KnowledgeItem['type']) {
  switch (type) {
    case 'text':
      return { label: 'Text', color: 'bg-blue-1 text-blue-8 border-blue-3' };
    case 'file':
      return { label: 'File', color: 'bg-purple-1 text-purple-8 border-purple-3' };
    case 'drive':
      return { label: 'Drive', color: 'bg-green-1 text-green-8 border-green-3' };
    default:
      return { label: 'Text', color: 'bg-blue-1 text-blue-8 border-blue-3' };
  }
}

export function KnowledgeBase({ isOpen, onClose }: KnowledgeBaseProps) {
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(mockKnowledgeItems);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.txt,.csv';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      console.log('Files to upload:', files);
      // Handle file upload logic here
    };
    input.click();
  };

  const handleGoogleDriveUpload = () => {
    // Handle Google Drive integration
    console.log('Google Drive upload');
    // This would typically open Google Drive picker or authentication flow
  };

  const handleSaveTextContent = (title: string, content: string) => {
    console.log('Saving text content:', { title, content });
    // Add new item to the beginning of the list
    const newItem: KnowledgeItem = {
      id: Date.now().toString(),
      title,
      type: 'text',
      date: new Date().toISOString().split('T')[0]
    };
    setKnowledgeItems([newItem, ...knowledgeItems]);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setKnowledgeItems(items => items.filter(item => item.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 gap-0 grok-floating">
          <DialogHeader className="px-5 py-4 border-b border-grok">
            <DialogTitle className="text-base font-medium text-grok-primary">
              Knowledge Base
            </DialogTitle>
            <DialogDescription className="text-sm text-grok-secondary">
              Manage your AI agent's knowledge sources and training data
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-5 py-4">
              <div className="space-y-6">
                {/* Add Knowledge Options - In One Row */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-grok-primary">Add Knowledge</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Add Text Content */}
                    <Card className="grok-surface hover:shadow-grok-md transition-grok cursor-pointer" onClick={() => setShowAddTextModal(true)}>
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-1 rounded-lg">
                            <FileText className="h-4 w-4 text-blue-7" />
                          </div>
                          <h4 className="text-sm font-medium text-grok-primary">Add text content</h4>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Upload File */}
                    <Card className="grok-surface hover:shadow-grok-md transition-grok cursor-pointer" onClick={handleFileUpload}>
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-1 rounded-lg">
                            <Upload className="h-4 w-4 text-purple-7" />
                          </div>
                          <h4 className="text-sm font-medium text-grok-primary">Upload file</h4>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Upload from Google Drive */}
                    <Card className="grok-surface hover:shadow-grok-md transition-grok cursor-pointer" onClick={handleGoogleDriveUpload}>
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-1 rounded-lg">
                            <ExternalLink className="h-4 w-4 text-green-7" />
                          </div>
                          <h4 className="text-sm font-medium text-grok-primary">Upload from Google Drive</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Knowledge History */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-grok-primary">Knowledge History</h3>
                    <span className="text-xs text-grok-tertiary">{knowledgeItems.length} items</span>
                  </div>
                  
                  <div className="space-y-2">
                    {knowledgeItems.map((item) => {
                      const IconComponent = getTypeIcon(item.type);
                      const badge = getTypeBadge(item.type);
                      
                      return (
                        <Card key={item.id} className="grok-surface hover:shadow-grok-md transition-grok">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-2 rounded-lg">
                                  <IconComponent className="h-4 w-4 text-gray-7" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-medium text-grok-primary truncate">{item.title}</h4>
                                    <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${badge.color}`}>
                                      {badge.label}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-grok-tertiary">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {item.date}
                                    </div>
                                    {item.size && (
                                      <span>{item.size}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon-sm" 
                                  className="h-7 w-7 text-grok-secondary hover:text-grok-primary"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon-sm" 
                                  onClick={() => handleDeleteItem(item.id)}
                                  className="h-7 w-7 text-destructive hover:bg-red-1"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {knowledgeItems.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="h-8 w-8 text-grok-tertiary mx-auto mb-2" />
                      <p className="text-xs text-grok-secondary">No knowledge items yet. Add some content to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Text Content Modal */}
      <AddTextContentModal
        isOpen={showAddTextModal}
        onClose={() => setShowAddTextModal(false)}
        onSave={handleSaveTextContent}
      />
    </>
  );
}
