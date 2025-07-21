import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m Cody, the official AI chatbot for CSX3 based on ChatGPT, here to make coding less of a hell :) I can help you with JavaScript, Python, Lua, C++, C#, CSS, HTML, Markdown, and JSON. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage: string): string => {
    return 'I am having trouble connecting to the internet for your question. Are you sure your internet connection is stable?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div 
        className="h-8 flex items-center justify-between px-3 text-xs font-semibold border-b"
        style={{ 
          color: currentTheme.colors.text.secondary,
          borderColor: currentTheme.colors.border
        }}
      >
        <div className="flex items-center space-x-2">
          <Bot className="w-3 h-3" />
          <span>CODY - AI ASSISTANT</span>
        </div>
      </div>

      <div 
        ref={messagesRef}
        className="flex-1 overflow-y-auto p-3 space-y-4"
      >
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex space-x-3 ${message.type === 'user' ? 'justify-end' : ''}`}
          >
            {message.type === 'ai' && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
            )}
            
            <div 
              className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : ''
              }`}
              style={message.type === 'ai' ? {
                backgroundColor: currentTheme.colors.accent,
                color: currentTheme.colors.text.secondary
              } : {}}
            >
              {message.content}
            </div>
            
            {message.type === 'user' && (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <div 
              className="p-3 rounded-lg"
              style={{
                backgroundColor: currentTheme.colors.accent
              }}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div 
        className="p-3 border-t"
        style={{ borderColor: currentTheme.colors.border }}
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Cody about any programming language..."
            className="flex-1 px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: currentTheme.colors.accent,
              color: currentTheme.colors.text.primary
            }}
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-2 rounded transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};