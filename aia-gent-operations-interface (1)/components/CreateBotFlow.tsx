import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { 
  X, 
  ArrowLeft, 
  ChevronDown, 
  Upload, 
  Globe,
  HelpCircle,
  FileText,
  MessageCircle,
  Bot,
  Brain,
  Zap,
  Sparkles,
  CheckCircle,
  Plus,
  Minus,
  ExternalLink,
  User,
  Lock
} from 'lucide-react';

interface CreateBotFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (botData: any) => void;
}

interface BotFormData {
  name: string;
  prompt: string;
  model: string;
  accessibility: string;
  documents: File[];
  websites: string[];
  faqs: { question: string; answer: string; }[];
}

const aiModels = [
  { id: 'gpt-4o', name: 'GPT-4o', badge: 'Official', icon: MessageCircle },
  { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', badge: 'Official', icon: Sparkles },
  { id: 'operations-pro', name: 'Operations Pro', badge: 'Premium', icon: Brain },
  { id: 'deepseek-r1', name: 'DeepSeek R1', badge: 'Official', icon: Brain },
  { id: 'operations-fast', name: 'Operations Fast', badge: 'Fast', icon: Zap }
];

const accessibilityOptions = [
  { id: 'everyone', label: 'Everyone', icon: Globe },
  { id: 'only-me', label: 'Only me', icon: Lock }
];

export function CreateBotFlow({ isOpen, onClose, onSuccess }: CreateBotFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<BotFormData>({
    name: '',
    prompt: '',
    model: 'gpt-4o',
    accessibility: 'everyone',
    documents: [],
    websites: [''],
    faqs: [{ question: '', answer: '' }]
  });

  const updateFormData = (field: keyof BotFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleCancel = () => {
    setCurrentStep(1);
    setFormData({
      name: '',
      prompt: '',
      model: 'gpt-4o',
      accessibility: 'everyone',
      documents: [],
      websites: [''],
      faqs: [{ question: '', answer: '' }]
    });
    onClose();
  };

  const handleCreate = () => {
    // Simulate bot creation
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    handleCancel(); // Reset form and close
    onSuccess(formData);
  };

  const addWebsite = () => {
    setFormData(prev => ({
      ...prev,
      websites: [...prev.websites, '']
    }));
  };

  const updateWebsite = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      websites: prev.websites.map((site, i) => i === index ? value : site)
    }));
  };

  const removeWebsite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      websites: prev.websites.filter((_, i) => i !== index)
    }));
  };

  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.txt,.csv';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...files]
      }));
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Create Bot Modal */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-60 smooth-transition" onClick={handleCancel} />
      
      <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl elevation-4 flex overflow-hidden animate-fade-in">
          {/* Sidebar Navigation */}
          <div className="w-80 bg-gray-50 border-r border-border p-6">
            <div className="flex items-center gap-3 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="h-8 w-8 hover:bg-gray-200 smooth-transition rounded-grok"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="font-semibold text-lg">Create an Agent</h1>
            </div>

            <div className="space-y-2">
              <div className={`flex items-center gap-3 p-3 rounded-lg smooth-transition ${
                currentStep === 1 ? 'bg-black/5 border-l-4 border-black' : 'text-muted-foreground'
              }`}>
                <span className="font-medium">1. General info*</span>
              </div>
              
              <div className={`flex items-center gap-3 p-3 rounded-lg smooth-transition ${
                currentStep === 2 ? 'bg-black/5 border-l-4 border-black' : 'text-muted-foreground'
              }`}>
                <span className="font-medium">2. Knowledge*</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto p-8">
              {currentStep === 1 ? (
                <GeneralInfoStep 
                  formData={formData} 
                  updateFormData={updateFormData}
                />
              ) : (
                <KnowledgeStep 
                  formData={formData}
                  updateFormData={updateFormData}
                  onFileUpload={handleFileUpload}
                  addWebsite={addWebsite}
                  updateWebsite={updateWebsite}
                  removeWebsite={removeWebsite}
                  addFAQ={addFAQ}
                  updateFAQ={updateFAQ}
                  removeFAQ={removeFAQ}
                />
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border p-6 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                {currentStep === 2 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="h-9 px-4 hover:bg-gray-100 smooth-transition"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                {currentStep === 1 && (
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="h-9 px-4 hover:bg-gray-100 smooth-transition"
                  >
                    Cancel
                  </Button>
                )}
              </div>

              {currentStep === 1 ? (
                <Button
                  onClick={handleContinue}
                  disabled={!formData.name.trim() || !formData.prompt.trim()}
                  className="h-9 px-6 bg-black hover:bg-black/90 text-white smooth-transition hover-lift disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Continue
                  <ChevronDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
                </Button>
              ) : (
                <Button
                  onClick={handleCreate}
                  className="h-9 px-6 bg-black hover:bg-black/90 text-white smooth-transition hover-lift"
                >
                  Create
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={handleSuccessClose} botName={formData.name} />
      )}
    </>
  );
}

// Step 1: General Info Component
function GeneralInfoStep({ formData, updateFormData }: any) {
  const selectedModel = aiModels.find(m => m.id === formData.model);
  const selectedAccessibility = accessibilityOptions.find(a => a.id === formData.accessibility);

  return (
    <div className="max-w-2xl space-y-8">
      {/* Bot Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
          <Bot className="h-8 w-8 text-gray-600" />
        </div>
      </div>

      {/* Name Field */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-medium">Name</label>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-auto p-1">
            Auto-create
          </Button>
        </div>
        <Input
          placeholder="Enter the name"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="h-12 bg-gray-50 border-gray-200 focus:bg-white smooth-transition"
        />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Example:</span>
          <Badge variant="outline" className="text-xs">Master translator</Badge>
          <Badge variant="outline" className="text-xs">Writing expert</Badge>
          <Badge variant="outline" className="text-xs">Code assistant</Badge>
        </div>
      </div>

      {/* Prompt Field */}
      <div className="space-y-3">
        <label className="font-medium">Instructions</label>
        <Textarea
          placeholder="Example: You are an experienced translator with skills in multiple languages around the world. You are good at translating business scenario cases, making the translation results more formal and professional."
          value={formData.prompt}
          onChange={(e) => updateFormData('prompt', e.target.value)}
          className="min-h-[120px] bg-gray-50 border-gray-200 focus:bg-white smooth-transition resize-none"
        />
      </div>

      {/* Model Selection */}
      <div className="space-y-3">
        <label className="font-medium">Model</label>
        <Select value={formData.model} onValueChange={(value) => updateFormData('model', value)}>
          <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:bg-white hover:bg-white smooth-transition">
            <SelectValue>
              <div className="flex items-center gap-3">
                {selectedModel && (
                  <>
                    <selectedModel.icon className="h-4 w-4" />
                    <span>{selectedModel.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedModel.badge}
                    </Badge>
                  </>
                )}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-80">
            {aiModels.map((model) => (
              <SelectItem key={model.id} value={model.id} className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <model.icon className="h-4 w-4" />
                  <span>{model.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {model.badge}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Accessibility */}
      <div className="space-y-3">
        <label className="font-medium">Accessibility</label>
        <Select value={formData.accessibility} onValueChange={(value) => updateFormData('accessibility', value)}>
          <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:bg-white hover:bg-white smooth-transition">
            <SelectValue>
              <div className="flex items-center gap-3">
                {selectedAccessibility && (
                  <>
                    <selectedAccessibility.icon className="h-4 w-4" />
                    <span>{selectedAccessibility.label}</span>
                  </>
                )}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-80">
            {accessibilityOptions.map((option) => (
              <SelectItem key={option.id} value={option.id} className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Step 2: Knowledge Component
function KnowledgeStep({ 
  formData, 
  onFileUpload, 
  addWebsite, 
  updateWebsite, 
  removeWebsite,
  addFAQ,
  updateFAQ,
  removeFAQ 
}: any) {
  return (
    <div className="max-w-4xl space-y-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
          <Bot className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h2 className="font-medium">{formData.name || 'Write Your Agent Name'}</h2>
          <p className="text-sm text-muted-foreground">Created by Huy Kieu</p>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">1. Add document info</h3>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <Badge variant="outline" className="text-xs">0</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Only 1 credit per 3,000 characters – that's a full A4 page of actual text (no charge for empty spaces or images).
        </p>

        <div className="flex gap-4 mb-4">
          <Button variant="outline" size="sm" className="bg-gray-50">
            Local Documents
          </Button>
          <Button variant="ghost" size="sm">
            Google Drive
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Upload</span>
          </div>
          
          <div 
            onClick={onFileUpload}
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 smooth-transition cursor-pointer"
          >
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground">Select files to upload</span>
              <Button size="sm" className="bg-black hover:bg-black/90 text-white">
                Choose files
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              (accepted: pdf, image, txt, word, excel, csv)
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-100 text-blue-700">0</Badge>
              <span className="text-sm font-medium">List of uploaded documents</span>
            </div>
            <p className="text-sm text-muted-foreground">
              No documents added yet. Add a document to get started.
            </p>
          </div>
        </div>
      </div>

      {/* Website Knowledge Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">2. Add website knowledge</h3>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline" className="text-xs">0</Badge>
          </div>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            <ExternalLink className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>

        <div className="space-y-3">
          {formData.websites.map((website: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Enter website URL"
                value={website}
                onChange={(e) => updateWebsite(index, e.target.value)}
                className="flex-1 h-10"
              />
              {formData.websites.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeWebsite(index)}
                  className="h-10 w-10 hover:bg-red-50 hover:text-red-600 rounded-grok"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addWebsite}
            className="h-10 w-full border-dashed hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add another website
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">3. Frequently asked questions</h3>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Add common questions and answers to help your agent respond more accurately.
        </p>

        <div className="space-y-4">
          {formData.faqs.map((faq: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">FAQ #{index + 1}</span>
                {formData.faqs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFAQ(index)}
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600 rounded-grok"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                <Input
                  placeholder="Enter the question"
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  className="h-10"
                />
                <Textarea
                  placeholder="Enter the answer"
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addFAQ}
            className="h-10 w-full border-dashed hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      </div>
    </div>
  );
}

// Success Modal Component
function SuccessModal({ onClose, botName }: { onClose: () => void; botName: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center elevation-4 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="font-semibold text-xl mb-2">Bot Created Successfully!</h2>
        <p className="text-muted-foreground mb-6">
          Your bot "{botName}" has been created and is ready to use.
        </p>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-10"
          >
            Close
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 h-10 bg-black hover:bg-black/90 text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat Now
          </Button>
        </div>
      </div>
    </div>
  );
}
