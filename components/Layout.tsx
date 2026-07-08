
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-text font-sans selection:bg-[#BF953F] selection:text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_60%,_black_100%)] pointer-events-none z-0" />
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none z-0" />
      <Navbar />
      <main className="relative z-10 flex-grow pt-24">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};
