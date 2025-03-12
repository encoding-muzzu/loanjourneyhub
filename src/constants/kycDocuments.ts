
import { IdCard, FileText, Home } from "lucide-react";
import React from "react";

export const documentLabels = {
  'id-front': {
    title: 'ID Proof (Front)',
    description: 'Government-issued ID card front side',
    icon: <IdCard className="h-6 w-6 text-white" />
  },
  'id-back': {
    title: 'ID Proof (Back)',
    description: 'Government-issued ID card back side',
    icon: <IdCard className="h-6 w-6 text-white" />
  },
  'address-front': {
    title: 'Address Proof (Front)',
    description: 'Utility bill or bank statement',
    icon: <FileText className="h-6 w-6 text-white" />
  },
  'address-back': {
    title: 'Address Proof (Back)',
    description: 'Back side if applicable',
    icon: <Home className="h-6 w-6 text-white" />
  }
};
