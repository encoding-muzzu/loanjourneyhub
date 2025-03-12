
import React, { createContext, useContext, useState } from 'react';

type Step = 'welcome' | 'pre-qualification' | 'pan-verification' | 'offer-matching' | 'offers' | 'kyc-process' | 'lender-process' | 'loan-agreement' | 'esign' | 'nach' | 'complete';

interface DocumentUploadProgress {
  idFront: boolean;
  idBack: boolean;
  addressFront: boolean;
  addressBack: boolean;
}

interface ProgressContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  steps: Step[];
  documentProgress: DocumentUploadProgress;
  updateDocumentProgress: (key: keyof DocumentUploadProgress, value: boolean) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [documentProgress, setDocumentProgress] = useState<DocumentUploadProgress>({
    idFront: false,
    idBack: false,
    addressFront: false,
    addressBack: false
  });
  
  const steps: Step[] = [
    'welcome',
    'pre-qualification',
    'pan-verification',
    'offer-matching',
    'offers',
    'kyc-process',
    'lender-process',
    'loan-agreement',
    'esign',
    'nach',
    'complete'
  ];

  const updateDocumentProgress = (key: keyof DocumentUploadProgress, value: boolean) => {
    setDocumentProgress(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <ProgressContext.Provider 
      value={{ 
        currentStep, 
        setCurrentStep, 
        steps, 
        documentProgress, 
        updateDocumentProgress 
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
