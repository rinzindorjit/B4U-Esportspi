
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../common/Modal';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [isConsentModalOpen, setConsentModalOpen] = useState(false);

    const handleLoginClick = () => {
        setConsentModalOpen(true);
    };

    const handleConsent = () => {
        login();
        setConsentModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-b4u-secondary p-8 rounded-xl shadow-2xl border border-b4u-border max-w-lg w-full">
                <img src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png" alt="B4U Esports" className="w-48 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-white mb-2">Welcome to B4U Esports</h1>
                <p className="text-gray-400 mb-8">Your one-stop shop for in-game currencies with Pi.</p>
                
                <button 
                    onClick={handleLoginClick}
                    className="w-full flex items-center justify-center space-x-3 bg-pi-yellow text-b4u-dark font-bold py-3 px-6 rounded-lg text-lg hover:bg-yellow-400 transition-transform transform hover:scale-105"
                >
                    <img src="https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg" alt="Pi Network Logo" className="h-8 w-8 rounded-full" />
                    <span>Sign In with Pi Network</span>
                </button>

                <div className="mt-6 text-left p-4 bg-b4u-dark border border-b4u-border rounded-lg">
                    <p className="text-sm text-yellow-300">
                        <span className="font-bold">Note:</span> Transactions are currently processed on the Pi Testnet. No real Pi coins will be deducted from your mainnet wallet during purchases.
                    </p>
                </div>
            </div>

            <Modal isOpen={isConsentModalOpen} onClose={() => setConsentModalOpen(false)} title="Account Consent">
                <p className="text-gray-300 mb-6">
                    To create your B4U Esports account, we need your consent to access your Pi username and wallet address. This information will be used to process your transactions securely.
                </p>
                <div className="flex justify-end space-x-4">
                    <button onClick={() => setConsentModalOpen(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md">
                        Cancel
                    </button>
                    <button onClick={handleConsent} className="px-4 py-2 bg-b4u-blue hover:bg-sky-500 text-white rounded-md">
                        Agree and Continue
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Login;
