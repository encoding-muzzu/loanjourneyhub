
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showProgress?: boolean;
}

export function Layout({ children, className, showProgress = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {showProgress && <ProgressBar />}
        <main className={cn("max-w-4xl mx-auto", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
