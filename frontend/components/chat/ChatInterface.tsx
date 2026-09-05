'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/generate/structure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer 
        },
        body: JSON.stringify({ user_request: input })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: 'Сайт успешно создан! Просмотрите предпросмотр.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'system', content: 'Произошла ошибка. Попробуйте ещё раз.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={mb-3 flex }>
            <div className={max-w-[80%] p-3 rounded-lg }>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Опишите сайт..."
            className="flex-1 px-4 py-2 border rounded"
          />
          <button onClick={handleSend} disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
