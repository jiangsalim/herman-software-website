import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Case Study";
  const sector = searchParams.get("sector") || "";
  const challenge = searchParams.get("challenge") || "";
  const solution = searchParams.get("solution") || "";
  const result = searchParams.get("result") || "";
  const technologies = searchParams.get("technologies") || "";

  // Generate a simple text-based PDF (we'll enhance this with jspdf in the client)
  const content = `
HERMAN Software Solutions — Case Study
=======================================

Project: ${title}
Sector: ${sector}

THE CHALLENGE
-------------
${challenge}

OUR SOLUTION
------------
${solution}

THE RESULT
----------
${result}

TECHNOLOGIES USED
-----------------
${technologies}

--------------------------------------------------
HERMAN Software Solutions Limited
Haji Tarmchi, Jinja, Uganda
infohermansoftware@gmail.com | +256772723188
herman-software-website.vercel.app
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${title.toLowerCase().replace(/\s+/g, "-")}-case-study.txt"`,
    },
  });
}