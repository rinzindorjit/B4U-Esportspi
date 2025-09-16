import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin: React.FC = () => {
    const { adminLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            await adminLogin(email, password);
            // onAuthStateChanged in AuthContext will handle the redirect
        } catch (err: any) {
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                setError('Invalid email or password. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
            console.error("Firebase login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-b4u-secondary p-8 rounded-xl shadow-2xl border border-b4u-border max-w-md w-full">
                <h1 className="text-3xl font-bold text-white mb-4">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-b4u-dark border-b4u-border rounded-md shadow-sm p-3 focus:ring-b4u-blue focus:border-b4u-blue"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-b4u-dark border-b4u-border rounded-md shadow-sm p-3 focus:ring-b4u-blue focus:border-b4u-blue"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-b4u-blue text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-sky-500 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;