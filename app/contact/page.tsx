"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validation/contact";
import { SectionHeader, Input, Textarea, Button, Card } from "@/components/ui";
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [serverStatus, setServerStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "General Membership Enquiry",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerStatus({ type: "idle", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setServerStatus({
          type: "success",
          message: result.message || "Your message has been sent successfully.",
        });
        reset();
      } else {
        setServerStatus({
          type: "error",
          message: result.message || "Failed to submit enquiry. Please review your details.",
        });
      }
    } catch {
      setServerStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Get In Touch"
          title="CONTACT UNISEX FITNESS"
          subtitle="Have questions about our training programmes, membership options, or private facility tours? Speak with our coaching and operations staff."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Contact Details & Operating Hours */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="surface" className="space-y-6">
              <h3 className="font-display text-2xl tracking-wide text-white border-b border-[#343434] pb-4">
                FACILITY DETAILS
              </h3>

              <div className="space-y-4 text-sm text-[#BDBDBD]">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Location</strong>
                    <span>Address details will be published upon grand launch.</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Direct Inquiries</strong>
                    <span className="font-mono text-xs text-white">support@unisexfitness.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Phone</strong>
                    <span>Available during club floor hours</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="surface" className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#343434] pb-4">
                <Clock className="w-5 h-5 text-white" />
                <h3 className="font-display text-2xl tracking-wide text-white">
                  TRAINING HOURS
                </h3>
              </div>

              <div className="space-y-3 text-sm text-[#BDBDBD]">
                <div className="flex justify-between border-b border-[#242424] pb-2">
                  <span>Monday – Friday</span>
                  <span className="text-white font-mono">05:30 – 23:00</span>
                </div>
                <div className="flex justify-between border-b border-[#242424] pb-2">
                  <span>Saturday</span>
                  <span className="text-white font-mono">06:30 – 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday & Bank Holidays</span>
                  <span className="text-white font-mono">08:00 – 18:00</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card variant="highlight" className="p-8 sm:p-10">
              <h3 className="font-display text-3xl tracking-wide text-white mb-2">
                SEND AN ENQUIRY
              </h3>
              <p className="text-sm text-[#BDBDBD] mb-8">
                Fill in your details below and a coach will get back to you promptly.
              </p>

              {serverStatus.type === "success" && (
                <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-600 rounded text-emerald-200 flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>{serverStatus.message}</span>
                </div>
              )}

              {serverStatus.type === "error" && (
                <div className="mb-6 p-4 bg-red-950/60 border border-red-600 rounded text-red-200 flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <span>{serverStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    required
                    placeholder="Alex Mercer"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number (Optional)"
                    type="tel"
                    placeholder="+44 7000 000000"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                  <Input
                    label="Subject"
                    required
                    placeholder="Membership enquiry, personal training, etc."
                    error={errors.subject?.message}
                    {...register("subject")}
                  />
                </div>

                <Textarea
                  label="Your Message"
                  required
                  rows={5}
                  placeholder="Tell us about your fitness goals or questions..."
                  error={errors.message?.message}
                  {...register("message")}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "TRANSMITTING..." : "SUBMIT ENQUIRY"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
