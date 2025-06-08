import React from 'react';
import { useDataContext } from '../../contexts/DataContext';

const TabNavigation = () => {
    const { activeTab, setActiveTab } = useDataContext();

    const tabs = [
        { id: 'analysis', label: '📈 Առաջնային վերլուծություն' },
        { id: 'synthetic', label: '🧬 Սինթետիկ տվյալներ' },
        { id: 'denoising', label: '🧹 Աղմուկի մաքրում' },
        { id: 'results', label: '📊 Արդյունքներ' }
    ];

    return (
        <div className="flex flex-wrap mb-5 border-b-2 border-gray-100">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 cursor-pointer rounded-t-lg mr-1 transition-all font-medium ${activeTab === tab.id
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border border-indigo-500'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;