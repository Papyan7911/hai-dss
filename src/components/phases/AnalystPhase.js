import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import Alert from './../ui/Alert';
import Button from './../ui/Button';

const AnalystPhase = () => {
    const {
        managerPhaseActive,
        projectName,
        dataType,
        currentData,
        startAnalysis
    } = useDataContext();

    return (
        <div className={`bg-white/95 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${managerPhaseActive ? 'scale-105 shadow-xl' : ''}`}>
            <div className="flex items-center mb-5 pb-4 border-b-2 border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-xl mr-4">
                    🔬
                </div>
                <h3 className="text-lg font-bold">Վերլուծաբանի փուլ - Տվյալների մշակում</h3>
            </div>

            {!managerPhaseActive ? (
                <Alert type="info">
                    <strong>Սպասում է տվյալներին...</strong><br />
                    Մենեջերը պետք է մուտքագրի տվյալները վերլուծության համար
                </Alert>
            ) : (
                <div>
                    <Alert type="success">
                        <strong>Տվյալները ստացված են</strong><br />
                        Նախագիծ: {projectName}<br />
                        Տիպ: {dataType}<br />
                        Տողերի քանակ: {currentData?.length || 0}
                    </Alert>
                    <div className="mt-4">
                        <Button onClick={startAnalysis} size="lg">
                            🔬 Սկսել վերլուծությունը
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalystPhase;