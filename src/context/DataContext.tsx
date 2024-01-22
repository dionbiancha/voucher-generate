// DataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DataContextProps {
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  showQRCODE: string;
  setShowQRCODE: React.Dispatch<React.SetStateAction<string>>;
  selectType: string;
  setSelectType: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showQRCODE, setShowQRCODE] = useState<string>("");
  const [selectType, setSelectType] = useState<string>("");

  return (
    <DataContext.Provider
      value={{
        showPreview,
        setShowPreview,
        showQRCODE,
        setShowQRCODE,
        setSelectType,
        selectType,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }

  return context;
};
