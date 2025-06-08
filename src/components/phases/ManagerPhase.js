import React from 'react';
import { useDataContext } from '../../contexts/DataContext';
import InputField from '../forms/InputField';
import SelectField from '../forms/SelectField';
import TextAreaField from '../forms/TextAreaField';
import Button from '../ui/Button';

const ManagerPhase = () => {
  const { 
    projectName, setProjectName,
    dataType, setDataType,
    dataSource, setDataSource,
    rawData, setRawData,
    managerPhaseActive,
    submitManagerData
  } = useDataContext();

  const dataTypeOptions = [
    { value: "", label: "Ընտրեք տվյալների տեսակը" },
    { value: "financial", label: "Ֆինանսական տվյալներ" },
    { value: "sales", label: "Վաճառքի տվյալներ" },
    { value: "customer", label: "Հաճախորդների տվյալներ" },
    { value: "operational", label: "Գործառնական տվյալներ" }
  ];

  return (
    <div className={`bg-white/95 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${managerPhaseActive ? 'scale-105 shadow-xl' : ''}`}>
      <div className="flex items-center mb-5 pb-4 border-b-2 border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-xl mr-4">
          👨‍💼
        </div>
        <h3 className="text-lg font-bold">Մենեջերի փուլ - Տվյալների մուտքագրում</h3>
      </div>

      <InputField
        label="Նախագծի անվանումը"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Մուտքագրեք նախագծի անվանումը"
        required
      />

      <SelectField
        label="Տվյալների տեսակը"
        value={dataType}
        onChange={(e) => setDataType(e.target.value)}
        options={dataTypeOptions}
        required
      />

      <TextAreaField
        label="Տվյալների աղբյուրը"
        value={dataSource}
        onChange={(e) => setDataSource(e.target.value)}
        placeholder="Նկարագրեք տվյալների աղբյուրը և բնութագրում"
        rows={3}
      />

      <TextAreaField
        label="Չափանիշներ (CSV ֆորմատով)"
        value={rawData}
        onChange={(e) => setRawData(e.target.value)}
        placeholder="Մուտքագրեք տվյալները CSV ֆորմատով:&#10;Օրինակ:&#10;Ամսաթիվ,Արժեք,Կատեգորիա&#10;2024-01-01,1500,A&#10;2024-01-02,1750,B"
        rows={6}
        required
      />

      <Button onClick={submitManagerData} size="lg">
        📤 Ուղարկել վերլուծաբանին
      </Button>
    </div>
  );
};

export default ManagerPhase;