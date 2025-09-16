
import React from 'react';
import { LegalPageType } from '../../constants';

interface LegalPageProps {
    page: LegalPageType;
    content: { title: string; content: string };
    onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ content, onBack }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={onBack}
                className="mb-8 inline-flex items-center text-b4u-blue hover:text-sky-400"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to main site
            </button>
            <div className="bg-b4u-secondary p-8 rounded-lg border border-b4u-border">
                <h1 className="text-4xl font-bold text-white mb-6">{content.title}</h1>
                <div className="prose prose-invert max-w-none text-gray-300">
                    <p>{content.content}</p>
                    {/* In a real application, this would render full Markdown or HTML content */}
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
