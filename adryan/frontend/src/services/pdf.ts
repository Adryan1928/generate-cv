import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GeneratePDFOptions {
  filename: string;
  element: HTMLElement;
}

export async function generatePDF({element, filename}: GeneratePDFOptions) {

  const canvas = await html2canvas(element, {
    scale: 2,
  });

  const image = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  console.log(pdf)

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  const marginX = (pageWidth - imgWidth * ratio) / 2;
  const marginY = (pageHeight - imgHeight * ratio) / 2;

  pdf.addImage(image, 'PNG', marginX, marginY, imgWidth * ratio, imgHeight * ratio);

  
  pdf.save(filename);

  return pdf;
}

