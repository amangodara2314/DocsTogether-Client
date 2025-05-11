import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const DocumentSkeleton = ({ view = "grid" }) => {
  const skeletonArray = Array(5).fill(0);

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skeletonArray.map((_, i) => (
          <Card key={i} className="overflow-hidden border border-border py-0">
            <CardContent className="p-0">
              <div className="h-40 bg-muted border-b border-border flex items-center justify-center">
                <Skeleton className="h-16 w-16 rounded-md" />
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {skeletonArray.map((_, i) => (
        <div
          key={i}
          className={`flex items-center justify-between p-3 ${
            i !== skeletonArray.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default DocumentSkeleton;
