import React, { useState } from 'react';
import { Package, Transaction, TransactionStatus } from '../../types';
import { usePrice } from '../../contexts/PriceContext';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../common/Modal';

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    pkg: Package;
    onSuccess: (transaction: Transaction) => void;
}

type PurchaseStep = 'confirm' | 'processing' | 'success' | 'error';

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, pkg, onSuccess }) => {
    const { user } = useAuth();
    const { piPrice } = usePrice();
    const [step, setStep] = useState<PurchaseStep>('confirm');
    const [errorMessage, setErrorMessage] = useState('');
    
    const piAmount = piPrice ? (pkg.usdtValue / piPrice).toFixed(4) : '...';
    const gameId = pkg.game === 'PUBG Mobile' ? `UID: ${user?.pubgUID}` : `User ID: ${user?.mlbbUserID} (${user?.mlbbZoneID})`;

    const handleConfirmPurchase = async () => {
        setStep('processing');
        // In a real app, this is where you would call the Pi Network SDK to initiate a payment.
        // We'll simulate a delay and a random outcome.
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo

        if (isSuccess) {
            setStep('success');
            const newTransaction: Transaction = {
                id: `txn_${Date.now()}`,
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                package: pkg,
                status: TransactionStatus.COMPLETED,
                piAmount: piPrice ? parseFloat((pkg.usdtValue / piPrice).toFixed(4)) : 0,
                transactionId: `pi_${Math.random().toString(36).substring(2, 9)}`,
                user: user!,
            };
            
            // Wait for user to see message, then call success handler which will close the modal and navigate.
            setTimeout(() => {
                onSuccess(newTransaction);
            }, 1500);
        } else {
            setErrorMessage('The transaction failed. Please try again. No funds were deducted.');
            setStep('error');
        }
    };

    const handleClose = () => {
        onClose();
        // Reset step for next time modal is opened
        setTimeout(() => setStep('confirm'), 300);
    };

    const renderContent = () => {
        switch(step) {
            case 'confirm':
                return (
                    <div>
                        <p className="text-gray-300 mb-2">You are about to purchase:</p>
                        <div className="bg-b4u-dark p-4 rounded-lg border border-b4u-border mb-4">
                            <p className="text-xl font-bold text-white">{pkg.name}</p>
                            <p className="text-sm text-gray-400">{pkg.game}</p>
                        </div>
                        <p className="text-gray-300 mb-2">This will be sent to:</p>
                        <div className="bg-b4u-dark p-4 rounded-lg border border-b4u-border mb-4">
                            <p className="font-mono text-white">{gameId}</p>
                        </div>
                         <div className="text-center my-6">
                            <p className="text-gray-400">Total Cost</p>
                            <p className="text-3xl font-bold text-pi-yellow">{piAmount} π</p>
                            <p className="text-sm text-gray-500">~${pkg.usdtValue.toFixed(2)} USD</p>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md">Cancel</button>
                            <button onClick={handleConfirmPurchase} className="px-4 py-2 bg-b4u-blue hover:bg-sky-500 text-white rounded-md">Confirm Purchase</button>
                        </div>
                    </div>
                );
            case 'processing':
                return (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-b4u-blue mx-auto mb-4"></div>
                        <h4 className="text-xl font-bold text-white">Processing Transaction...</h4>
                        <p className="text-gray-400 mt-2">Please approve the transaction in your Pi Wallet.</p>
                    </div>
                );
            case 'success':
                 return (
                    <div className="text-center py-8">
                        <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-xl font-bold text-white">Purchase Successful!</h4>
                        <p className="text-gray-400 mt-2">Your {pkg.currency} will be credited to your account shortly.</p>
                        <p className="text-gray-500 mt-4 animate-pulse">Navigating to your transaction history...</p>
                    </div>
                );
            case 'error':
                 return (
                    <div className="text-center py-8">
                        <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-xl font-bold text-white">Transaction Failed</h4>
                        <p className="text-gray-400 mt-2">{errorMessage}</p>
                        <button onClick={handleClose} className="mt-6 px-6 py-2 bg-b4u-blue hover:bg-sky-500 text-white rounded-md">Close</button>
                    </div>
                );
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Confirm Your Purchase">
            {renderContent()}
        </Modal>
    );
};

export default PurchaseModal;