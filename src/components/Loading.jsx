import { FlipText } from "@/components/magicui/flip-text";
export default function Loading() {
  return (
    <div className="flex items-center justify-center bg-card min-h-screen w-full">
      <FlipText repeat className="text-primary text-5xl">
        SMILE
      </FlipText>
    </div>
  );
}
