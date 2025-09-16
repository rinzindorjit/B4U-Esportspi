import React, { useState } from 'react';
import AnalyticsDashboard from '../admin/AnalyticsDashboard';
import UserManagement from '../admin/UserManagement';
import TransactionMonitoring from '../admin/TransactionMonitoring';
import PackageManagement from '../admin/PackageManagement';
import { useAuth } from '../../contexts/AuthContext';

type AdminTab = 'analytics' | 'users' | 'transactions' | 'packages';

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
    const { adminLogout } = useAuth();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'analytics':
                return <AnalyticsDashboard />;
            case 'users':
                return <UserManagement />;
            case 'transactions':
                return <TransactionMonitoring />;
            case 'packages':
                return <PackageManagement />;
            default:
                return <AnalyticsDashboard />;
        }
    };

    const getTabClass = (tabName: AdminTab) => 
        `px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 focus:outline-none ${
            activeTab === tabName 
            ? 'bg-b4u-secondary border-b4u-border border-b-2 border-b-b4u-blue text-b4u-blue' 
            : 'text-gray-400 hover:bg-b4u-secondary'
        }`;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-400 mt-1">Manage users, transactions, and site analytics.</p>
                </div>
                <button 
                    onClick={adminLogout}
                    className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-500 rounded-md transition-colors"
                >
                    Logout Admin
                </button>
            </div>
            
            <div className="border-b border-b4u-border">
                <nav className="-mb-px flex space-x-4">
                    <button className={getTabClass('analytics')} onClick={() => setActiveTab('analytics')}>Analytics</button>
                    <button className={getTabClass('users')} onClick={() => setActiveTab('users')}>User Management</button>
                    <button className={getTabClass('transactions')} onClick={() => setActiveTab('transactions')}>Transaction Monitoring</button>
                    <button className={getTabClass('packages')} onClick={() => setActiveTab('packages')}>Package Management</button>
                </nav>
            </div>

            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminPanel;