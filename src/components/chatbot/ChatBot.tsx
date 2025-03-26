
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Send, Bot, XCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { generateChatbotResponse } from './chatbotUtils';

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    content: "Hello! I'm your RoadCare assistant. How can I help you with road infrastructure issues in Bengaluru today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when sheet opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateChatbotResponse(input, messages);
      
      setMessages(prev => [
        ...prev,
        {
          content: response,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          content: "Sorry, I'm having trouble responding right now. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          className={`h-14 w-14 rounded-full fixed bottom-6 right-6 shadow-lg z-50 ${
            theme === 'dark' ? 'bg-[#A0CED9] hover:bg-[#A0CED9]/90' : 'bg-fixit-primary hover:bg-fixit-primary/90'
          }`}
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-7 w-7 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:w-[400px] sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              RoadCare Assistant
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={() => setIsOpen(false)}
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    message.isUser 
                      ? `${theme === 'dark' ? 'bg-[#D2B48C]' : 'bg-fixit-primary'} text-white` 
                      : `${theme === 'dark' ? 'bg-[#28354A]' : 'bg-gray-100'}`
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {isLoading && (
              <div className="max-w-[85%] mr-auto">
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-[#28354A]' : 'bg-gray-100'}`}>
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className={theme === 'dark' ? 'bg-[#A0CED9] hover:bg-[#A0CED9]/90' : ''}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;
