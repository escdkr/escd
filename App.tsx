
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { UserProvider, useUser } from './context/UserContext';
import type { UserProfile } from './context/UserContext';
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
import { VIPArmoryPage } from './components/VIPArmoryPage';
import { SystemProvider, SystemBoot } from './components/SystemCore';
import { SystemVisuals } from './components/SystemVisuals';
import { ROUTES } from './constants/routes';

export type { UserProfile };

// ── Layout-wrapped routes ──────────────────────────────────────────────────

const HomeRoute = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Home
        onOpenAction={() => navigate(ROUTES.PREVIEW)}
        onGoToDetail={() => navigate(ROUTES.DETAIL)}
        onGoToLegal={() => navigate(ROUTES.LEGAL)}
        onGoToLogin={() => navigate(ROUTES.LOGIN)}
        onGoToPreview={() => navigate(ROUTES.PREVIEW)}
        onGoToFreeArmory={() => navigate(ROUTES.FREE_ARMORY)}
      />
    </Layout>
  );
};

const DetailRoute = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <ProductDetail onBack={() => navigate(ROUTES.HOME)} onCheckout={() => navigate(ROUTES.CHECKOUT)} />
    </Layout>
  );
};

const CurriculumRoute = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <CurriculumPage onCheckout={() => navigate(ROUTES.CHECKOUT)} />
    </Layout>
  );
};

const AuthorRoute = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <AuthorPage onCheckout={() => navigate(ROUTES.CHECKOUT)} />
    </Layout>
  );
};

const FreeArmoryRoute = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <UnifiedArmoryPage onBack={() => navigate(ROUTES.HOME)} onGoToVIP={() => navigate(ROUTES.VIP_ARMORY)} initialMode="standard" />
    </Layout>
  );
};

const VIPArmoryRoute = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <VIPArmoryPage onBack={() => navigate(ROUTES.HOME)} onGoToPublic={() => navigate(ROUTES.FREE_ARMORY)} />
    </Layout>
  );
};

const ReviewsRoute = () => (
  <Layout>
    <ReviewsPage />
  </Layout>
);

const FAQRoute = () => (
  <Layout>
    <FAQPage />
  </Layout>
);

const LegalRoute = () => (
  <Layout>
    <LegalPage />
  </Layout>
);

// ── Auth & checkout routes (no Layout) ────────────────────────────────────

const DEFAULT_USER: UserProfile = {
  id: 'AGENT-077',
  name: 'Elite Operative',
  clearance: 'Tier-01 Elite',
  role: 'user',
};

const LoginRoute = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = (profile?: UserProfile) => {
    const p = profile ?? DEFAULT_USER;
    setUser(p);
    navigate(p.role === 'admin' ? ROUTES.ADMIN : ROUTES.DASHBOARD);
  };

  return <LoginPage onBack={() => navigate(ROUTES.HOME)} onLogin={handleLogin} />;
};

const CheckoutRoute = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleComplete = () => {
    setUser(DEFAULT_USER);
    navigate(ROUTES.DASHBOARD);
  };

  return <CheckoutPage onBack={() => navigate(ROUTES.DETAIL)} onComplete={handleComplete} />;
};

// ── Protected / dashboard routes ──────────────────────────────────────────

const DashboardRoute = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  return (
    <Dashboard
      onLogout={() => { setUser(null); navigate(ROUTES.HOME); }}
      user={user}
      onNavigate={(path) => navigate(path)}
    />
  );
};

const AdminRoute = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  return (
    <AdminDashboard
      onLogout={() => { setUser(null); navigate(ROUTES.HOME); }}
      user={user}
      onNavigate={(path) => navigate(path)}
    />
  );
};

const SyndicateRoute = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return <Syndicate onBack={() => navigate(ROUTES.DASHBOARD)} user={user} />;
};

const OracleRoute = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return <Oracle onBack={() => navigate(ROUTES.DASHBOARD)} user={user} />;
};

const SettingsRoute = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  return (
    <IdentityProtocol
      onBack={() => navigate(ROUTES.DASHBOARD)}
      onLogout={() => { setUser(null); navigate(ROUTES.HOME); }}
      user={user}
    />
  );
};

const HiddenChapterRoute = () => {
  const navigate = useNavigate();
  return (
    <HiddenChapter
      onCheckout={() => navigate(ROUTES.CHECKOUT)}
      onBack={() => navigate(ROUTES.HOME)}
    />
  );
};

const NotFoundRoute = () => {
  const navigate = useNavigate();
  return <NotFoundPage onReturn={() => navigate(ROUTES.HOME)} />;
};

// ── App shell ─────────────────────────────────────────────────────────────

const AppRoutes: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      <SystemVisuals />
      {isBooting && <SystemBoot onComplete={() => setIsBooting(false)} />}
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomeRoute />} />
        <Route path={ROUTES.DETAIL} element={<DetailRoute />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutRoute />} />
        <Route path={ROUTES.LOGIN} element={<LoginRoute />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardRoute />} />
        <Route path={ROUTES.ADMIN} element={<AdminRoute />} />
        <Route path={ROUTES.SYNDICATE} element={<SyndicateRoute />} />
        <Route path={ROUTES.ORACLE} element={<OracleRoute />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsRoute />} />
        <Route path={ROUTES.CURRICULUM} element={<CurriculumRoute />} />
        <Route path={ROUTES.AUTHOR} element={<AuthorRoute />} />
        <Route path={ROUTES.FREE_ARMORY} element={<FreeArmoryRoute />} />
        <Route path={ROUTES.VIP_ARMORY} element={<VIPArmoryRoute />} />
        <Route path={ROUTES.REVIEWS} element={<ReviewsRoute />} />
        <Route path={ROUTES.FAQ} element={<FAQRoute />} />
        <Route path={ROUTES.LEGAL} element={<LegalRoute />} />
        <Route path={ROUTES.PREVIEW} element={<HiddenChapterRoute />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundRoute />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <SystemProvider>
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  </SystemProvider>
);

export default App;
