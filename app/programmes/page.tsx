import { SectionHeader, Card, Badge, Button } from "@/components/ui";
import { PROGRAMMES } from "@/features/programmes/data";
import { Check, Flame, Calendar, Users } from "lucide-react";

export const metadata = {
  title: "Training Programmes | Unisex Fitness",
  description:
    "Explore our 6 core training disciplines: Strength Training, Bodybuilding, Functional Fitness, HIIT, Personal Coaching, and Weight Management.",
};

export default function ProgrammesPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Curriculum & Disciplines"
          title="ELITE TRAINING PROGRAMMES"
          subtitle="Designed with progressive methodologies, top-tier biomechanics, and zero gimmicks. Find the discipline aligned with your current fitness target."
        />

        {/* Programme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {PROGRAMMES.map((prog) => (
            <Card
              key={prog.id}
              variant="surface"
              className="flex flex-col justify-between group hover:border-white"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <Badge variant="outline-white" size="sm">
                    {prog.intensity} Intensity
                  </Badge>
                  <span className="text-xs text-[#888888] font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {prog.schedule}
                  </span>
                </div>

                <h3 className="font-display text-3xl tracking-wide text-white group-hover:text-[#BDBDBD] transition-colors mb-2">
                  {prog.title}
                </h3>

                <p className="text-xs uppercase tracking-wider text-[#BDBDBD] font-semibold mb-4">
                  {prog.subtitle}
                </p>

                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6">
                  {prog.description}
                </p>

                {/* Focus Pillars */}
                <div className="space-y-2 mb-6 pt-4 border-t border-[#262626]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-white" /> Key Focus
                  </p>
                  <ul className="space-y-1.5">
                    {prog.focus.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-[#BDBDBD] flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#262626]">
                <div className="text-xs text-[#888888] mb-4 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#BDBDBD]" />
                  <span>{prog.targetAudience}</span>
                </div>

                <Button
                  href="/memberships"
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="group-hover:bg-white group-hover:text-black"
                >
                  Join Programme
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-[#121212] border border-[#343434] text-center max-w-4xl mx-auto">
          <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-4">
            NEED GUIDANCE SELECTING YOUR PROGRAMME?
          </h3>
          <p className="text-sm sm:text-base text-[#BDBDBD] max-w-xl mx-auto mb-8">
            Our certified head trainers provide complimentary 15-minute consultations to review your baseline fitness and match you to the ideal curriculum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="md">
              Book Assessment
            </Button>
            <Button href="/memberships" variant="outline" size="md">
              View Membership Rates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
