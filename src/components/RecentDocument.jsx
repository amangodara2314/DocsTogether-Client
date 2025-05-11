import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getDocuments } from "../services/documentService";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import DocumentSkeleton from "./DocumentLoader";
import { setDocument } from "../features/document/documentSlice";
import DocumentCard from "./DocumentCard";

export function RecentDocuments({}) {
  const { documents } = useSelector((store) => store.document);
  const dispatch = useDispatch();
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("mine");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getDocuments(`page=${page}&sortBy=${sortBy}`)
      .then((res) => {
        dispatch(setDocument({ documents: res.data.documents }));
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error fetching documents");
      });
  }, [view, sortBy]);

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
              <SelectItem value="mine">Created by me</SelectItem>
              <SelectItem value="shared">Shared with me</SelectItem>
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

      {!documents ? (
        <DocumentSkeleton view={view} />
      ) : (
        <DocumentCard view={view} documents={documents} />
      )}
    </div>
  );
}
