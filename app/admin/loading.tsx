import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="font-display text-xl tracking-wider text-[#BDBDBD]">
          VERIFYING PRIVILEGED WORKSPACE...
        </span>
      </div>
    </div>
  );
}
