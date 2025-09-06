import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function generatePDF(elementId: string, filename: string) {
  const input = document.getElementById(elementId);
  if (!input) throw new Error("Elemento não encontrado");

  html2canvas(input, { scale: 2 } as any).then((canvas) => {
    const image = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const marginX = (pageWidth - imgWidth * ratio) / 2;
    const marginY = (pageHeight - imgHeight * ratio) / 2;

    pdf.addImage(image, 'PNG', marginX, marginY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(filename);
  });
}

