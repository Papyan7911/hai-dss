// ========================================================================================
// FILE: src/components/tabs/AnalysisTab.js
// ========================================================================================

import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import ProgressBar from '../ui/ProgressBar';
import StatusIndicator from '../ui/StatusIndicator';
import Alert from '../ui/Alert';

const AnalysisTab = () => {
    const { metrics } = useDataContext();

    return (
        <div>
            <h4 className="text-lg font-bold mb-4">Առաջնային տվյալների վերլուծություն</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
                    <div className="font-bold mb-4 text-gray-700">Տվյալների որակի գնահատում</div>
                    <div>Ամբողջությունը: <span className="font-bold">{metrics.completeness}%</span></div>
                    <ProgressBar value={metrics.completeness} />

                    <div>Ճշտությունը: <span className="font-bold">{metrics.accuracy}%</span></div>
                    <ProgressBar value={metrics.accuracy} />
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-200">
                    <div className="font-bold mb-4 text-gray-700">Հայտնաբերված խնդիրներ</div>
                    <div className="space-y-2">
                        <StatusIndicator status="pending">
                            Բացակայող արժեքներ: <span className="font-bold ml-1">{metrics.missingValues}</span>
                        </StatusIndicator>
                        <StatusIndicator status="processing">
                            Ոչ ստանդարտ արժեքներ: <span className="font-bold ml-1">{metrics.outliers}</span>
                        </StatusIndicator>
                        <StatusIndicator status="complete">
                            Կրկնակի գրանցումներ: <span className="font-bold ml-1">{metrics.duplicates}</span>
                        </StatusIndicator>
                    </div>
                </div>
            </div>

            <Alert type="warning">
                <strong>Վերլուծաբանի գնահատում:</strong>
                Տվյալները պահանջում են լրացուցիչ մշակում սինթետիկ գեներացման և աղմուկի մաքրման միջոցով:
            </Alert>
        </div>
    );
};

export default AnalysisTab;