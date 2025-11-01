import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { TransactionProvider } from './contexts/TransactionContext';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { BottomNav } from './components/layout/BottomNav';
import { AddTransactionModal } from './components/transactions/AddTransactionModal';
import { setOnboardingComplete, isOnboardingComplete } from './services/storage';

const MainApp = () => {
  const { login, isAuthenticated } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(isOnboardingComplete());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'goals' | 'profile'>('dashboard');
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const handleOnboardingComplete = (data: any) => {
    login({
      name: data.email?.split('@')[0] || 'User',
      email: data.email,
      currency: data.currency
    });
    setOnboardingComplete(true);
    setHasCompletedOnboarding(true);
  };

  if (!hasCompletedOnboarding || !isAuthenticated) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeTab === 'dashboard' && (
        <DashboardScreen onAddTransaction={() => setShowAddTransaction(true)} />
      )}
      
      {activeTab === 'analytics' && <AnalyticsScreen />}
      
      {activeTab === 'goals' && (
        <div className="p-6 pt-20 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-dark-900 mb-2">Goals</h2>
          <p className="text-dark-600">Coming soon...</p>
        </div>
      )}
      
      {activeTab === 'profile' && (
        <div className="p-6 pt-20 text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-dark-900 mb-2">Profile</h2>
          <p className="text-dark-600">Coming soon...</p>
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <AddTransactionModal 
        isOpen={showAddTransaction} 
        onClose={() => setShowAddTransaction(false)} 
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <TransactionProvider>
          <MainApp />
        </TransactionProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
