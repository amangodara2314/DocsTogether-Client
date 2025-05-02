import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyEmail } from "../../services/authServices";
import Cookies from "js-cookie";
export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing or invalid.");
      return;
    }

    const verifyUserEmail = async () => {
      verifyEmail(token)
        .then((res) => {
          Cookies.set("auth-token", res.data.token);
          setStatus("success");
          setMessage(
            "Your email has been successfully verified! Redirecting..."
          );
          toast.success("Email verified", {
            description: "Your account is now active. Welcome aboard!",
          });

          setTimeout(() => navigate("/", { replace: true }), 3000);
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          setMessage(
            err.response.data.message ||
              "We couldn't verify your email. The link may have expired or is invalid."
          );
        });
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-block p-2 bg-white rounded-full shadow-sm mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Email Verification
          </h1>
          <p className="text-slate-500 mt-2">
            We're confirming your email address
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {status === "loading" && (
              <div className="py-8">
                <div className="flex justify-center mb-6">
                  <motion.div
                    className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-slate-900">
                    Verifying your email
                  </h3>
                  <p className="text-slate-500 mt-1">
                    This will only take a moment...
                  </p>
                </div>
              </div>
            )}

            {status === "success" && (
              <motion.div
                className="py-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-slate-900">
                  Verification Complete!
                </h3>
                <p className="text-slate-500 mt-1 mb-6">{message}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <span>Redirecting to dashboard</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                className="py-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center">
                    <XCircle className="h-10 w-10 text-red-500" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-slate-900">
                  Verification Failed
                </h3>
                <p className="text-slate-500 mt-1 mb-6">{message}</p>
                <Button
                  onClick={() => navigate("/auth/login", { replace: true })}
                  className="mt-2"
                >
                  Return to Login
                </Button>
              </motion.div>
            )}
          </div>

          <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        </div>
      </div>
    </div>
  );
}
