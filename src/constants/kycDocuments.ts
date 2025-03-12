
import { IdCard, FileText, Home } from "lucide-react";
import React from "react";

// Define icon types that can be rendered later
export type DocumentIconType = 'id-card' | 'file-text' | 'home';

export const documentLabels = {
  'id-front': {
    title: 'ID Proof (Front)',
    description: 'Government-issued ID card front side',
    iconType: 'id-card' as DocumentIconType
  },
  'id-back': {
    title: 'ID Proof (Back)',
    description: 'Government-issued ID card back side',
    iconType: 'id-card' as DocumentIconType
  },
  'address-front': {
    title: 'Address Proof (Front)',
    description: 'Utility bill or bank statement',
    iconType: 'file-text' as DocumentIconType
  },
  'address-back': {
    title: 'Address Proof (Back)',
    description: 'Back side if applicable',
    iconType: 'home' as DocumentIconType
  }
};

// Helper function to render the correct icon based on type
export const getDocumentIcon = (iconType: DocumentIconType) => {
  switch (iconType) {
    case 'id-card':
      return React.createElement(IdCard, { className: "h-6 w-6 text-white" });
    case 'file-text':
      return React.createElement(FileText, { className: "h-6 w-6 text-white" });
    case 'home':
      return React.createElement(Home, { className: "h-6 w-6 text-white" });
    default:
      return null;
  }
};
