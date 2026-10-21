import { Loader2 } from "lucide-react";

export default function MemberLoading() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <span className="font-display text-xl tracking-wider text-[#BDBDBD]">
          AUTHENTICATING WORKSPACE...
        </span>
      </div>
    </div>
  );
}
