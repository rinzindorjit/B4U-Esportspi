import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface PriceContextType {
    piPrice: number | null;
    isLoading: boolean;
    error: string | null;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [piPrice, setPiPrice] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrice = async () => {
        // Only show the main loader on the very first fetch.
        // Subsequent fetches will update in the background.
        if (piPrice === null && !isLoading) {
            setIsLoading(true);
        }
        setError(null);

        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd&x_cg_demo_api_key=CG-z4MZkBd78fn7PgPhPYcKq1r4');
            
            if (!response.ok) {
                throw new Error(`CoinGecko API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data['pi-network'] && data['pi-network'].usd) {
                setPiPrice(data['pi-network'].usd);
            } else {
                throw new Error('Price data for "pi-network" not found in CoinGecko API response.');
            }
        } catch (err: any) {
            console.error('Failed to fetch Pi price:', err.message);
            setError("Failed to update live price. Displaying last known value.");
            
            // If this is the very first fetch and it fails, we use a fallback price
            // to ensure the application remains functional.
            if (piPrice === null) {
                console.warn("Using fallback price for initial load.");
                setPiPrice(38.50); // A recent, reasonable fallback value.
            }
        } finally {
            // Ensure loading is set to false after the first attempt, whether it succeeds or fails.
            if (isLoading) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchPrice();
        const interval = setInterval(fetchPrice, 60000); // Update every 60 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <PriceContext.Provider value={{ piPrice, isLoading, error }}>
            {children}
        </PriceContext.Provider>
    );
};

export const usePrice = () => {
    const context = useContext(PriceContext);
    if (context === undefined) {
        throw new Error('usePrice must be used within a PriceProvider');
    }
    return context;
};
