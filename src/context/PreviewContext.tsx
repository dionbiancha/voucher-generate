// PreviewContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PreviewContextProps {
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  showQRCODE: string;
  setShowQRCODE: React.Dispatch<React.SetStateAction<string>>;
}

const PreviewContext = createContext<PreviewContextProps | undefined>(
  undefined
);

interface PreviewProviderProps {
  children: ReactNode;
}

export const PreviewProvider: React.FC<PreviewProviderProps> = ({
  children,
}) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showQRCODE, setShowQRCODE] = useState<string>("");

  return (
    <PreviewContext.Provider
      value={{ showPreview, setShowPreview, showQRCODE, setShowQRCODE }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);

  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }

  return context;
};
