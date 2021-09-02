import { PDFDocument } from 'pdf-lib'
import { createRequire } from 'module';

mergeDoc();

async function mergeDoc() {
  // 読み込み
  const require = createRequire(import.meta.url);
  const fs = require('fs');
  const uint8Array1 = fs.readFileSync('./pdf_input/sample_1.pdf');
  const pdfDoc1 = await PDFDocument.load(uint8Array1);
  const uint8Array2 = fs.readFileSync('./pdf_input/sample_2.pdf');
  const pdfDoc2 = await PDFDocument.load(uint8Array2);
  // 結合
  const [existingPage] = await pdfDoc1.copyPages(pdfDoc2, [0]);
  pdfDoc1.insertPage(1, existingPage);
  const pdfBytes = await pdfDoc1.save()
  // 書き込み
  fs.writeFileSync('./pdf_output/mergeDoc.pdf', pdfBytes);
}