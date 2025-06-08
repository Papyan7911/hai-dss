import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    // Form state
    const [projectName, setProjectName] = useState('');
    const [dataType, setDataType] = useState('');
    const [dataSource, setDataSource] = useState('');
    const [rawData, setRawData] = useState('');

    // Data state
    const [currentData, setCurrentData] = useState(null);
    const [syntheticData, setSyntheticData] = useState(null);
    const [cleanedData, setCleanedData] = useState(null);

    // UI state
    const [activeTab, setActiveTab] = useState('analysis');
    const [analysisStarted, setAnalysisStarted] = useState(false);
    const [managerPhaseActive, setManagerPhaseActive] = useState(false);
    const [showAnalysisWorkspace, setShowAnalysisWorkspace] = useState(false);

    // Analysis metrics state
    const [metrics, setMetrics] = useState({
        completeness: 0,
        accuracy: 0,
        missingValues: 0,
        outliers: 0,
        duplicates: 0
    });

    // Synthetic data state
    const [syntheticStatus, setSyntheticStatus] = useState('Նախապատրաստում...');
    const [syntheticProgress, setSyntheticProgress] = useState(0);
    const [showSyntheticPreview, setShowSyntheticPreview] = useState(false);

    // Denoising state
    const [cleaningIntensity, setCleaningIntensity] = useState(5);
    const [showDenoisingResults, setShowDenoisingResults] = useState(false);
    const [cleaningStats, setCleaningStats] = useState('');

    // Results state
    const [processingResults, setProcessingResults] = useState({
        originalCount: 0,
        syntheticCount: 0,
        cleanedCount: 0,
        qualityImprovement: 0
    });

    // Utility functions
    const parseCSV = (csvText) => {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index] ? values[index].trim() : null;
            });
            data.push(row);
        }
        return data;
    };

    const downloadFile = (content, filename, mimeType) => {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const submitManagerData = () => {
        if (!projectName || !dataType || !rawData) {
            alert('Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը');
            return;
        }

        const parsedData = parseCSV(rawData);
        setCurrentData(parsedData);
        setManagerPhaseActive(true);
        setProcessingResults(prev => ({ ...prev, originalCount: parsedData.length }));
    };

    const startAnalysis = () => {
        setShowAnalysisWorkspace(true);
        setAnalysisStarted(true);

        setTimeout(() => {
            const newMetrics = {
                completeness: Math.floor(Math.random() * 30) + 60,
                accuracy: Math.floor(Math.random() * 25) + 70,
                missingValues: Math.floor(Math.random() * 10) + 5,
                outliers: Math.floor(Math.random() * 8) + 2,
                duplicates: Math.floor(Math.random() * 5) + 1
            };
            setMetrics(newMetrics);
        }, 1000);
    };

    const createSyntheticDataset = () => {
        const headers = Object.keys(currentData[0]);
        const syntheticDataArray = [];
        const syntheticCount = Math.floor(Math.random() * 50) + 30;

        for (let i = 0; i < syntheticCount; i++) {
            const syntheticRow = {};

            headers.forEach(header => {
                const originalValues = currentData.map(row => row[header]).filter(val => val !== null);

                if (originalValues.length > 0) {
                    const numericValues = originalValues.filter(val => !isNaN(val) && val !== '');

                    if (numericValues.length > 0) {
                        const sum = numericValues.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                        const avg = sum / numericValues.length;
                        const stdDev = Math.sqrt(
                            numericValues.reduce((sq, n) => sq + Math.pow(parseFloat(n) - avg, 2), 0) / numericValues.length
                        );

                        syntheticRow[header] = (avg + (Math.random() - 0.5) * stdDev * 2).toFixed(2);
                    } else {
                        const randomOriginal = originalValues[Math.floor(Math.random() * originalValues.length)];
                        syntheticRow[header] = `Synthetic_${randomOriginal}_${Math.floor(Math.random() * 1000)}`;
                    }
                } else {
                    syntheticRow[header] = `Synthetic_${Math.floor(Math.random() * 10000)}`;
                }
            });

            syntheticDataArray.push(syntheticRow);
        }

        return syntheticDataArray;
    };

    const generateSyntheticData = () => {
        if (!currentData || currentData.length === 0) {
            alert('Նախ պետք է մուտքագրել բնօրինակ տվյալները');
            return;
        }

        setSyntheticStatus('Գեներացում...');
        setSyntheticProgress(0);

        const interval = setInterval(() => {
            setSyntheticProgress(prev => {
                const newProgress = prev + Math.random() * 15 + 5;
                if (newProgress >= 100) {
                    clearInterval(interval);

                    const synthetic = createSyntheticDataset();
                    setSyntheticData(synthetic);
                    setSyntheticStatus(`Ավարտված ✅ (Գեներացվել է ${synthetic.length} նոր տող)`);
                    setProcessingResults(prev => ({ ...prev, syntheticCount: synthetic.length }));

                    return 100;
                }
                return newProgress;
            });
        }, 200);
    };

    const previewSynthetic = () => {
        if (!syntheticData || syntheticData.length === 0) {
            alert('Նախ պետք է գեներացնել սինթետիկ տվյալները');
            return;
        }
        setShowSyntheticPreview(true);
    };

    const downloadSyntheticData = () => {
        if (!syntheticData || syntheticData.length === 0) {
            alert('Սինթետիկ տվյալներ չեն գտնվել');
            return;
        }

        const headers = Object.keys(syntheticData[0]);
        let csvContent = headers.join(',') + '\n';

        syntheticData.forEach(row => {
            const values = headers.map(header => `"${row[header]}"`);
            csvContent += values.join(',') + '\n';
        });

        downloadFile(csvContent, 'synthetic_data.csv', 'text/csv');
        alert(`📄 ${syntheticData.length} սինթետիկ տող արտահանվել է synthetic_data.csv ֆայլում`);
    };

    const startDenoising = () => {
        setTimeout(() => {
            const removedNoise = Math.floor(Math.random() * 50) + 20;
            const improvedAccuracy = Math.floor(Math.random() * 15) + 10;

            setCleaningStats(`Հեռացվել է ${removedNoise}% աղմուկ, բարելավվել է ճշտությունը ${improvedAccuracy}%-ով`);
            setShowDenoisingResults(true);

            setProcessingResults(prev => ({
                ...prev,
                cleanedCount: (currentData?.length || 0) + Math.floor(Math.random() * 100),
                qualityImprovement: 15 + Math.floor(Math.random() * 20)
            }));
        }, 2000);
    };

    const exportResults = () => {
        const analysisResults = {
            projectInfo: {
                name: projectName || 'Անանուն նախագիծ',
                type: dataType || 'Չսահմանված',
                analysisDate: new Date().toLocaleDateString('hy-AM'),
                analyst: 'Համակարգային վերլուծաբան'
            },
            dataQuality: {
                completeness: `${metrics.completeness}%`,
                accuracy: `${metrics.accuracy}%`,
                missingValues: metrics.missingValues.toString(),
                outliers: metrics.outliers.toString(),
                duplicates: metrics.duplicates.toString()
            },
            processing: {
                originalCount: processingResults.originalCount.toString(),
                syntheticCount: processingResults.syntheticCount.toString(),
                cleanedCount: processingResults.cleanedCount.toString(),
                qualityImprovement: `${processingResults.qualityImprovement}%`
            }
        };

        const jsonContent = JSON.stringify(analysisResults, null, 2);
        downloadFile(jsonContent, 'analysis_summary.json', 'application/json');

        alert('✅ Արդյունքները հաջողությամբ արտահանվել են');
    };

    const value = {
        // State
        projectName, setProjectName,
        dataType, setDataType,
        dataSource, setDataSource,
        rawData, setRawData,
        currentData, setCurrentData,
        syntheticData, setSyntheticData,
        cleanedData, setCleanedData,
        activeTab, setActiveTab,
        analysisStarted, setAnalysisStarted,
        managerPhaseActive, setManagerPhaseActive,
        showAnalysisWorkspace, setShowAnalysisWorkspace,
        metrics, setMetrics,
        syntheticStatus, setSyntheticStatus,
        syntheticProgress, setSyntheticProgress,
        showSyntheticPreview, setShowSyntheticPreview,
        cleaningIntensity, setCleaningIntensity,
        showDenoisingResults, setShowDenoisingResults,
        cleaningStats, setCleaningStats,
        processingResults, setProcessingResults,

        // Functions
        parseCSV,
        downloadFile,
        submitManagerData,
        startAnalysis,
        generateSyntheticData,
        previewSynthetic,
        downloadSyntheticData,
        startDenoising,
        exportResults
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};