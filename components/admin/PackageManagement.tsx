
import React, { useState } from 'react';
import { Package, Game } from '../../types';
import { ALL_PACKAGES } from '../../constants';

const PackageManagement: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>(ALL_PACKAGES);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Package>>({});

    const handleEdit = (pkg: Package) => {
        setIsEditing(pkg.id);
        setEditFormData(pkg);
    };

    const handleSave = (id: string) => {
        setPackages(packages.map(p => p.id === id ? { ...p, ...editFormData } as Package : p));
        setIsEditing(null);
    };
    
    const handleDelete = (id: string) => {
        setPackages(packages.filter(p => p.id !== id));
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setEditFormData({...editFormData, [name]: name === 'usdtValue' || name === 'amount' ? parseFloat(value) : value });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Package Management</h2>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-b4u-border">
                    <thead className="bg-b4u-dark">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Game</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">USDT Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-b4u-secondary divide-y divide-b4u-border">
                        {packages.map(pkg => (
                            <tr key={pkg.id}>
                                {isEditing === pkg.id ? (
                                    <>
                                        <td><select name="game" value={editFormData.game} onChange={handleInputChange} className="bg-b4u-dark border-b4u-border rounded-md w-full p-1"><option value={Game.PUBG}>PUBG</option><option value={Game.MLBB}>MLBB</option></select></td>
                                        <td><input type="text" name="name" value={editFormData.name} onChange={handleInputChange} className="bg-b4u-dark border-b4u-border rounded-md w-full p-1"/></td>
                                        <td><input type="number" name="amount" value={editFormData.amount} onChange={handleInputChange} className="bg-b4u-dark border-b4u-border rounded-md w-full p-1"/></td>
                                        <td><input type="number" step="0.01" name="usdtValue" value={editFormData.usdtValue} onChange={handleInputChange} className="bg-b4u-dark border-b4u-border rounded-md w-full p-1"/></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                            <button onClick={() => handleSave(pkg.id)} className="text-green-400 hover:text-green-300">Save</button>
                                            <button onClick={() => setIsEditing(null)} className="text-gray-400 hover:text-gray-300">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4">{pkg.game}</td>
                                        <td className="px-6 py-4 font-medium text-white">{pkg.name}</td>
                                        <td className="px-6 py-4">{pkg.amount} {pkg.currency}</td>
                                        <td className="px-6 py-4">${pkg.usdtValue.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                                            <button onClick={() => handleEdit(pkg)} className="text-b4u-blue hover:text-sky-400">Edit</button>
                                            <button onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Add 'Create New Package' button and form here */}
        </div>
    );
};

export default PackageManagement;
