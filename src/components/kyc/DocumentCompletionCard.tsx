
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { documentLabels, getDocumentIcon } from "@/constants/kycDocuments";

const DocumentCompletionCard = () => {
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
                    {getDocumentIcon(value.iconType)}
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
};

export default DocumentCompletionCard;
