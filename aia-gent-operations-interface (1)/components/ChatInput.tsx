import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="fixed bottom-0 right-0 left-72 bg-white/95 backdrop-blur-sm border-t border-border z-50">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex items-end gap-3 p-4 border border-border rounded-2xl bg-white shadow-lg">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message Operations Agent..."
                className="flex-1 resize-none bg-transparent text-base placeholder:text-muted-foreground focus:outline-none min-h-[24px] max-h-32 leading-6"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!inputValue.trim()}
                className="h-10 w-10 p-0 rounded-xl bg-black hover:bg-black/90 disabled:bg-gray-200 disabled:text-gray-400 transition-all duration-200"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Operations Agent can make mistakes. Please verify important information.
          </p>
        </form>
      </div>
    </div>
  );
}
