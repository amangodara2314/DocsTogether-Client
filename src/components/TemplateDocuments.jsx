import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { templates } from "../lib/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createDocument } from "../services/documentService";

export default function DocumentTemplates() {
  const navigate = useNavigate();
  const handleTemplateClick = (template) => {
    createDocument({ title: template.name, content: template.content })
      .then((res) => {
        navigate(`/document?token=${res.data.docToken}`);
        toast.success("Document created successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Something went wrong");
      });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-foreground">
          Start a new document
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {templates.map((template) => (
          <Card
            onClick={() => handleTemplateClick(template)}
            key={template.id}
            className="overflow-hidden border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer group rounded-none pb-0 pt-0"
          >
            <CardContent className="p-0 relative">
              {template.id === 1 ? (
                <div className="h-40 flex items-center justify-center bg-card border-b border-border">
                  <Plus className="h-10 w-10 text-primary" />
                </div>
              ) : (
                <div
                  className={`h-40 ${template.color} border-b border-border relative`}
                >
                  {template.image && (
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt="Template preview"
                      width={200}
                      height={160}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
              <div className="p-2 text-center">
                <p className="text-sm font-medium text-foreground">
                  {template.name}
                </p>
                {template.type !== "blank" && (
                  <p className="text-xs text-muted-foreground">
                    {template.type}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
