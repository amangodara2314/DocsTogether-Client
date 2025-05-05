"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreVertical, Plus } from "lucide-react";

export default function DocumentTemplates() {
  const templates = [
    {
      id: 1,
      name: "Blank document",
      type: "blank",
      color: "bg-card",
      icon: "plus",
    },
    {
      id: 2,
      name: "Resume",
      type: "Serif",
      color: "bg-muted",
      image: "/placeholder.svg?height=160&width=120",
    },
    {
      id: 3,
      name: "Resume",
      type: "Coral",
      color: "bg-rose-100 dark:bg-rose-950/30",
      image: "/placeholder.svg?height=160&width=120",
    },
    {
      id: 4,
      name: "Letter",
      type: "Spearmint",
      color: "bg-emerald-100 dark:bg-emerald-950/30",
      image: "/placeholder.svg?height=160&width=120",
    },
    {
      id: 5,
      name: "Project proposal",
      type: "Tropic",
      color: "bg-cyan-100 dark:bg-cyan-950/30",
      image: "/placeholder.svg?height=160&width=120",
    },
    {
      id: 6,
      name: "Brochure",
      type: "Geometric",
      color: "bg-violet-100 dark:bg-violet-950/30",
      image: "/placeholder.svg?height=160&width=120",
    },
    {
      id: 7,
      name: "Report",
      type: "Luxe",
      color: "bg-amber-100 dark:bg-amber-950/30",
      image: "/placeholder.svg?height=160&width=120",
    },
  ];

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
