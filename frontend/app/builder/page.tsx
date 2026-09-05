'use client';

import { useState } from 'react';

export default function BuilderPage() {
  const [prompt, setPrompt] = useState('');
  const [structure, setStructure] = useState(null);
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      
      const structureResponse = await fetch('http://localhost:8000/generate/structure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer 
        },
        body: JSON.stringify({ user_request: prompt })
      });
      const structureData = await structureResponse.json();
      setStructure(structureData.structure);

      const htmlResponse = await fetch('http://localhost:8000/generate/html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer 
        },
        body: JSON.stringify({ structure: structureData.structure })
      });
      const htmlData = await htmlResponse.json();
      setHtml(htmlData.html);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-1/2 p-6">
        <h1 className="text-2xl font-bold mb-6">Конструктор сайта</h1>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Опишите сайт, который хотите создать..."
          rows={4}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Генерируем...' : 'Создать сайт'}
        </button>

        {structure && (
          <pre className="mt-4 bg-white p-4 rounded-lg overflow-auto max-h-80 text-xs">
            {JSON.stringify(structure, null, 2)}
          </pre>
        )}
      </div>

      <div className="w-1/2 bg-white border-l border-gray-200">
        <div className="p-4 border-b">
          <h2 className="font-bold">Предпросмотр</h2>
        </div>
        <iframe
          srcDoc={html}
          className="w-full h-full"
          sandbox="allow-scripts"
          title="Предпросмотр сайта"
        />
      </div>
    </div>
  );
}
