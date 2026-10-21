export interface Programme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string[];
  schedule: string;
  intensity: "High" | "Maximum" | "Moderate to High" | "Tailored";
  targetAudience: string;
}

export const PROGRAMMES: Programme[] = [
  {
    id: "strength-training",
    title: "STRENGTH TRAINING",
    subtitle: "Absolute power & progressive barbell overload",
    description:
      "Engineered for raw power, bone density, and structural fortitude. Master the foundational compound lifts—squat, bench press, deadlift, and overhead press—under structured micro-cycles.",
    focus: ["Compound Barbell Mechanics", "Progressive Overload Tracking", "Central Nervous System Conditioning"],
    schedule: "Daily Sessions: Morning & Evening",
    intensity: "Maximum",
    targetAudience: "All lifters seeking measurable power and foundational strength.",
  },
  {
    id: "bodybuilding",
    title: "BODYBUILDING & HYPERTROPHY",
    subtitle: "Precision hypertrophy & muscular symmetry",
    description:
      "Sculpt every muscle group with intentional mechanical tension, high time-under-tension, and volume periodization. Isolate and develop full aesthetic symmetry with elite resistance gear.",
    focus: ["Hypertrophy Rep Ranges", "Targeted Isolation Angles", "Mind-Muscle Engagement"],
    schedule: "Splits: Push / Pull / Legs",
    intensity: "High",
    targetAudience: "Athletes dedicated to physique development and muscle definition.",
  },
  {
    id: "functional-fitness",
    title: "FUNCTIONAL FITNESS",
    subtitle: "Real-world athletic capacity & movement mastery",
    description:
      "Break out of rigid planes of motion. Combine kettlebell flows, gymnastics ring work, plyometrics, and sled pushes to develop an agile, resilient, and bulletproof body.",
    focus: ["Multi-Planar Movement", "Grip & Core Torque", "Cardiovascular Endurance"],
    schedule: "Rotating Daily WODs",
    intensity: "High",
    targetAudience: "Anyone aiming for versatile athleticism, agility, and joint longevity.",
  },
  {
    id: "hiit",
    title: "HIGH-INTENSITY INTERVAL TRAINING",
    subtitle: "Metabolic conditioning & rapid endurance burn",
    description:
      "Short, explosive work intervals paired with calculated rest. Maximize VO2 max, accelerate calorie expenditure, and build relentless stamina with rowers, assault bikes, and battle ropes.",
    focus: ["Anaerobic Threshold", "Rapid Lactate Clearance", "Post-Exercise Oxygen Consumption"],
    schedule: "45-min High-Energy Classes",
    intensity: "Maximum",
    targetAudience: "Time-efficient conditioning for conditioning and calorie burning.",
  },
  {
    id: "personal-training",
    title: "1-ON-1 COACHING",
    subtitle: "Custom biometric programming & undivided attention",
    description:
      "Work privately with certified strength coaches. Complete biomechanical movement screening, custom session architecture, form analysis, and weekly accountability.",
    focus: ["Bespoke Biomechanics", "Injury Prevention Protocols", "Targeted Milestone Reviews"],
    schedule: "By Private Appointment",
    intensity: "Tailored",
    targetAudience: "Members desiring direct mentorship and expedited progression.",
  },
  {
    id: "weight-management",
    title: "WEIGHT MANAGEMENT & CONDITIONING",
    subtitle: "Sustainable body recomposition & metabolic health",
    description:
      "A structured synergy of progressive resistance, steady-state cardio, and lifestyle habits engineered for sustainable body fat reduction and lean mass preservation.",
    focus: ["Body Recomposition", "Metabolic Conditioning", "Habit & Consistency Systems"],
    schedule: "Full Weekly Guided Progression",
    intensity: "Moderate to High",
    targetAudience: "Individuals working towards healthy, lasting body transformation.",
  },
];
