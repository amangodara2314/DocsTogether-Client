import React, { useState } from "react";
import Tiptap from "../components/Tiptap";
import SequentialLoader from "../components/SequentialLoader";

const DocumentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (isLoading || currentStep < 4) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SequentialLoader
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          setError={setError}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Tiptap />
    </div>
  );
};

export default DocumentPage;
