
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Upload, 
  ArrowRight, 
  ShieldCheck, 
  Video, 
  Info, 
  IdCard,
  Camera,
  Check
} from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/components/ui/use-toast";

// Define the document upload stages
type DocumentStage = 'selection' | 'id-front' | 'id-back' | 'address-front' | 'address-back' | 'completed';

const KycProcess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentStep } = useProgress();
  const [selectedOption, setSelectedOption] = useState<number | null>(3); // Default to option 3 (Upload documents)
  const [documentStage, setDocumentStage] = useState<DocumentStage>('selection');
  
  // Track uploaded documents
  const [documents, setDocuments] = useState({
    idFront: null,
    idBack: null,
    addressFront: null,
    addressBack: null
  });

  const handleOptionSelect = (optionNumber: number) => {
    if (optionNumber === 3) {
      setSelectedOption(optionNumber);
    } else {
      // Show toast for disabled options
      toast({
        title: "Option Unavailable",
        description: "This verification method is currently disabled. Please use document upload."
      });
    }
  };

  const handleProceed = () => {
    if (selectedOption === 3) {
      setDocumentStage('id-front');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: keyof typeof documents) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // In a real app, you would upload the file to a server here
      setDocuments(prev => ({
        ...prev,
        [documentType]: file
      }));
      
      // Show success toast
      toast({
        title: "Document Uploaded",
        description: "Your document has been successfully uploaded.",
      });
      
      // Move to next stage based on current stage
      switch (documentType) {
        case 'idFront':
          setDocumentStage('id-back');
          break;
        case 'idBack':
          setDocumentStage('address-front');
          break;
        case 'addressFront':
          setDocumentStage('address-back');
          break;
        case 'addressBack':
          setDocumentStage('completed');
          break;
      }
    }
  };

  const renderDocumentUploadStage = () => {
    switch (documentStage) {
      case 'id-front':
        return (
          <DocumentUploadCard 
            title="Upload ID Proof (Front)" 
            description="Please upload the front side of your government-issued ID card." 
            onUpload={(e) => handleFileUpload(e, 'idFront')}
          />
        );
      case 'id-back':
        return (
          <DocumentUploadCard 
            title="Upload ID Proof (Back)" 
            description="Now, please upload the back side of your government-issued ID card." 
            onUpload={(e) => handleFileUpload(e, 'idBack')}
          />
        );
      case 'address-front':
        return (
          <DocumentUploadCard 
            title="Upload Address Proof (Front)" 
            description="Please upload the front side of your address proof document (utility bill, bank statement, etc.)" 
            onUpload={(e) => handleFileUpload(e, 'addressFront')}
          />
        );
      case 'address-back':
        return (
          <DocumentUploadCard 
            title="Upload Address Proof (Back)" 
            description="If applicable, please upload the back side of your address proof document." 
            onUpload={(e) => handleFileUpload(e, 'addressBack')}
          />
        );
      case 'completed':
        return (
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                Documents Uploaded Successfully
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Thank you! All required documents have been successfully uploaded. 
                Our team will verify your documents and update you on the next steps.
              </p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">What happens next?</h4>
                <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
                  <li>Our team will verify your documents within 24-48 hours</li>
                  <li>You'll receive updates via SMS and email</li>
                  <li>Once verified, we'll process your loan application</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <>
            <Card className="mb-6 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#ff416c]" />
                  KYC Process Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Complete your Know Your Customer (KYC) verification to proceed with your loan application. 
                  This is a mandatory regulatory requirement to verify your identity.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Choose a verification method below:</h4>
                  <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                    <li>eKYC is the fastest method using Aadhaar OTP (currently unavailable)</li>
                    <li>Video KYC allows you to verify through a short video call (currently unavailable)</li>
                    <li>Document upload requires you to submit copies of your ID and address proof</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {/* Option 1: eKYC (Disabled) */}
              <Card 
                className={`border-2 ${selectedOption === 1 ? 'border-primary' : 'border-gray-200'} opacity-50 cursor-not-allowed`}
                onClick={() => handleOptionSelect(1)}
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
                onClick={() => handleOptionSelect(2)}
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
                onClick={() => handleOptionSelect(3)}
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white shadow-md p-4 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold text-center flex items-center gap-2">
          <ShieldCheck className="text-[#ff416c] h-6 w-6" />
          KYC Verification
        </h2>
      </motion.div>
      
      {/* Scrollable Content Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col items-center px-4 py-6 overflow-hidden">
        <ScrollArea className="w-full h-[calc(100vh-200px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-4"
          >
            {renderDocumentUploadStage()}
          </motion.div>
        </ScrollArea>
      </div>
      
      {/* Fixed Action Button at Bottom */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        <div className="max-w-md mx-auto">
          {documentStage === 'selection' ? (
            <Button 
              className="gradient-button w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl"
              onClick={handleProceed}
              disabled={!selectedOption}
            >
              Proceed with Document Upload
              <ArrowRight className="ml-1" />
            </Button>
          ) : documentStage === 'completed' ? (
            <Button 
              className="gradient-button w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl"
              onClick={() => navigate("/")}
            >
              Back to Homepage
              <ArrowRight className="ml-1" />
            </Button>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

// Document Upload Card Component
interface DocumentUploadCardProps {
  title: string;
  description: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentUploadCard = ({ title, description, onUpload }: DocumentUploadCardProps) => {
  return (
    <Card className="shadow-lg mb-4">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Camera className="h-5 w-5 text-[#ff416c]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{description}</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-500 mb-2">Drag and drop your document here, or</p>
          
          <label className="inline-block">
            <span className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white px-4 py-2 rounded cursor-pointer hover:opacity-90 transition-opacity">
              Choose File
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onUpload}
              capture="environment"
            />
          </label>
          
          <p className="mt-3 text-xs text-gray-500">
            Supported formats: JPG, PNG, PDF (Max size: 5MB)
          </p>
        </div>
        
        <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-100">
          <h4 className="text-sm font-medium text-amber-800 flex items-center gap-1">
            <Info className="h-4 w-4" />
            Tips for a good document photo:
          </h4>
          <ul className="text-xs text-amber-700 mt-1 list-disc pl-5 space-y-1">
            <li>Ensure the document is fully visible and centered</li>
            <li>Make sure all text is clearly legible</li>
            <li>Avoid glare or shadows on the document</li>
            <li>Take the photo in good lighting conditions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycProcess;
