import React from 'react';
import FadeIn from './FadeIn';
import DroneContainer from './DroneContainer';

const certificates = [
  {
    id: 1,
    title: 'Advanced Neural Net Architectures',
    issuer: 'DeepLearning.AI',
    date: '2025.04',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    title: 'Cloud Infrastructure Security',
    issuer: 'Google Cloud Platform',
    date: '2024.11',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    title: 'Quantum Computing Fundamentals',
    issuer: 'MIT xPRO',
    date: '2026.01',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
  }
];

const CertificateCard: React.FC<{ cert: any }> = ({ cert }) => {
  return (
    <div className="group relative bg-white/40 border border-gray-200 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md cursor-default h-full rounded-xl">
      <div className="h-40 w-full overflow-hidden relative">
        <img 
          src={cert.image} 
          alt={cert.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 relative z-10 bg-white/60 backdrop-blur-md">
        <div className="flex justify-between items-start mb-3">
          <span className="text-white bg-[var(--color-primary)] font-semibold text-[10px] uppercase tracking-wider px-2 py-1 rounded shadow-sm">
            VERIFIED
          </span>
          <span className="text-gray-500 font-medium text-xs">{cert.date}</span>
        </div>
        
        <h3 className="text-[var(--color-text)] font-bold tracking-tight text-lg mb-1">
          {cert.title}
        </h3>
        <p className="text-[var(--color-primary)] text-[10px] uppercase tracking-widest font-semibold">
          {cert.issuer}
        </p>
      </div>
    </div>
  );
}

export default function Certificates() {
  return (
    <section className="mb-32 relative z-10 w-full max-w-5xl mx-auto px-4">
      <FadeIn delay={0.1} direction="up">
        <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] mb-10 flex items-center gap-4 ml-2">
          <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--color-primary)] to-transparent block"></span>
          Certifications & Accolades
        </h2>
      </FadeIn>

      <DroneContainer mode="stay">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      </DroneContainer>
    </section>
  );
}
