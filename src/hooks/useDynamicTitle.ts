import { useEffect } from 'react';
import { portfolioData } from '../data';

export const useDynamicTitle = () => {
  useEffect(() => {
    let index = 0;
    const projectNames = portfolioData.projects.map(p => p.title);
    const randomProject = projectNames[Math.floor(Math.random() * projectNames.length)] || 'Building Systems';
    
    const messages = [
      'SYSTEM STATUS: ONLINE',
      `CURRENT TASK: ${randomProject}`,
      `USER: ${portfolioData.name.toUpperCase()}`
    ];

    const interval = setInterval(() => {
      document.title = messages[index];
      index = (index + 1) % messages.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);
};
