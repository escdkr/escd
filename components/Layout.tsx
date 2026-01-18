
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onLogoClick?: () => void;
  onLoginClick?: () => void;
  onLegalClick?: () => void;
  onCurriculumClick?: () => void;
  onAuthorClick?: () => void;
  onFAQClick?: () => void;
  onReviewsClick?: () => void;
  onFreeArmoryClick?: () => void;
  onVIPArmoryClick?: () => void; // Added Prop
}

export const Layout: React.FC<LayoutProps> = ({ children, onLogoClick, onLoginClick, onLegalClick, onCurriculumClick, onAuthorClick, onFAQClick, onReviewsClick, onFreeArmoryClick, onVIPArmoryClick }) => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-text font-sans selection:bg-[#BF953F] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Deep Radial Gradient Background for Atmosphere */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_60%,_black_100%)] pointer-events-none z-0" />
      
      {/* Luxury Grid Overlay */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none z-0"></div>
      
      <Navbar onLogoClick={onLogoClick} onLoginClick={onLoginClick} onCurriculumClick={onCurriculumClick} onAuthorClick={onAuthorClick} onReviewsClick={onReviewsClick} onFreeArmoryClick={onFreeArmoryClick} onVIPArmoryClick={onVIPArmoryClick} />
      
      <main className="relative z-10 flex-grow pt-24">
        {children}
      </main>
      
      <div className="relative z-10">
        <Footer onFAQClick={onFAQClick} onLegalClick={onLegalClick} onCurriculumClick={onCurriculumClick} onReviewsClick={onReviewsClick} />
      </div>
    </div>
  );
};
