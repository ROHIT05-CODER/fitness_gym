import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Card, Badge } from "@/components/ui";
import { Users, Shield, Calendar } from "lucide-react";

interface MemberPass {
  status: string;
  expires_at: string;
  membership_plans?: { name?: string } | null;
}

interface MemberDirectoryItem {
  id: string;
  display_name: string | null;
  phone: string | null;
  created_at: string;
  memberships?: MemberPass[];
}

export default async function AdminMembersPage() {
  const isConfigured = isSupabaseConfigured();

  let members: MemberDirectoryItem[] = [];

  if (isConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*, memberships(status, expires_at, membership_plans(name))")
      .order("created_at", { ascending: false })
      .limit(50);
    members = data || [];
  } else {
    // Development preview fallback
    members = [
      {
        id: "usr-4921-preview",
        display_name: "Jordan Steele",
        phone: "+44 7900 123456",
        created_at: "2026-10-15T11:20:00Z",
        memberships: [
          {
            status: "active",
            expires_at: "2026-11-15T11:20:00Z",
            membership_plans: { name: "Pro Quarterly" },
          },
        ],
      },
      {
        id: "usr-4922-preview",
        display_name: "Elena Rostova",
        phone: "+44 7900 654321",
        created_at: "2026-10-12T09:15:00Z",
        memberships: [
          {
            status: "active",
            expires_at: "2027-10-12T09:15:00Z",
            membership_plans: { name: "Elite Annual" },
          },
        ],
      },
      {
        id: "usr-4923-preview",
        display_name: "Alex Mercer",
        phone: null,
        created_at: "2026-10-08T18:00:00Z",
        memberships: [],
      },
    ];
  }

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline-white" size="sm">
            ATHLETE DIRECTORY
          </Badge>
          {!isConfigured && (
            <span className="text-[11px] text-amber-400 font-mono">
              [Preview Mode]
            </span>
          )}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
          REGISTERED MEMBERS ({members.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
          Least-privilege operational lookup. Sensitive health or biometric data is deliberately excluded.
        </p>
      </div>

      {/* Members Table */}
      <Card variant="surface" className="p-0 overflow-hidden">
        <div className="p-6 border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-white" />
            <h2 className="font-display text-2xl text-white tracking-wide">
              MEMBER ROSTER
            </h2>
          </div>
          <span className="text-xs text-[#888888] font-mono">
            Encrypted Database Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181818] border-b border-[#282828] text-[#888888] uppercase tracking-wider font-mono text-[11px]">
              <tr>
                <th className="p-4">Member Name & ID</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Current Pass</th>
                <th className="p-4">Member Since</th>
                <th className="p-4 text-center">Pass Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {members.map((member) => {
                const activePass = member.memberships?.find(
                  (m) => m.status === "active"
                );

                return (
                  <tr key={member.id} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-white text-sm block">
                        {member.display_name || "Anonymous Member"}
                      </span>
                      <span className="text-[11px] font-mono text-[#707070]">
                        {member.id.slice(0, 16)}...
                      </span>
                    </td>
                    <td className="p-4 text-[#BDBDBD] font-mono">
                      {member.phone || "—"}
                    </td>
                    <td className="p-4 text-white">
                      {activePass
                        ? activePass.membership_plans?.name || "Active Membership"
                        : "No Active Pass"}
                    </td>
                    <td className="p-4 text-[#888888] font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(member.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Badge
                        variant={activePass ? "success" : "neutral"}
                        size="sm"
                      >
                        {activePass ? "ACTIVE" : "INACTIVE"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="p-4 bg-[#141414] border border-[#2B2B2B] text-xs text-[#888888] flex items-center gap-3">
        <Shield className="w-4 h-4 text-white shrink-0" />
        <span>
          Compliance Notice: Members have the right to request account data export or removal under applicable privacy statutes.
        </span>
      </div>
    </div>
  );
}
