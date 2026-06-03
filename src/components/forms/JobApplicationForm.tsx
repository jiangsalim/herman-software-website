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
  const [whatsappLink, setWhatsappLink] = useState("");

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
        if (data.whatsappLink) {
          setWhatsappLink(data.whatsappLink);
        }
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
        <p className="text-body-sm text-charcoal mb-6">{message}</p>
        <div className="flex flex-col gap-3">
          <button onClick={onClose} className="rounded-md bg-teal px-6 py-2 text-white hover:bg-teal-dark transition-colors">
            Close
          </button>
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Notify via WhatsApp
            </a>
          )}
        </div>
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