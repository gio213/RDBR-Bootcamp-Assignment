import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner variant="primary" size="xl" />
    </div>
  );
}
