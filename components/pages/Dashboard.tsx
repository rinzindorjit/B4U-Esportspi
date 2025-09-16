import React, { useState } from 'react';
import Shop from '../dashboard/Shop';
import Profile from '../dashboard/Profile';
import TransactionHistory from '../dashboard/TransactionHistory';
import { Transaction, TransactionStatus } from '../../types';
import { ALL_PACKAGES } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

type DashboardTab = 'shop' | 'profile' | 'history';

// Mock transaction data for the dashboard
const mockTransactions: Transaction[] = [
    {
        id: 't1',
        date: '2024-07-28 14:30',
        package: ALL_PACKAGES[5], // 8100 UC
        status: TransactionStatus.COMPLETED,
        piAmount: 2.5971,
        transactionId: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
        user: {} as any, // User data would be populated in a real scenario
    },
    {
        id: 't2',
        date: '2024-07-25 10:15',
        package: ALL_PACKAGES[8], // 571 Diamonds
        status: TransactionStatus.COMPLETED,
        piAmount: 0.2597,
        transactionId: 'f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5',
        user: {} as any,
    },
    {
        id: 't3',
        date: '2024-07-22 18:00',
        package: ALL_PACKAGES[2], // 660 UC
        status: TransactionStatus.PENDING,
        piAmount: 0.2597,
        transactionId: 'b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2d3e4f5a6b1c2',
        user: {} as any,
    },
];

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DashboardTab>('shop');
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const { user } = useAuth();

    const handlePurchaseSuccess = (newTransaction: Transaction) => {
        setTransactions(prev => [newTransaction, ...prev]);
        setActiveTab('history');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'shop':
                return <Shop onPurchaseSuccess={handlePurchaseSuccess} />;
            case 'profile':
                return <Profile />;
            case 'history':
                return <TransactionHistory transactions={transactions} />;
            default:
                return <Shop onPurchaseSuccess={handlePurchaseSuccess} />;
        }
    };

    const getTabClass = (tabName: DashboardTab) => 
        `px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 focus:outline-none ${
            activeTab === tabName 
            ? 'bg-b4u-secondary border-b-2 border-b-b4u-blue text-b4u-blue' 
            : 'text-gray-400 hover:bg-b4u-secondary'
        }`;
    
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white">Welcome, {user.piUsername}!</h1>
                <p className="text-gray-400 mt-1">Purchase in-game currency or manage your account.</p>
            </div>
            
            <div className="border-b border-b4u-border">
                <nav className="-mb-px flex space-x-4">
                    <button className={getTabClass('shop')} onClick={() => setActiveTab('shop')}>Shop</button>
                    <button className={getTabClass('profile')} onClick={() => setActiveTab('profile')}>Profile</button>
                    <button className={getTabClass('history')} onClick={() => setActiveTab('history')}>Transaction History</button>
                </nav>
            </div>

            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Dashboard;