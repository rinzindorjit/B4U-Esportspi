
import React, { useState } from 'react';
import { User } from '../../types';

// Mock user data for the admin panel
const mockUsers: User[] = [
    {
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
    },
    {
        piUsername: 'pi_lover',
        piWalletAddress: 'GAIOSHRY63724T567SDF78SD6F7SD8FSD6F7SD8FSD6F7SD8FSD6F7',
        email: 'pi.lover@example.com',
        contactNumber: '+442079460958',
        country: 'United Kingdom',
        language: 'English',
        pubgIGN: 'PiDestroyer',
        pubgUID: '5987654321',
        mlbbUserID: '123456789',
        mlbbZoneID: '4321',
    },
];

const UserManagement: React.FC = () => {
    const [users] = useState<User[]>(mockUsers);

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-b4u-border">
                    <thead className="bg-b4u-dark">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Pi Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Country</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">PUBG UID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">MLBB User ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-b4u-secondary divide-y divide-b4u-border">
                        {users.map(user => (
                            <tr key={user.piUsername}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.piUsername}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.country}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.pubgUID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.mlbbUserID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                    <button className="text-b4u-blue hover:text-sky-400">View Details</button>
                                    <button className="text-red-500 hover:text-red-400">Suspend</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
