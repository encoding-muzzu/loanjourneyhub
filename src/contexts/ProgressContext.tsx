
import React, { createContext, useContext, useState } from 'react';

type Step = 'welcome' | 'pre-qualification' | 'pan-verification' | 'offer-matching' | 'offers' | 'kyc-process';

interface ProgressContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  steps: Step[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  
  const steps: Step[] = [
    'welcome',
    'pre-qualification',
    'pan-verification',
    'offer-matching',
    'offers',
    'kyc-process'
  ];

  return (
    <ProgressContext.Provider value={{ currentStep, setCurrentStep, steps }}>
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
