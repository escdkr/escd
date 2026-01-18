
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ProductDetail } from './components/ProductDetail';
import { CheckoutPage } from './components/CheckoutPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalPage } from './components/LegalPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Home } from './components/Home';
import { HiddenChapter } from './components/HiddenChapter';
import { CurriculumPage } from './components/CurriculumPage';
import { AuthorPage } from './components/AuthorPage';
import { Syndicate } from './components/Syndicate';
import { IdentityProtocol } from './components/IdentityProtocol';
import { Oracle } from './components/Oracle';
import { FAQPage } from './components/FAQPage'; 
import { ReviewsPage } from './components/ReviewsPage'; 
import { UnifiedArmoryPage } from './components/UnifiedArmoryPage'; 
import { VIPArmoryPage } from './components/VIPArmoryPage'; // Import updated VIP page
import { SystemProvider, SystemBoot } from './components/SystemCore'; 
import { SystemVisuals } from './components/SystemVisuals'; 
import { ROUTES, RouteType } from './constants/routes';
 
export interface UserProfile {
  id: string;
  name: string;
  clearance: string;
  role?: 'user' | 'admin';
}

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<RouteType>(ROUTES.HOME);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const goHome = () => {
    setCurrentPage(ROUTES.HOME);
    setUser(null);
  };

  const goToCheckout = () => setCurrentPage(ROUTES.CHECKOUT);
  const goToLogin = () => setCurrentPage(ROUTES.LOGIN);
  const goToLegal = () => setCurrentPage(ROUTES.LEGAL);
  const goToFAQ = () => setCurrentPage(ROUTES.FAQ);
  const goToReviews = () => setCurrentPage(ROUTES.REVIEWS);
  const goToFreeArmory = () => setCurrentPage(ROUTES.FREE_ARMORY);
  const goToVIPArmory = () => setCurrentPage(ROUTES.VIP_ARMORY); 
  const goToDetail = () => setCurrentPage(ROUTES.DETAIL);
  const goToPreview = () => setCurrentPage(ROUTES.PREVIEW);
  const goToCurriculum = () => setCurrentPage(ROUTES.CURRICULUM);
  const goToAuthor = () => setCurrentPage(ROUTES.AUTHOR);
  const goToDashboard = () => setCurrentPage(ROUTES.DASHBOARD);
  const goToSyndicate = () => setCurrentPage(ROUTES.SYNDICATE);
  const goToSettings = () => setCurrentPage(ROUTES.SETTINGS);
  const goToOracle = () => setCurrentPage(ROUTES.ORACLE);
  const goToAdmin = () => setCurrentPage(ROUTES.ADMIN); 

  const handleLoginSuccess = (profile?: UserProfile) => {
    const defaultProfile: UserProfile = {
      id: 'AGENT-077',
      name: 'Elite Operative',
      clearance: 'Tier-01 Elite',
      role: 'user'
    };
    
    const finalProfile = profile || defaultProfile;
    setUser(finalProfile);
    
    if (finalProfile.role === 'admin') {
      setCurrentPage(ROUTES.ADMIN);
    } else {
      setCurrentPage(ROUTES.DASHBOARD);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case ROUTES.ADMIN:
        return <AdminDashboard onLogout={goHome} user={user} onNavigate={setCurrentPage} />;
      case ROUTES.DASHBOARD:
        return <Dashboard onLogout={goHome} user={user} onNavigate={setCurrentPage} />;
      case ROUTES.SYNDICATE:
        return <Syndicate onBack={goToDashboard} user={user} />;
      case ROUTES.ORACLE:
        return <Oracle onBack={goToDashboard} user={user} />;
      case ROUTES.SETTINGS:
        return <IdentityProtocol onBack={goToDashboard} onLogout={goHome} user={user} />;
      case ROUTES.CHECKOUT:
        return <CheckoutPage onBack={goToDetail} onComplete={() => handleLoginSuccess()} />;
      case ROUTES.LOGIN:
        return <LoginPage onBack={goHome} onLogin={handleLoginSuccess} />;
      case ROUTES.LEGAL:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <LegalPage />
          </Layout>
        );
      case ROUTES.FAQ:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <FAQPage />
          </Layout>
        );
      case ROUTES.REVIEWS:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <ReviewsPage />
          </Layout>
        );
      case ROUTES.FREE_ARMORY:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <UnifiedArmoryPage onBack={goHome} onGoToVIP={goToVIPArmory} initialMode="standard" />
          </Layout>
        );
      case ROUTES.VIP_ARMORY:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <VIPArmoryPage onBack={goHome} onGoToPublic={goToFreeArmory} />
          </Layout>
        );
      case ROUTES.DETAIL:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <ProductDetail onBack={goHome} onCheckout={goToCheckout} />
          </Layout>
        );
      case ROUTES.PREVIEW:
        return <HiddenChapter onCheckout={goToCheckout} onBack={goHome} />;
      case ROUTES.CURRICULUM:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <CurriculumPage onCheckout={goToCheckout} />
          </Layout>
        );
      case ROUTES.AUTHOR:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <AuthorPage onCheckout={goToCheckout} />
          </Layout>
        );
      case ROUTES.HOME:
        return (
          <Layout onLogoClick={goHome} onLoginClick={goToLogin} onLegalClick={goToLegal} onCurriculumClick={goToCurriculum} onAuthorClick={goToAuthor} onFAQClick={goToFAQ} onReviewsClick={goToReviews} onFreeArmoryClick={goToFreeArmory} onVIPArmoryClick={goToVIPArmory}>
            <Home 
              onOpenAction={goToPreview} 
              onGoToDetail={goToDetail} 
              onGoToLegal={goToLegal} 
              onGoToLogin={goToLogin} 
              onGoToPreview={goToPreview}
              onGoToFreeArmory={goToFreeArmory}
            />
          </Layout>
        );
      default:
        return <NotFoundPage onReturn={goHome} />;
    }
  };

  return (
    <>
      <SystemVisuals /> {/* Global Visual Effects */}
      {isBooting && <SystemBoot onComplete={() => setIsBooting(false)} />}
      {renderPage()}
    </>
  );
};

const App: React.FC = () => {
  return (
    <SystemProvider>
      <AppContent />
    </SystemProvider>
  );
};

export default App;
