import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSelector } from "react-redux";
import DocumentDropdown from "./DocumentDropdown";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function DocumentCard({ view, documents }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleRedirect = (doc) => {
    const getUrl = fetch(
      import.meta.env.VITE_BASE_URL + "/document/link/" + doc.id,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth-token")}`,
        },
      }
    );
    toast.promise(getUrl, {
      loading: "Redirecting please wait...",
      success: async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          navigate(data.link);
          return "Document loaded successfully";
        }
        throw new Error(data?.message || "Error loading document");
      },
      error: (err) => {
        return "Something went wrong";
      },
    });
  };
  if (documents?.length === 0) {
    return (
      <div className="flex items-center justify-center h-full mt-16">
        <p className="text-muted-foreground">No documents found</p>
      </div>
    );
  }
  return view === "grid" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {documents?.map((doc) => (
        <Card
          key={doc.id}
          className="overflow-hidden border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer group py-0 relative"
        >
          <DocumentDropdown
            handleRedirect={handleRedirect}
            doc={doc}
            className={"absolute top-2 right-2 cursor-pointer"}
          />
          <CardContent className="p-0">
            <div className="h-40 bg-card border-b border-border flex items-center justify-center">
              <FileText className="h-16 w-16 text-muted" />
            </div>
            <div className="p-3 w-full">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={doc?.owner?.avatar || ""} />
                  <AvatarFallback className="bg-purple-700 text-white">
                    {doc?.owner?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {doc.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {doc?.owner?.name}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Created at {new Date(doc.createdAt).toDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {documents?.map((doc, index) => (
        <div
          key={doc.id}
          onClick={() => handleRedirect(doc)}
          className={`flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer ${
            index !== documents.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div className="w-full truncate">
              <p className="font-medium text-foreground">{doc.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Created at {new Date(doc.createdAt).toDateString()}</span>
                <span>•</span>
                <span>
                  Owned by{" "}
                  {user?.id == doc?.owner?.id ? "me" : doc?.owner?.name}
                </span>
              </div>
            </div>
          </div>
          <DocumentDropdown handleRedirect={handleRedirect} doc={doc} />
        </div>
      ))}
    </div>
  );
}
