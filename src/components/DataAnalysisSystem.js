import React from 'react';
import { useDataContext } from '../contexts/DataContext';
import Header from './layout/Header';
import ManagerPhase from './phases/ManagerPhase';
import AnalystPhase from './phases/AnalystPhase';
import TabNavigation from './layout/TabNavigation';
import AnalysisTab from './tabs/AnalysisTab';
import SyntheticTab from './tabs/SyntheticTab';
import DenoisingTab from './tabs/DenoisingTab';
import ResultsTab from './tabs/ResultsTab';

const DataAnalysisSystem = () => {
    const { activeTab, showAnalysisWorkspace } = useDataContext();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'analysis':
                return <AnalysisTab />;
            case 'synthetic':
                return <SyntheticTab />;
            case 'denoising':
                return <DenoisingTab />;
            case 'results':
                return <ResultsTab />;
            default:
                return <AnalysisTab />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 text-gray-800">
            <div className="max-w-7xl mx-auto p-5">
                <Header />

                {/* Workflow Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                    <ManagerPhase />
                    <AnalystPhase />
                </div>

                {/* Analysis Workspace */}
                {showAnalysisWorkspace && (
                    <div className="bg-white/95 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                        <TabNavigation />
                        <div className="min-h-96">
                            {renderTabContent()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataAnalysisSystem;