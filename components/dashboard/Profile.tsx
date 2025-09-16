
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState<User | null>(user);
    const [isEditing, setIsEditing] = useState(false);
    
    if (!user || !formData) return <div>Loading profile...</div>;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Allow only numeric input for specific fields
        if (['pubgUID', 'mlbbUserID', 'mlbbZoneID'].includes(name)) {
            if (/^\d*$/.test(value)) {
                 setFormData({ ...formData, [name]: value });
            }
        } else {
             setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleSave = () => {
        updateUser(formData);
        setIsEditing(false);
    };

    const InputField = ({ label, name, value, onChange, readOnly = false, type = 'text' }: { label: string, name: string, value: string | undefined, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, readOnly?: boolean, type?: string }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-400">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value || ''}
                onChange={onChange}
                readOnly={readOnly}
                className={`mt-1 block w-full bg-b4u-dark border-b4u-border rounded-md shadow-sm focus:ring-b4u-blue focus:border-b4u-blue sm:text-sm ${readOnly ? 'text-gray-500 cursor-not-allowed' : 'text-white'}`}
            />
        </div>
    );

    return (
        <div className="bg-b4u-secondary p-8 rounded-lg border border-b4u-border max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Profile & Game IDs</h2>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-b4u-blue text-white font-semibold rounded-lg hover:bg-sky-500">Edit</button>
                ) : (
                    <div className="space-x-2">
                        <button onClick={() => { setIsEditing(false); setFormData(user); }} className="px-4 py-2 bg-gray-600 font-semibold rounded-lg hover:bg-gray-500">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500">Save</button>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="md:col-span-2 text-lg font-semibold text-b4u-blue border-b border-b4u-border pb-2">Pi Network Details (Read-only)</h3>
                <InputField label="Pi Username" name="piUsername" value={formData.piUsername} onChange={handleInputChange} readOnly />
                <InputField label="Pi Wallet Address" name="piWalletAddress" value={formData.piWalletAddress} onChange={handleInputChange} readOnly />

                <h3 className="md:col-span-2 text-lg font-semibold text-b4u-blue border-b border-b4u-border pb-2 mt-4">Personal Information</h3>
                <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditing} type="email" />
                <InputField label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} readOnly={!isEditing} />
                <InputField label="Country" name="country" value={formData.country} onChange={handleInputChange} readOnly={!isEditing} />
                <InputField label="Language" name="language" value={formData.language} onChange={handleInputChange} readOnly={!isEditing} />

                <h3 className="md:col-span-2 text-lg font-semibold text-b4u-blue border-b border-b4u-border pb-2 mt-4">PUBG Mobile</h3>
                <InputField label="IGN (In-Game Name)" name="pubgIGN" value={formData.pubgIGN} onChange={handleInputChange} readOnly={!isEditing} />
                <InputField label="UID (numeric only)" name="pubgUID" value={formData.pubgUID} onChange={handleInputChange} readOnly={!isEditing} type="text" />
                
                <h3 className="md:col-span-2 text-lg font-semibold text-b4u-blue border-b border-b4u-border pb-2 mt-4">Mobile Legends: Bang Bang</h3>
                <InputField label="User ID (numeric only)" name="mlbbUserID" value={formData.mlbbUserID} onChange={handleInputChange} readOnly={!isEditing} type="text" />
                <InputField label="Zone ID (numeric only)" name="mlbbZoneID" value={formData.mlbbZoneID} onChange={handleInputChange} readOnly={!isEditing} type="text" />

                <h3 className="md:col-span-2 text-lg font-semibold text-b4u-blue border-b border-b4u-border pb-2 mt-4">Referral</h3>
                 <InputField label="Referral Code (Optional)" name="referralCode" value={formData.referralCode} onChange={handleInputChange} readOnly={!isEditing} />
            </div>
        </div>
    );
};

export default Profile;
