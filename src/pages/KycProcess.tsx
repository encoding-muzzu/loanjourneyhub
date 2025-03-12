
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  ArrowRight, 
  ShieldCheck, 
  Video, 
  Info, 
  IdCard,
  Camera,
  Check,
  FileText,
  Home,
  RotateCw,
  AlertTriangle
} from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/components/ui/use-toast";

// Define the document upload stages
type DocumentStage = 'selection' | 'id-front' | 'id-back' | 'address-front' | 'address-back' | 'completed';

// Document type labels for better UX
const documentLabels = {
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

  // Calculate progress percentage based on current stage
  const getProgressPercentage = () => {
    switch (documentStage) {
      case 'selection': return 0;
      case 'id-front': return 20;
      case 'id-back': return 40;
      case 'address-front': return 60;
      case 'address-back': return 80;
      case 'completed': return 100;
      default: return 0;
    }
  };

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
        description: `Your ${documentLabels[documentType as keyof typeof documentLabels].title} has been successfully uploaded.`,
        variant: "default",
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

  const handleRetake = () => {
    // Allow user to retake the current document photo
    const currentDocType = documentStage.replace('-', '') as keyof typeof documents;
    setDocuments(prev => ({
      ...prev,
      [currentDocType]: null
    }));
    
    toast({
      title: "Retake Photo",
      description: "Please take a new photo of your document.",
    });
  };

  const handleBack = () => {
    // Go back to previous stage
    switch (documentStage) {
      case 'id-back':
        setDocumentStage('id-front');
        break;
      case 'address-front':
        setDocumentStage('id-back');
        break;
      case 'address-back':
        setDocumentStage('address-front');
        break;
      default:
        setDocumentStage('selection');
    }
  };

  const renderStagesIndicator = () => {
    if (documentStage === 'selection' || documentStage === 'completed') {
      return null;
    }

    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Start</span>
          <span className="text-sm font-medium">Complete</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Step {documentStage === 'id-front' ? 1 : documentStage === 'id-back' ? 2 : documentStage === 'address-front' ? 3 : 4} of 4</span>
          <span>{getProgressPercentage()}% Complete</span>
        </div>
      </div>
    );
  };

  const renderDocumentUploadStage = () => {
    switch (documentStage) {
      case 'id-front':
      case 'id-back':
      case 'address-front':
      case 'address-back': {
        const currentDocType = documentStage as keyof typeof documentLabels;
        const documentInfo = documentLabels[currentDocType];
        const uploadKey = currentDocType.replace('-', '') as keyof typeof documents;

        return (
          <>
            {renderStagesIndicator()}
            <DocumentUploadCard 
              title={documentInfo.title}
              description={documentInfo.description}
              icon={documentInfo.icon}
              onUpload={(e) => handleFileUpload(e, uploadKey)}
              onRetake={handleRetake}
              onBack={handleBack}
              stage={documentStage}
            />
          </>
        );
      }
      case 'completed':
        return (
          <Card className="mb-6 shadow-lg border-2 border-green-100">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <CardTitle className="text-xl flex items-center gap-2 text-green-800">
                <Check className="h-6 w-6 text-green-600" />
                Verification Documents Uploaded
              </CardTitle>
              <CardDescription className="text-green-700">
                Your documents have been successfully submitted
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(documentLabels).map(([key, value]) => (
                    <Card key={key} className="p-4 border border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          {value.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{value.title}</h4>
                          <p className="text-xs text-gray-500">Uploaded</p>
                        </div>
                        <Check className="h-5 w-5 text-green-600 ml-auto" />
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-2">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    What happens next?
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-blue-700 space-y-2">
                    <li>Our team will verify your documents within 24-48 hours</li>
                    <li>You'll receive updates via SMS and email</li>
                    <li>Once verified, we'll process your loan application</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
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
              className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity"
              onClick={handleProceed}
              disabled={!selectedOption}
            >
              Proceed with Document Upload
              <ArrowRight className="ml-1" />
            </Button>
          ) : documentStage === 'completed' ? (
            <Button 
              className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity"
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
  icon: React.ReactNode;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRetake: () => void;
  onBack: () => void;
  stage: DocumentStage;
}

const DocumentUploadCard = ({ 
  title, 
  description, 
  icon,
  onUpload, 
  onRetake,
  onBack,
  stage
}: DocumentUploadCardProps) => {
  return (
    <Card className="shadow-lg mb-4 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white">
        <CardTitle className="text-xl flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="text-white/90">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-500 mb-4">
            Take a clear photo of your {title.toLowerCase()}
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <label className="inline-block">
              <span className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white px-6 py-3 rounded-full cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md">
                <Camera className="h-5 w-5" />
                Take Photo
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onUpload}
                capture="environment"
              />
            </label>
            
            <div className="text-sm text-gray-500">- or -</div>
            
            <label className="inline-block">
              <span className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                <Upload className="h-5 w-5" />
                Upload from Gallery
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onUpload}
              />
            </label>
          </div>
          
          <p className="mt-4 text-xs text-gray-500">
            Supported formats: JPG, PNG, PDF (Max size: 5MB)
          </p>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center justify-center gap-2"
          >
            Back
          </Button>
          <Button 
            variant="outline" 
            onClick={onRetake}
            className="flex items-center justify-center gap-2 text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-700"
          >
            <RotateCw className="h-4 w-4" />
            Retake
          </Button>
        </div>
        
        <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
          <h4 className="text-sm font-medium text-amber-800 flex items-center gap-2 mb-2">
            <Info className="h-5 w-5 text-amber-500" />
            Tips for a good {title.toLowerCase()} photo:
          </h4>
          <ul className="text-xs text-amber-700 list-disc pl-5 space-y-1">
            <li>Ensure all four corners are visible in the frame</li>
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
