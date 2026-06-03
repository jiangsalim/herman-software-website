"use client";

interface DownloadPDFProps {
  title: string;
  sector: string;
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
  className?: string;
}

export function DownloadPDF({ title, sector, challenge, solution, result, technologies, className = "" }: DownloadPDFProps) {
  const handleDownload = async () => {
    const { jsPDF } = await import("jspdf");
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 30;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(10, 31, 63); // Navy
    doc.setFont("helvetica", "bold");
    doc.text("HERMAN Software Solutions", margin, y);
    
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 194, 186); // Teal
    doc.setFont("helvetica", "normal");
    doc.text("Case Study", margin, y);

    // Line
    y += 8;
    doc.setDrawColor(0, 194, 186);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);

    // Project Title
    y += 15;
    doc.setFontSize(18);
    doc.setTextColor(10, 31, 63);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, y);

    // Sector
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    doc.setFont("helvetica", "normal");
    doc.text(`Sector: ${sector}`, margin, y);

    // Challenge
    y += 15;
    doc.setFontSize(13);
    doc.setTextColor(10, 31, 63);
    doc.setFont("helvetica", "bold");
    doc.text("THE CHALLENGE", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    const challengeLines = doc.splitTextToSize(challenge, pageWidth - margin * 2);
    doc.text(challengeLines, margin, y);
    y += challengeLines.length * 6 + 10;

    // Solution
    doc.setFontSize(13);
    doc.setTextColor(10, 31, 63);
    doc.setFont("helvetica", "bold");
    doc.text("OUR SOLUTION", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    const solutionLines = doc.splitTextToSize(solution, pageWidth - margin * 2);
    doc.text(solutionLines, margin, y);
    y += solutionLines.length * 6 + 10;

    // Result
    doc.setFontSize(13);
    doc.setTextColor(10, 31, 63);
    doc.setFont("helvetica", "bold");
    doc.text("THE RESULT", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    const resultLines = doc.splitTextToSize(result, pageWidth - margin * 2);
    doc.text(resultLines, margin, y);
    y += resultLines.length * 6 + 10;

    // Technologies
    doc.setFontSize(13);
    doc.setTextColor(10, 31, 63);
    doc.setFont("helvetica", "bold");
    doc.text("TECHNOLOGIES", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(technologies.join(", "), margin, y);

    // Footer
    y = doc.internal.pageSize.getHeight() - 25;
    doc.setDrawColor(0, 194, 186);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text("HERMAN Software Solutions Limited | Haji Tarmchi, Jinja, Uganda", margin, y);
    y += 5;
    doc.text("infohermansoftware@gmail.com | +256772723188 | herman-software-website.vercel.app", margin, y);

    doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}-case-study.pdf`);
  };

  return (
    <button onClick={handleDownload} className={`inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-body-sm text-white hover:bg-white/10 transition-colors ${className}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download Case Study (PDF)
    </button>
  );
}