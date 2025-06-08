// ========================================================================================
// FILE: src/components/tabs/ResultsTab.js
// ========================================================================================

import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import Button from '../ui/Button';

const ResultsTab = () => {
    const { processingResults, exportResults } = useDataContext();

    return (
        <div>
            <h4 className="text-lg font-bold mb-4">Վերջնական արդյունքներ և տեղեկագիր</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
                    <div className="font-bold mb-4 text-gray-700">Մշակման ամփոփում</div>
                    <div>Բնօրինակ տվյալներ: <span className="font-bold">{processingResults.originalCount}</span></div>
                    <div>Գեներացված տվյալներ: <span className="font-bold">{processingResults.syntheticCount}</span></div>
                    <div>Մաքրված տվյալներ: <span className="font-bold">{processingResults.cleanedCount}</span></div>
                    <div>Ընդհանուր որակի բարելավում: <span className="font-bold">{processingResults.qualityImprovement}%</span></div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
                    <div className="font-bold mb-4 text-gray-700">Առաջարկություններ մենեջերին</div>
                    <div className="space-y-2 text-sm">
                        <div>📈 Տվյալների որակը բարելավվել է</div>
                        <div>🎯 Կանխատեսման ճշտությունը ավելացել է</div>
                        <div>📊 Որոշումների աջակցման համար պատրաստ է</div>
                    </div>
                </div>
            </div>

            <div className="space-x-2">
                <Button onClick={exportResults} variant="success">
                    📤 Արտահանել վերլուծության արդյունքները
                </Button>
                <Button onClick={() => alert('Տեղեկագիրը պատրաստ է ուղարկման համար')} variant="secondary">
                    📧 Ուղարկել մենեջերին
                </Button>
                <Button onClick={() => alert('Մաքրված տվյալները ներբեռնվում են')} variant="secondary">
                    💾 Ներբեռնել մաքրված տվյալները
                </Button>
            </div>
        </div>
    );
};

export default ResultsTab;