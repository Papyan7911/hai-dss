// ========================================================================================
// FILE: src/components/tabs/DenoisingTab.js
// ========================================================================================

import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const DenoisingTab = () => {
  const { 
    cleaningIntensity,
    setCleaningIntensity,
    showDenoisingResults,
    cleaningStats,
    startDenoising
  } = useDataContext();

  return (
    <div>
      <h4 className="text-lg font-bold mb-4">Աղմուկի մաքրում և տվյալների մաքրման</h4>
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-dashed border-green-300 rounded-lg p-5 mb-4">
        <h5 className="font-bold mb-3">🧹 Մաքրման ալգորիթմներ</h5>
        <div className="space-y-2 mb-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            Ոչ ստանդարտ արժեքների բացառում
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            Բացակայող արժեքների լրացում
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            Կրկնակիների հեռացում
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            Ստատիստիկական նորմալիզացիա
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Մաքրման ինտենսիվություն:
            <input
              type="range"
              min="1"
              max="10"
              value={cleaningIntensity}
              onChange={(e) => setCleaningIntensity(e.target.value)}
              className="w-full mt-1"
            />
            <span className="text-sm text-gray-600">{cleaningIntensity}/10</span>
          </label>
        </div>

        <Button onClick={startDenoising} variant="success">
          🧹 Սկսել մաքրումը
        </Button>
      </div>

      {showDenoisingResults && (
        <Alert type="success">
          <strong>Մաքրումը ավարտված է:</strong> {cleaningStats}
        </Alert>
      )}
    </div>
  );
};

export default DenoisingTab;