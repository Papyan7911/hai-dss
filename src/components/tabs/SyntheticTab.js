// ========================================================================================
// FILE: src/components/tabs/SyntheticTab.js
// ========================================================================================

import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';

const SyntheticTab = () => {
    const {
        syntheticStatus,
        syntheticProgress,
        syntheticData,
        showSyntheticPreview,
        generateSyntheticData,
        previewSynthetic,
        downloadSyntheticData
    } = useDataContext();

    return (
        <div>
            <h4 className="text-lg font-bold mb-4">Սինթետիկ տվյալների գեներացում</h4>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-300 rounded-lg p-5 mb-4">
                <h5 className="font-bold mb-3">🧬 Գեներացման պրոցես</h5>
                <div>Վիճակ: <span className="font-bold">{syntheticStatus}</span></div>
                <ProgressBar value={syntheticProgress} color="purple" />

                <div className="mt-4 space-x-2">
                    <Button onClick={generateSyntheticData}>
                        🚀 Սկսել գեներացումը
                    </Button>
                    <Button onClick={previewSynthetic} variant="secondary">
                        👀 Նախադիտում
                    </Button>
                </div>
            </div>

            {showSyntheticPreview && syntheticData && (
                <div>
                    <h5 className="font-bold mb-3">Գեներացված տվյալների նմուշ:</h5>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    {Object.keys(syntheticData[0] || {}).map(header => (
                                        <th key={header} className="border border-gray-300 p-2 bg-gray-100 font-bold text-left">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {syntheticData.slice(0, 10).map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, cellIndex) => (
                                            <td key={cellIndex} className="border border-gray-300 p-2 bg-blue-50">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <Button onClick={downloadSyntheticData} variant="success">
                            📄 Ներբեռնել սինթետիկ տվյալները
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SyntheticTab;