"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Grid, List, MoreVertical, Folder } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RecentDocuments({ view, setView, sortBy, setSortBy }) {
  const documents = [
    { id: 1, title: "Untitled document", date: "Apr 26, 2025", icon: "doc" },
    { id: 2, title: "Untitled document", date: "Apr 24, 2025", icon: "doc" },
    { id: 3, title: "Untitled document", date: "Apr 20, 2025", icon: "doc" },
    { id: 4, title: "Untitled document", date: "Apr 18, 2025", icon: "doc" },
    { id: 5, title: "API Errors", date: "Apr 15, 2025", icon: "doc" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-foreground">
          Recent documents
        </h2>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-input bg-card text-foreground">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Last opened by me</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="modified">Last modified</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border border-input rounded-md overflow-hidden">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none border-r border-input text-muted-foreground"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none text-muted-foreground"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className="overflow-hidden border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer group"
            >
              <CardContent className="p-0">
                <div className="h-40 bg-card border-b border-border flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted" />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium text-foreground truncate">
                        {doc.title}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Make a copy</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {doc.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          {documents.map((doc, index) => (
            <div
              key={doc.id}
              className={`flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer ${
                index !== documents.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{doc.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Opened {doc.date}</span>
                    <span>•</span>
                    <span>Owned by me</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
