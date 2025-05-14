import React, { useEffect, useState } from "react";
import Tiptap from "../components/Tiptap";
import SequentialLoader from "../components/SequentialLoader";
import { useSelector } from "react-redux";
import socket from "../configs/socket";

const DocumentPage = () => {
  const { document } = useSelector((store) => store.document);
  const { user } = useSelector((store) => store.user);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("leave", { docId: document.id, userId: user.id });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, document, user]);

  if (completedSteps.length < 3 || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SequentialLoader
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          error={error}
          setCompletedSteps={setCompletedSteps}
          completedSteps={completedSteps}
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
