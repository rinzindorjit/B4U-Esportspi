
import React, { useState } from 'react';
import { Transaction, TransactionStatus, User } from '../../types';
import { ALL_PACKAGES } from '../../constants';

const mockAdminUser1: Partial<User> = { piUsername: 'b4u_gamer' };
const mockAdminUser2: Partial<User> = { piUsername: 'pi_lover' };

const mockAdminTransactions: Transaction[] = [
    {
        id: 'adm_t1',
        date: '2024-07-28 14:30',
        package: ALL_PACKAGES[5], // 8100 UC
        status: TransactionStatus.COMPLETED,
        piAmount: 2.5971,
        transactionId: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
        user: mockAdminUser1 as User,
    },
    {
        id: 'adm_t2',
        date: '2024-07-28 11:05',
        package: ALL_PACKAGES[16], // 12000 Diamonds
        status: TransactionStatus.COMPLETED,
        piAmount: 5.1942,
        transactionId: 'b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3',
        user: mockAdminUser2 as User,
    },
    {
        id: 'adm_t3',
        date: '2024-07-27 18:00',
        package: ALL_PACKAGES[2], // 660 UC
        status: TransactionStatus.PENDING,
        piAmount: 0.2597,
        transactionId: 'c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
        user: mockAdminUser1 as User,
    },
    {
        id: 'adm_t4',
        date: '2024-07-26 09:20',
        package: ALL_PACKAGES[1], // 325 UC
        status: TransactionStatus.FAILED,
        piAmount: 0.1664,
        transactionId: 'd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5',
        user: mockAdminUser2 as User,
    },
];

const StatusBadge: React.FC<{ status: TransactionStatus }> = ({ status }) => {
    const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    let specificClasses = '';
    switch (status) {
        case TransactionStatus.COMPLETED:
            specificClasses = 'bg-green-100 text-green-800';
            break;
        case TransactionStatus.PENDING:
            specificClasses = 'bg-yellow-100 text-yellow-800';
            break;
        case TransactionStatus.FAILED:
            specificClasses = 'bg-red-100 text-red-800';
            break;
    }
    return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};


const TransactionMonitoring: React.FC = () => {
    const [transactions] = useState<Transaction[]>(mockAdminTransactions);

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Transaction Monitoring</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-b4u-border">
                    <thead className="bg-b4u-dark">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Package</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Pi Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-b4u-secondary divide-y divide-b4u-border">
                        {transactions.map(tx => (
                            <tr key={tx.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{tx.user.piUsername}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.package.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-pi-yellow font-semibold">{tx.piAmount.toFixed(4)} π</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={tx.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono truncate max-w-xs">{tx.transactionId}</td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                    {tx.status === TransactionStatus.PENDING && (
                                        <button className="text-green-400 hover:text-green-300">Approve</button>
                                    )}
                                    {tx.status !== TransactionStatus.COMPLETED && (
                                         <button className="text-red-500 hover:text-red-400">Reject</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionMonitoring;
