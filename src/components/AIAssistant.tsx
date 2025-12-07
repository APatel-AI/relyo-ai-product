import React, { useState } from 'react';
import { Sparkles, Send, Copy, Check } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isScript?: boolean;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(input),
        isScript: true
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateMockResponse = (question: string) => {
    if (question.toLowerCase().includes('doctor') || question.toLowerCase().includes('appointment')) {
      return `Here's what to say when calling the doctor's office:

**Opening:**
"Hi, my name is [Your Name], and I'm calling to schedule an appointment for my [son/daughter/family member], [Name]."

**Key Information to Provide:**
- Patient name and date of birth
- Reason for visit (be specific but brief)
- Insurance information if asked
- Preferred dates and times

**Questions to Ask:**
1. "What's the earliest available appointment?"
2. "Do I need to bring any documents or complete forms beforehand?"
3. "Should my child fast before the appointment?"
4. "What's your cancellation policy?"

**Closing:**
"Thank you. I've noted the appointment for [date] at [time]. I'll see you then."`;
    }

    return `I can help you with that. Here are some suggestions:

**Steps to Follow:**
1. Gather all relevant information beforehand
2. Write down your main concerns
3. Prepare any questions you have
4. Keep notes during the conversation

**Recommended Questions:**
- What are the next steps?
- When should we follow up?
- Are there any warning signs to watch for?

Would you like me to help you prepare for a specific type of call?`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-40"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-40 flex flex-col h-[600px] max-h-[calc(100vh-3rem)]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900">AI Assistant</h3>
            <p className="text-gray-500">Ask me anything</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="mb-2 text-gray-900">How can I help?</h3>
            <p className="text-gray-500">
              Ask me for help with calls, scripts, or advice
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.isScript && (
                  <button
                    onClick={() => handleCopy(message.content, message.id)}
                    className="mt-3 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {copiedId === message.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-10"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
