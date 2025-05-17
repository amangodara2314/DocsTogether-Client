import { useState, useEffect } from "react";
import { Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUser } from "../services/authServices";
import { accessDocument } from "../services/documentService";
import { setDocument, setDocuments } from "../features/document/documentSlice";
import { set } from "react-hook-form";
import socket from "../configs/socket";

export default function SequentialLoader({
  onComplete,
  className,
  currentStep,
  setCurrentStep,
  completedSteps,
  setCompletedSteps,
  error,
  setError,
}) {
  const { user } = useSelector((store) => store.user);
  const { document, role } = useSelector((store) => store.document);
  const [progress, setProgress] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const steps = [
    {
      id: 1,
      title: "Authentication",
      description: "Verifying your credentials",
    },
    {
      id: 2,
      title: "Document Setup",
      description: "Loading your document data",
    },
    {
      id: 3,
      title: "Content",
      description: "Getting your personalized content",
    },
  ];

  const fetchUserData = async () => {
    setCurrentStep(0);
    setProgress(0);
    if (user || !Cookies.get("auth-token")) {
      setCompletedSteps((prev) => [...prev, 0]);
      setProgress(25);
    } else {
      const response = await getUser();
      if (response.status == 200) {
        dispatch(
          setUser({
            user: response.data.user,
            token: Cookies.get("auth-token"),
          })
        );
        setCompletedSteps((prev) => [...prev, 0]);
        setProgress(33);
      } else {
        navigate("/auth/login");
        throw new Error("Failed to authenticate. Please log in.");
      }
    }
  };

  const joinDocument = async () => {
    console.log(document);
    setCurrentStep(2);
    if (!document) {
      console.log("Document not found");
      setError("Document not found");
      return;
    }
    socket.emit("join", {
      docId: document.id,
      userId: user.id || null,
      name: user.name || null,
      avatar: user.avatar || null,
      role: role || "VIEWER",
    });
  };

  const getDocument = async () => {
    setCurrentStep(1);
    const token = searchParams.get("token");
    try {
      const res = await accessDocument(token);
      if (res.status === 200) {
        dispatch(
          setDocument({
            document: res.data.document,
            role: res.data.role,
            leftMargin: res.data.document.leftMargin,
            rightMargin: res.data.document.rightMargin,
            content: res.data.document.content,
          })
        );
        setCompletedSteps((prev) => [...prev, 1]);
        setProgress(66);
      } else {
        throw new Error(res.data.message || "Error fetching document");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Error fetching document");
      throw error?.response?.data?.message || "Error fetching document";
    }
  };

  useEffect(() => {
    const processApiCalls = async () => {
      try {
        await fetchUserData();
        await getDocument();
      } catch (err) {
        setError(err || "An error occurred.");
      }
    };

    processApiCalls();
  }, [onComplete]);

  useEffect(() => {
    if (document?.id && user?.id) {
      joinDocument();
    }
  }, [document, user]);

  useEffect(() => {
    socket.on("presence:update", (data) => {
      console.log("Presence update", data);
      setProgress(100);
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, 2]);
      }, 1000);
    });

    return () => {
      socket.off("presence:update");
    };
  }, []);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-foreground">
          Getting things ready...
        </h2>

        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-3 py-3 px-4 rounded-md transition-all duration-300",
                currentStep === index ? "bg-muted" : "bg-transparent"
              )}
            >
              <div className="mt-0.5">
                {error && currentStep === index ? (
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="h-3 w-3 text-red-500" />
                  </div>
                ) : completedSteps.includes(index) ? (
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                ) : currentStep === index ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-muted-foreground/30" />
                )}
              </div>

              <div>
                <h3
                  className={cn(
                    "text-sm font-medium",
                    error && currentStep === index
                      ? "text-red-500"
                      : currentStep === index
                      ? "text-primary"
                      : completedSteps.includes(index)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-sm text-red-500 font-medium">
            {error}. Please try again.
          </div>
        )}

        {progress != 100 && completedSteps.length == 2 && !error && (
          <div className="text-sm text-primary font-medium">
            Almost there...Please wait a moment.
          </div>
        )}

        {progress == 100 && !error && (
          <div className="text-sm text-primary font-medium">
            You are all set! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
}
