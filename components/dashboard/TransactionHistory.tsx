
import React from 'react';
import { Transaction, TransactionStatus } from '../../types';

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


const TransactionHistory: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    return (
        <div className="bg-b4u-secondary p-6 rounded-lg border border-b4u-border">
            <h2 className="text-2xl font-bold text-white mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
                <p className="text-gray-400 text-center py-8">You have no transactions yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-b4u-border">
                        <thead className="bg-b4u-dark">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Package</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pi Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody className="bg-b4u-secondary divide-y divide-b4u-border">
                            {transactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{tx.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{tx.package.name} <span className="text-xs text-gray-400">({tx.package.game})</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-pi-yellow font-semibold">{tx.piAmount} π</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><StatusBadge status={tx.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{tx.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;