import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportResumeToPdf(elementId: string, candidateName: string = 'Resume'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume preview element not found');
  }

  // Create a clone or capture with high device scale
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  // Add subsequent pages if content overflows A4
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }

  const cleanName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
  pdf.save(`${cleanName}_Resume.pdf`);
}
