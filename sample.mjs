import { PDFDocument } from 'pdf-lib'
import { createRequire } from 'module';

const outputDir  = 'pdf_output';
const outputFile = 'test.pdf';
const outputPath = './' + outputDir;
// PDF出力先フォルダ作成
const require = createRequire(import.meta.url);
const fs = require('fs');
if( !fs.existsSync( outputPath )){
  fs.mkdir(outputDir, (err) => {
    if (err) { throw err; }
  });
}
// PDF作成
const pdfDoc = await PDFDocument.create()
const page = pdfDoc.addPage()
page.drawText('You can create PDFs!')
const pdfBytes = await pdfDoc.save()
// 書き込み
fs.writeFileSync(outputPath + '/' + outputFile, pdfBytes);
