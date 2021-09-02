import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { createRequire } from 'module';

createDoc();

async function createDoc() {
  const require = createRequire(import.meta.url);
  const fs = require('fs');
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('./pdf_output/createDoc.pdf', pdfBytes);
}