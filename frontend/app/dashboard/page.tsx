'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:8000/projects/', {
      headers: { 'Authorization': Bearer  }
    });
    const data = await response.json();
    setProjects(data.projects || []);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Мои проекты</h1>
      {projects.length === 0 ? (
        <p className="text-gray-600">У вас пока нет проектов.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project: any) => (
            <div key={project.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium">{project.name}</h3>
              <span className="text-sm text-gray-500">{project.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
