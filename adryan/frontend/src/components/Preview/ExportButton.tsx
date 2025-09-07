import { generatePDF } from '../../services/pdfService';

interface ExportButtonProps {
  name?: string;
}

function ExportButton({ name }: ExportButtonProps) {
  const handleExport = () => {
    const filename = name?.trim()
      ? `curriculo-${name.trim().toLowerCase().replace(/\s+/g, '-')}.pdf`
      : 'curriculo.pdf';

    generatePDF('cv-preview', filename);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Exportar PDF
    </button>
  );
}

export default ExportButton;

