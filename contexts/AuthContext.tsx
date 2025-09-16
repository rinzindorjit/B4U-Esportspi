
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { auth } from '../firebase';
// FIX: Import firebase v9 compat for types and functions.
import firebase from 'firebase/compat/app';


// Mock user data for demonstration
const mockUser: User = {
    piUsername: 'b4u_gamer',
    piWalletAddress: 'GD2LXRVZQJ5K4L6J5Z4X5X4F7Y3Z2A1B3C4D5E6F7G8H9I0J1K2L3M',
    email: 'gamer@b4uesports.com',
    contactNumber: '+1234567890',
    country: 'United States',
    language: 'English',
    pubgIGN: 'B4U_Pro',
    pubgUID: '5123456789',
    mlbbUserID: '987654321',
    mlbbZoneID: '1234',
    referralCode: '',
};

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    updateUser: (updatedUser: User) => void;
    isAdminView: boolean;
    toggleAdminView: () => void;
    adminUser: firebase.User | null;
    adminLogin: (email: string, password: string) => Promise<void>;
    adminLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdminView, setIsAdminView] = useState(false);
    const [adminUser, setAdminUser] = useState<firebase.User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Persist mock Pi user state to avoid logging out on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem('b4u-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Listen for Firebase admin auth changes
    useEffect(() => {
        // This v8 syntax works because of the compat libraries
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setAdminUser(user);
            setAuthLoading(false);
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const login = () => {
        // This is for the mock Pi user
        localStorage.setItem('b4u-user', JSON.stringify(mockUser));
        setUser(mockUser);
    };

    const logout = () => {
        // This is for the mock Pi user
        localStorage.removeItem('b4u-user');
        setUser(null);
        setIsAdminView(false);
    };

    const updateUser = (updatedUser: User) => {
        if (user) {
            localStorage.setItem('b4u-user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    };

    const toggleAdminView = () => {
        setIsAdminView(prev => !prev);
    };

    const adminLogin = async (email: string, password: string) => {
        // This v8 syntax works because of the compat libraries
        await auth.signInWithEmailAndPassword(email, password);
    };

    const adminLogout = async () => {
        // This v8 syntax works because of the compat libraries
        await auth.signOut();
        setIsAdminView(false); // Exit admin view on logout
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isAdminView, toggleAdminView, adminUser, adminLogin, adminLogout }}>
            {!authLoading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};