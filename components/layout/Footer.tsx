
import React from 'react';
import { SOCIAL_LINKS, LEGAL_LINKS, LegalPageType } from '../../constants';

interface FooterProps {
    onNavigate: (page: LegalPageType) => void;
}


const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-b4u-secondary border-t border-b4u-border mt-12 py-8 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-lg font-bold text-b4u-blue mb-4">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4">
                        {SOCIAL_LINKS.map(link => (
                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-b4u-blue transition-colors">
                                <link.icon />
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-b4u-blue mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>Email: <a href="mailto:info@b4uesports.com" className="hover:text-b4u-blue">info@b4uesports.com</a></li>
                        <li>Phone: <a href="tel:+97517875099" className="hover:text-b4u-blue">+97517875099</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-b4u-blue mb-4">Legal</h3>
                    <ul className="space-y-2 text-gray-400">
                        {LEGAL_LINKS.map(link => (
                             <li key={link.key}>
                                <button onClick={() => onNavigate(link.key)} className="hover:text-b4u-blue transition-colors text-left w-full text-center md:text-left">
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-8 border-t border-b4u-border pt-4">
                &copy; {new Date().getFullYear()} B4U Esports. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
