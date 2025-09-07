import { useGeneratePDFMutation } from "../../hooks/pdf";
import { generatePDF } from "../../services/pdf";
import React from "react";

interface ExportButtonProps {
  name?: string;
}

export function ExportButton({ name }: ExportButtonProps) {
  const generatePDFMutation = useGeneratePDFMutation();

  const handleExport = () => {
    const filename = name?.trim()
      ? `curriculo-${name.trim().toLowerCase().replace(/\s+/g, '-')}.pdf`
      : 'curriculo.pdf';

    const element: HTMLElement | null = document.querySelector('#cv-preview');
    if (element) {
      generatePDF({ element, filename });
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="cursor-pointer bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition"
    >
      Exportar PDF
    </button>
  );
}