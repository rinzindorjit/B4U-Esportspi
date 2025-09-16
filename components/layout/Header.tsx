
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePrice } from '../../contexts/PriceContext';

const Header: React.FC = () => {
    const { user, logout, isAdminView, toggleAdminView } = useAuth();
    const { piPrice, isLoading } = usePrice();

    const abbreviatedAddress = user ? `${user.piWalletAddress.substring(0, 4)}...${user.piWalletAddress.substring(user.piWalletAddress.length - 4)}` : '';

    return (
        <header className="bg-b4u-secondary border-b border-b4u-border shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png" alt="B4U Esports Logo" className="h-12 w-auto" />
                    <div className="hidden sm:flex items-center space-x-2 bg-b4u-dark px-3 py-1 rounded-full border border-b4u-border">
                        <img src="https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg" alt="Pi Logo" className="h-6 w-6 rounded-full" />
                        <span className="text-lg font-semibold text-pi-yellow">
                            {isLoading ? '...' : piPrice ? `$${piPrice.toFixed(2)}` : 'N/A'}
                        </span>
                        <span className="text-gray-400 text-sm">/ USD</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {user && (
                        <>
                            <div className="hidden md:flex flex-col items-end">
                                <span className="font-semibold text-white">{user.piUsername}</span>
                                <span className="text-xs text-gray-400">{abbreviatedAddress}</span>
                            </div>
                             <button
                                onClick={toggleAdminView}
                                className="px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                            >
                                {isAdminView ? 'User View' : 'Admin View'}
                            </button>
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-sm font-medium bg-b4u-blue text-white hover:bg-sky-500 rounded-md transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
