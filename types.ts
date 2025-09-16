
export enum Game {
    PUBG = "PUBG Mobile",
    MLBB = "Mobile Legends: Bang Bang",
}

export interface Package {
    id: string;
    game: Game;
    name: string;
    amount: number;
    currency: 'UC' | 'Diamonds';
    usdtValue: number;
    imageUrl?: string;
}

export interface User {
    piUsername: string;
    piWalletAddress: string;
    email: string;
    contactNumber: string;
    country: string;
    language: string;
    pubgIGN: string;
    pubgUID: string;
    mlbbUserID: string;
    mlbbZoneID: string;
    referralCode?: string;
}

export enum TransactionStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed',
    FAILED = 'Failed',
}

export interface Transaction {
    id: string;
    date: string;
    package: Package;
    status: TransactionStatus;
    piAmount: number;
    transactionId: string;
    user: User;
}