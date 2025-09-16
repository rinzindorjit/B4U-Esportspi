import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PriceProvider } from './contexts/PriceContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import AdminPanel from './components/pages/AdminPanel';
import AdminLogin from './components/pages/AdminLogin';
import LegalPage from './components/pages/LegalPage';
import { LegalPageType, LegalContent } from './constants';

const AppContent: React.FC = () => {
    const { user, isAdminView, adminUser } = useAuth();
    const [legalPage, setLegalPage] = useState<LegalPageType | null>(null);

    const handleNavigate = (page: LegalPageType) => {
        setLegalPage(page);
    };

    const handleBack = () => {
        setLegalPage(null);
    };

    if (legalPage) {
        return <LegalPage page={legalPage} content={LegalContent[legalPage]} onBack={handleBack} />;
    }

    const renderMainContent = () => {
        if (!user) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Login />
                </div>
            );
        }

        if (isAdminView) {
            return adminUser ? <AdminPanel /> : <AdminLogin />;
        }

        return <Dashboard />;
    };

    return (
        <div className="min-h-screen bg-b4u-dark text-white font-sans flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
                {renderMainContent()}
            </main>
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <PriceProvider>
                <AppContent />
            </PriceProvider>
        </AuthProvider>
    );
};

export default App;