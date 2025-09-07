import { useReactToPrint } from "react-to-print";
import React from "react";

interface ExportButtonProps {
  name?: string;
  cvRef: React.RefObject<HTMLElement | null>;
}

export function ExportButton({ name, cvRef }: ExportButtonProps) {

  const handleExport = useReactToPrint({
    contentRef: cvRef,
    documentTitle: name?.trim() ?? "cv",
  });

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