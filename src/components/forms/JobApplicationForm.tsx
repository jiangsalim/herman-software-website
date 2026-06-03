"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface JobApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

export function JobApplicationForm({ jobTitle, onClose }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    linkedin: "",
    portfolio: "",
    source: "",
  });
  const [cv, setCV] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCV(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const form = new FormData();
      form.append("jobTitle", jobTitle);
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("coverLetter", formData.coverLetter);
      form.append("linkedin", formData.linkedin);
      form.append("portfolio", formData.portfolio);
      form.append("source", formData.source);
      if (cv) form.append("cv", cv);

      const res = await fetch("/api/job-application", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Application submitted! We'll review it and get back to you soon.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-card p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="mb-2">Application Submitted!</h3>
          <p className="text-body-sm text-charcoal mb-4">{message}</p>
          <button onClick={onClose} className="rounded-md bg-teal px-6 py-2 text-white hover:bg-teal-dark transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-card p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-h4">Apply for {jobTitle}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-light rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-body-sm font-medium mb-1">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-md border border-gray-light px-3 py-2 text-body-sm focus:border-teal focus:outline-none" />
          </div>

          <div>
            <label className="block text-body-sm font-medium mb-1">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-md border border-gray-light px-3 py-2 text-body-sm focus:border-teal focus:outline-none" />
          </div>

          <div>
            <label className="block text-body-sm font-medium mb-1">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border border-gray-light px-3 py-2 text-body-sm focus:border-teal focus:outline-none" />
          </div>

          <div>
            <label className="block text-body-sm font-medium mb-1">Cover Letter *</label>
            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} required rows={4} placeholder="Tell us why you're a great fit..." className="w-full rounded-md border border-gray-light px-3 py-2 text-body-sm focus:border-teal focus:outline-none resize-none" />
          </div>

          <div>
            <label className="block text-body-sm font-medium mb-1">CV / Resume * (PDF or DOCX)</label>
            <input type="file" accept=".pdf,.docx,.doc" onChange={handleFileChange} required className="w-full text-body-sm" />
          </div>

          <div>
            <label className="block text-body-sm font-medium mb-1">LinkedIn URL</label>
            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full rounded-md border border-gray-light px-3 py-2 text-body-sm focus:border-teal focus:outline-none" />
          </div>

          <div>
            <label className="block text-body-sm font-medium mb-1">Portfolio / GitHub URL</label>
            <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full rounded-md border border-gray-light px-3 py-2 text-body-sm focus:border-teal focus:outline-none" />
          </div>

          <div>
            <label className="block text-body-sm font-medium mb-1">How did you hear about us?</label>
            <select name="source" value={formData.source} onChange={handleChange} className="w-full rounded-md border border-gray-light px-3 py-2 text-body-sm focus:border-teal focus:outline-none">
              <option value="">Select...</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter/X</option>
              <option value="Referral">Referral</option>
              <option value="Google">Google Search</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {status === "error" && <p className="text-sm text-red-500">{message}</p>}

          <button type="submit" disabled={status === "loading"} className="w-full rounded-md bg-teal py-3 text-white font-medium hover:bg-teal-dark transition-colors disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}