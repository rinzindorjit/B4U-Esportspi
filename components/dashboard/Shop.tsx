import React, { useState } from 'react';
import { ALL_PACKAGES, MLBB_LOGO_URL, PUBG_LOGO_URL } from '../../constants';
import { Game, Package, Transaction } from '../../types';
import { usePrice } from '../../contexts/PriceContext';
import PurchaseModal from './PurchaseModal';
import { useAuth } from '../../contexts/AuthContext';

const PackageCard: React.FC<{ pkg: Package; onPurchase: (pkg: Package) => void }> = ({ pkg, onPurchase }) => {
    const { piPrice } = usePrice();
    const piAmount = piPrice ? (pkg.usdtValue / piPrice).toFixed(4) : '...';

    return (
        <div className="bg-b4u-dark border border-b4u-border rounded-lg p-4 flex flex-col items-center text-center hover:border-b4u-blue transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-24 w-24 flex items-center justify-center mb-4">
                 {pkg.imageUrl && <img src={pkg.imageUrl} alt={pkg.name} className="max-h-full max-w-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />}
            </div>
            <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
            <p className="text-sm text-gray-400">{pkg.game}</p>
            <div className="my-4">
                <p className="text-2xl font-semibold text-pi-yellow">{piAmount} π</p>
                <p className="text-sm text-gray-500">~${pkg.usdtValue.toFixed(2)} USD</p>
            </div>
            <button
                onClick={() => onPurchase(pkg)}
                className="w-full mt-auto bg-b4u-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors"
            >
                Purchase
            </button>
        </div>
    );
};

interface ShopProps {
    onPurchaseSuccess: (transaction: Transaction) => void;
}

const Shop: React.FC<ShopProps> = ({ onPurchaseSuccess }) => {
    const [activeGame, setActiveGame] = useState<Game>(Game.PUBG);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    const handlePurchaseClick = (pkg: Package) => {
        // Check if user has entered game ID for the selected game
        if (pkg.game === Game.PUBG && (!user?.pubgUID || !user?.pubgIGN)) {
            alert("Please set your PUBG UID and IGN in your profile before purchasing.");
            // Optionally, navigate to profile tab. This is complex from a child component.
            // For now, an alert is sufficient.
            return;
        }
        if (pkg.game === Game.MLBB && (!user?.mlbbUserID || !user?.mlbbZoneID)) {
            alert("Please set your Mobile Legends User ID and Zone ID in your profile before purchasing.");
            return;
        }

        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPackage(null);
    };
    
    const handleSuccess = (transaction: Transaction) => {
        onPurchaseSuccess(transaction);
        handleCloseModal();
    };
    
    const packagesToShow = ALL_PACKAGES.filter(p => p.game === activeGame);
    
    const GameButton: React.FC<{game: Game, logoUrl: string}> = ({game, logoUrl}) => {
        const isActive = activeGame === game;
        return (
            <button 
                onClick={() => setActiveGame(game)} 
                className={`flex items-center space-x-3 px-6 py-2 rounded-lg transition-all duration-300 border-2 ${
                    isActive 
                    ? 'bg-b4u-blue border-b4u-blue shadow-lg' 
                    : 'bg-b4u-secondary border-b4u-border hover:border-b4u-blue'
                }`}
            >
                <img src={logoUrl} alt={`${game} logo`} className="h-8 w-auto object-contain"/>
                <span className={`font-semibold text-lg ${isActive ? 'text-white' : 'text-gray-300'}`}>{game}</span>
            </button>
        )
    }

    return (
        <div>
            <div className="flex justify-center space-x-4 mb-8">
                <GameButton game={Game.PUBG} logoUrl={PUBG_LOGO_URL} />
                <GameButton game={Game.MLBB} logoUrl={MLBB_LOGO_URL} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {packagesToShow.map(pkg => (
                    <PackageCard key={pkg.id} pkg={pkg} onPurchase={handlePurchaseClick} />
                ))}
            </div>
            {selectedPackage && (
                <PurchaseModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    pkg={selectedPackage}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
};

export default Shop;