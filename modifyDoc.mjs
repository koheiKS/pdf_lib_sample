import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { createRequire } from 'module';

modifyDoc();

async function modifyDoc() {
  const require = createRequire(import.meta.url);
  const fs = require('fs');
  const uint8Array = fs.readFileSync('./pdf_input/sample_2.pdf');
  const pdfDoc = await PDFDocument.load(uint8Array);

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText('This text was added with JavaScript!', {
    x: 5,
    y: height / 2 + 300,
    size: 45,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  })

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('./pdf_output/modifyDoc.pdf', pdfBytes);
}