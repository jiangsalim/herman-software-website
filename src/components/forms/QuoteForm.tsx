"use client";

import { useState } from "react";
import { FormInput } from "@/components/forms/FormInput";
import { FormTextarea } from "@/components/forms/FormTextarea";
import { FormSelect } from "@/components/forms/FormSelect";
import { Button } from "@/components/shared/Button";

const STEPS = ["Contact Info", "Project Type", "Project Details"];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string[];
  budget: string;
  timeline: string;
  description: string;
  techPreferences: string;
  source: string;
}

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: [],
    budget: "",
    timeline: "",
    description: "",
    techPreferences: "",
    source: "",
  });

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const json = await res.json();
        setError(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card border border-teal/30 bg-teal/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mb-2">Quote Request Submitted!</h3>
        <p className="text-charcoal">
          We&apos;ll review your requirements and get back to you within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 rounded-md bg-error/10 border border-error/30 p-4 text-body-sm text-error">
          {error}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  i <= step ? "bg-teal text-white" : "bg-gray-light text-gray-medium"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`ml-2 hidden sm:inline text-body-sm ${
                  i <= step ? "font-medium text-teal" : "text-gray-medium"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-4 hidden h-0.5 w-16 sm:block ${
                    i < step ? "bg-teal" : "bg-gray-light"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Contact Info */}
      {step === 0 && (
        <div className="space-y-5">
          <h3 className="text-h3">Your Contact Information</h3>
          <FormInput label="Full Name" name="name" placeholder="Your full name" required value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("name", e.target.value)} />
          <FormInput label="Email Address" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("email", e.target.value)} />
          <FormInput label="Phone Number" name="phone" type="tel" placeholder="+256 XXX XXXXXX" value={formData.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("phone", e.target.value)} />
          <FormInput label="Company / Organization" name="company" placeholder="Your company name" value={formData.company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("company", e.target.value)} />
        </div>
      )}

      {/* Step 2: Project Type */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="text-h3">What Type of Service Do You Need?</h3>
          <p className="text-body-sm text-charcoal">Select all that apply.</p>
          {[
            "Custom Software Development",
            "Web Application",
            "Mobile App",
            "IT Consulting",
            "Enterprise System (ERP/CRM/POS)",
            "Not Sure / Multiple",
          ].map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 rounded-card border border-gray-light p-4 cursor-pointer hover:border-teal transition-colors"
            >
              <input
                type="checkbox"
                value={type.toLowerCase().replace(/\s+/g, "-")}
                checked={formData.projectType.includes(type.toLowerCase().replace(/\s+/g, "-"))}
                onChange={(e) => {
                  const value = e.target.value;
                  const newTypes = e.target.checked
                    ? [...formData.projectType, value]
                    : formData.projectType.filter((t) => t !== value);
                  updateField("projectType", newTypes);
                }}
                className="h-4 w-4 rounded border-gray-medium text-teal focus:ring-teal"
              />
              <span className="text-body font-medium text-navy">{type}</span>
            </label>
          ))}
        </div>
      )}

      {/* Step 3: Project Details */}
      {step === 2 && (
        <div className="space-y-5">
          <h3 className="text-h3">Project Details</h3>
          <FormSelect
            label="Estimated Budget Range"
            name="budget"
            value={formData.budget}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField("budget", e.target.value)}
            options={[
              { value: "", label: "Select..." },
              { value: "under-5k", label: "Under $5,000" },
              { value: "5k-15k", label: "$5,000 – $15,000" },
              { value: "15k-50k", label: "$15,000 – $50,000" },
              { value: "50k-plus", label: "$50,000+" },
              { value: "not-sure", label: "Not Sure Yet" },
            ]}
          />
          <FormSelect
            label="Estimated Timeline"
            name="timeline"
            value={formData.timeline}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField("timeline", e.target.value)}
            options={[
              { value: "", label: "Select..." },
              { value: "1-month", label: "Within 1 Month" },
              { value: "1-3-months", label: "1–3 Months" },
              { value: "3-6-months", label: "3–6 Months" },
              { value: "6-plus-months", label: "6+ Months" },
              { value: "not-sure", label: "Not Sure Yet" },
            ]}
          />
          <FormTextarea
            label="Project Description"
            name="description"
            placeholder="Describe your project, goals, and any specific requirements..."
            required
            rows={6}
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("description", e.target.value)}
          />
          <FormTextarea
            label="Technical Preferences (Optional)"
            name="techPreferences"
            placeholder="Any preferred technologies, platforms, or constraints we should know about?"
            rows={3}
            value={formData.techPreferences}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("techPreferences", e.target.value)}
          />
          <FormSelect
            label="How Did You Hear About Us?"
            name="source"
            value={formData.source}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField("source", e.target.value)}
            options={[
              { value: "", label: "Select..." },
              { value: "google", label: "Google Search" },
              { value: "referral", label: "Referral" },
              { value: "social-media", label: "Social Media" },
              { value: "blog", label: "Blog Article" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={prevStep}>
            ← Back
          </Button>
        ) : (
          <div />
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" variant="primary" onClick={nextStep}>
            Next Step →
          </Button>
        ) : (
          <Button type="submit" variant="primary">
            {loading ? "Submitting..." : "Submit for Review"}
          </Button>
        )}
      </div>
    </form>
  );
}