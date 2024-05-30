import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.resolve(__dirname, "..", "assets");

function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }
}
/**
 * Function to create instance of PDFDocument
 * @returns {import('pdfkit')}
 */
function createPdf() {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    autoFirstPage: false,
  });

  return doc;
}

/**
 *
 * @param {import('pdfkit').PDFDocument} doc Instance of PDFDocument of pdfkit
 * @param {string} name - Name to be printed on the certificate
 * @param {number} gpa - Percentage scored
 * @param {string} grade - Grade awared
 */
function createPage(doc, name, percentage, grade) {
  // Header
  const maxWidth = 140;
  const maxHeight = 70;
  const distanceMargin = 18;

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");
  doc.fontSize(10);

  doc
    .fillAndStroke("#0e8cc3")
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();

  doc.image(basePath + "/winners.png", doc.page.width / 2 - maxWidth / 2, 60, {
    fit: [maxWidth, maxHeight],
    align: "center",
  });

  jumpLine(doc, 5);

  doc
    .font(basePath + "/fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Super Course for Awesomes", {
      align: "center",
    });

  jumpLine(doc, 2);

  // Content
  doc
    .font(basePath + "/fonts/NotoSansJP-Regular.otf")
    .fontSize(16)
    .fill("#021c27")
    .text("CERTIFICATE OF COMPLETION", {
      align: "center",
    });

  jumpLine(doc, 1);

  doc
    .font(basePath + "/fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Present to", {
      align: "center",
    });

  jumpLine(doc, 2);

  doc
    .font(basePath + "/fonts/NotoSansJP-Bold.otf")
    .fontSize(24)
    .fill("#021c27")
    .text(name, {
      align: "center",
    });

  jumpLine(doc, 1);

  doc
    .font(basePath + "/fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Successfully completed the Super Course for Awesomes.", {
      align: "center",
    });

  jumpLine(doc, 7);

  doc.lineWidth(1);

  // Signatures
  const lineSize = 174;
  const signatureHeight = 390;

  doc.fillAndStroke("#021c27");
  doc.strokeOpacity(0.2);

  const startLine1 = 128;
  const endLine1 = 128 + lineSize;
  doc
    .moveTo(startLine1, signatureHeight)
    .lineTo(endLine1, signatureHeight)
    .stroke();

  const startLine2 = endLine1 + 32;
  const endLine2 = startLine2 + lineSize;
  doc
    .moveTo(startLine2, signatureHeight)
    .lineTo(endLine2, signatureHeight)
    .stroke();

  const startLine3 = endLine2 + 32;
  const endLine3 = startLine3 + lineSize;
  doc
    .moveTo(startLine3, signatureHeight)
    .lineTo(endLine3, signatureHeight)
    .stroke();

  doc
    .font(basePath + "/fonts/NotoSansJP-Bold.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("John Doe", startLine1, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(basePath + "/fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Associate Professor", startLine1, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(basePath + "/fonts/NotoSansJP-Bold.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Student Name", startLine2, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(basePath + "/fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Student", startLine2, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(basePath + "/fonts/NotoSansJP-Bold.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Jane Doe", startLine3, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(basePath + "/fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Director", startLine3, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  jumpLine(doc, 4);

  // Validation link
  const link = "https://validate-your-certificate.hello/validation-code-here";

  const linkWidth = doc.widthOfString(link);
  const linkHeight = doc.currentLineHeight();

  doc
    .underline(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, {
      color: "#021c27",
    })
    .link(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, link);

  doc
    .font(basePath + "/fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text(link, doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight);

  // Footer
  const bottomHeight = doc.page.height - 100;

  doc.image(basePath + "/qr.png", doc.page.width / 2 - 30, bottomHeight, {
    fit: [60, 60],
  });
}

export default createPdf;
export { createPage };
