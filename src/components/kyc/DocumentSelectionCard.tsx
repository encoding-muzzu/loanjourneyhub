
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { IdCard, Video, Upload, ShieldCheck, AlertTriangle } from "lucide-react";

interface DocumentSelectionCardProps {
  selectedOption: number | null;
  onOptionSelect: (option: number) => void;
}

const DocumentSelectionCard: React.FC<DocumentSelectionCardProps> = ({ 
  selectedOption, 
  onOptionSelect 
}) => {
  return (
    <>
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" />
            Document Verification
          </CardTitle>
          <CardDescription className="text-white/90">
            Complete your KYC by uploading required documents
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 mb-4">
            To verify your identity and address, please upload clear photos of your documents.
          </p>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Important Instructions
            </h4>
            <ul className="list-disc pl-5 text-sm text-amber-700 space-y-1">
              <li>Ensure all four corners of the document are visible</li>
              <li>Make sure text is clearly readable</li>
              <li>Take photos in good lighting</li>
              <li>Documents must be valid and not expired</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {/* Option 1: eKYC (Disabled) */}
        <Card 
          className={`border-2 ${selectedOption === 1 ? 'border-primary' : 'border-gray-200'} opacity-50 cursor-not-allowed`}
          onClick={() => onOptionSelect(1)}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-gray-200 rounded-full p-3">
              <IdCard className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">eKYC (Aadhaar based)</h3>
              <p className="text-sm text-gray-500">Verify instantly using your Aadhaar and OTP</p>
            </div>
            <div className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
              Disabled
            </div>
          </CardContent>
        </Card>
        
        {/* Option 2: VKYC (Disabled) */}
        <Card 
          className={`border-2 ${selectedOption === 2 ? 'border-primary' : 'border-gray-200'} opacity-50 cursor-not-allowed`}
          onClick={() => onOptionSelect(2)}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-gray-200 rounded-full p-3">
              <Video className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Video KYC</h3>
              <p className="text-sm text-gray-500">Complete verification through a short video call</p>
            </div>
            <div className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
              Disabled
            </div>
          </CardContent>
        </Card>
        
        {/* Option 3: Upload Documents (Enabled) */}
        <Card 
          className={`border-2 ${selectedOption === 3 ? 'border-primary bg-gray-50' : 'border-gray-200'} cursor-pointer transition-all hover:shadow-md`}
          onClick={() => onOptionSelect(3)}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] rounded-full p-3">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Upload Documents</h3>
              <p className="text-sm text-gray-500">Submit your ID and address proof documents</p>
            </div>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
              Available
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DocumentSelectionCard;
