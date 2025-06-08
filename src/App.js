import React from 'react';
import { DataProvider } from './contexts/DataContext';
import DataAnalysisSystem from './components/DataAnalysisSystem';
import './index.css'; // ☑️ Այստեղ պետք է լինի

function App() {
  return (
    <DataProvider>
      <div className="App">
        <DataAnalysisSystem />
      </div>
    </DataProvider>
  );
}

export default App;