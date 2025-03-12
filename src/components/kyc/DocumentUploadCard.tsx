
import React from "react";
import { Camera, Upload, RotateCw, Info } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// DocumentStage type from the main component
export type DocumentStage = 'selection' | 'id-front' | 'id-back' | 'address-front' | 'address-back' | 'completed';

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

export default DocumentUploadCard;
