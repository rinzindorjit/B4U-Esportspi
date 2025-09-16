import { Game, Package } from './types';
import { FacebookIcon, YoutubeIcon, TiktokIcon, InstagramIcon, LinkedinIcon } from './components/common/Icons';

// Game Logos & Images
export const PUBG_LOGO_URL = 'https://cdn.midasbuy.com/images/pubgm_app-icon_512x512%281%29.e9f7efc0.png';
export const MLBB_LOGO_URL = 'https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png';
export const PUBG_UC_IMAGE_URL = 'https://cdn.midasbuy.com/images/Icon_UC_07_int.ceff1201.png';
export const MLBB_DIAMOND_IMAGE_URL = 'https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png';


// Social Media Links
export const SOCIAL_LINKS = [
    { name: 'Facebook', url: 'https://www.facebook.com/b4uesports', icon: FacebookIcon },
    { name: 'YouTube', url: 'https://youtube.com/@b4uesports', icon: YoutubeIcon },
    { name: 'TikTok', url: 'https://www.tiktok.com/b4uesports', icon: TiktokIcon },
    { name: 'Instagram', url: 'https://www.instagram.com/b4uesports', icon: InstagramIcon },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/b4uesports/', icon: LinkedinIcon },
];

// Legal Pages
export type LegalPageType = 'terms' | 'privacy' | 'refund';

export const LEGAL_LINKS: { key: LegalPageType, name: string }[] = [
    { key: 'terms', name: 'Terms of Service' },
    { key: 'privacy', name: 'Privacy Policy' },
    { key: 'refund', name: 'Refund Policy' },
];

export const LegalContent: Record<LegalPageType, { title: string, content: string }> = {
    terms: {
        title: 'Terms of Service',
        content: 'This is a placeholder for the Terms of Service. In a real application, this would contain the full legal text governing the use of the B4U Esports platform.'
    },
    privacy: {
        title: 'Privacy Policy',
        content: 'This is a placeholder for the Privacy Policy. In a real application, this would detail how user data is collected, used, and protected by B4U Esports.'
    },
    refund: {
        title: 'Refund Policy',
        content: 'All sales of digital in-game currency are final and non-refundable. This is a placeholder for the Refund Policy. In a real application, this would explain the conditions under which users can request a refund for their purchases.'
    }
};

// Game Packages
export const ALL_PACKAGES: Package[] = [
    // PUBG Mobile
    { id: 'pubg1', game: Game.PUBG, name: '60 UC', amount: 60, currency: 'UC', usdtValue: 1.5000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg2', game: Game.PUBG, name: '325 UC', amount: 325, currency: 'UC', usdtValue: 6.5000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg3', game: Game.PUBG, name: '660 UC', amount: 660, currency: 'UC', usdtValue: 12.0000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg4', game: Game.PUBG, name: '1800 UC', amount: 1800, currency: 'UC', usdtValue: 25.0000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg5', game: Game.PUBG, name: '3850 UC', amount: 3850, currency: 'UC', usdtValue: 49.0000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg6', game: Game.PUBG, name: '8100 UC', amount: 8100, currency: 'UC', usdtValue: 96.0000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg7', game: Game.PUBG, name: '16200 UC', amount: 16200, currency: 'UC', usdtValue: 186.0000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg8', game: Game.PUBG, name: '24300 UC', amount: 24300, currency: 'UC', usdtValue: 278.0000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg9', game: Game.PUBG, name: '32400 UC', amount: 32400, currency: 'UC', usdtValue: 369.0000, imageUrl: PUBG_UC_IMAGE_URL },
    { id: 'pubg10', game: Game.PUBG, name: '40500 UC', amount: 40500, currency: 'UC', usdtValue: 459.0000, imageUrl: PUBG_UC_IMAGE_URL },

    // Mobile Legends: Bang Bang
    { id: 'mlbb1', game: Game.MLBB, name: '56 Diamonds', amount: 56, currency: 'Diamonds', usdtValue: 3.0000, imageUrl: MLBB_DIAMOND_IMAGE_URL },
    { id: 'mlbb2', game: Game.MLBB, name: '278 Diamonds', amount: 278, currency: 'Diamonds', usdtValue: 6.0000, imageUrl: MLBB_DIAMOND_IMAGE_URL },
    { id: 'mlbb3', game: Game.MLBB, name: '571 Diamonds', amount: 571, currency: 'Diamonds', usdtValue: 11.0000, imageUrl: MLBB_DIAMOND_IMAGE_URL },
    { id: 'mlbb4', game: Game.MLBB, name: '1783 Diamonds', amount: 1783, currency: 'Diamonds', usdtValue: 33.0000, imageUrl: MLBB_DIAMOND_IMAGE_URL },
    { id: 'mlbb5', game: Game.MLBB, name: '3005 Diamonds', amount: 3005, currency: 'Diamonds', usdtValue: 52.0000, imageUrl: MLBB_DIAMOND_IMAGE_URL },
    { id: 'mlbb6', game: Game.MLBB, name: '6012 Diamonds', amount: 6012, currency: 'Diamonds', usdtValue: 99.0000, imageUrl: MLBB_DIAMOND_IMAGE_URL },
    { id: 'mlbb7', game: Game.MLBB, name: '12000 Diamonds', amount: 12000, currency: 'Diamonds', usdtValue: 200.0000, imageUrl: MLBB_DIAMOND_IMAGE_URL },
];