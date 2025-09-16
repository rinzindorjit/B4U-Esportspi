
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { usePrice } from '../../contexts/PriceContext';
import { ALL_PACKAGES } from '../../constants';

const data = [
  { name: '60 UC', revenue: 4000 },
  { name: '325 UC', revenue: 3000 },
  { name: '56 Diamonds', revenue: 2000 },
  { name: '660 UC', revenue: 2780 },
  { name: '278 Diamonds', revenue: 1890 },
  { name: '1800 UC', revenue: 2390 },
  { name: '571 Diamonds', revenue: 3490 },
];

const AnalyticsDashboard: React.FC = () => {
    const { piPrice } = usePrice();
    const totalRevenueUSDT = 15000;
    const totalRevenuePi = piPrice ? (totalRevenueUSDT / piPrice).toFixed(2) : '...';

    const StatCard: React.FC<{title: string, value: string, subValue?: string}> = ({title, value, subValue}) => (
        <div className="bg-b4u-dark p-6 rounded-lg border border-b4u-border">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
            {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${totalRevenueUSDT.toLocaleString()}`} subValue={`${totalRevenuePi} π`} />
                <StatCard title="Total Users" value="1,250" />
                <StatCard title="Transactions (24h)" value="82" />
                <StatCard title="Most Popular Package" value="8100 UC" subValue={ALL_PACKAGES.find(p => p.name === "8100 UC")?.game} />
            </div>
            
            <div className="bg-b4u-dark p-6 rounded-lg border border-b4u-border">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue by Package (USDT)</h3>
                 <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                            <XAxis dataKey="name" stroke="#888ea8" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#888ea8" tick={{ fontSize: 12 }}/>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#e0e0e0' }}
                                labelStyle={{ color: '#b4u-blue' }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                            />
                            <Legend wrapperStyle={{fontSize: "14px"}} />
                            <Bar dataKey="revenue" fill="#38bdf8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
