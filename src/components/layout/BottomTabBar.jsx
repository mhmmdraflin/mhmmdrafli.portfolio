import { useState } from 'react';
import './BottomTabBar.css';

const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '📱' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'journey', label: 'Journey', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
];

export default function BottomTabBar() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        const element = document.getElementById(tabId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="bottom-tab-bar glass">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}
