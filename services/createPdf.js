const PDFDocument = require("pdfkit");
// const path = require("path");
const { getBasepathTo } = require("../utils/helpers");

const basePath = getBasepathTo("assets");
// const basePath = path.resolve(__dirname, "..", "assets");

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
 * @param {import('pdfkit')} doc Instance of PDFDocument of pdfkit
 * @param {string} name - Name to be printed on the certificate
 * @param {number} gpa - Percentage scored
 * @param {string} grade - Grade awared
 */
function createPage(doc, name, percentage, grade) {
  // Header

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");
  doc.fontSize(10);

  // SVGtoPDF(doc, headerGraphic, 0, 0, {
  //   width: doc.page.width,
  //   assumePt: true,
  // });

  doc.image(basePath + "/header-graphic.png", 0, 16, { width: doc.page.width });

  jumpLine(doc, 7);

  doc
    .font(basePath + "/fonts/BarlowCondensed-Medium.ttf")
    .fontSize(62.53)
    .fill("#383c57")
    .text("CERTIFICATE", {
      align: "left",
    });

  doc
    .font(basePath + "/fonts/BarlowCondensed-Medium.ttf")
    .fontSize(25.01)
    .fill("#e2c493")
    .text("OF ACHIEVEMENT", {
      align: "left",
    });

  jumpLine(doc, 1);

  // Content
  doc
    .font(basePath + "/fonts/ABeeZee-Regular.ttf")
    .fontSize(18)
    .fill("#383c57")
    .text("THIS CERTIFICATE IS PRESENTED TO", {
      align: "left",
    });

  jumpLine(doc, 1);

  doc
    .font(basePath + "/fonts/ScopeOne-Regular.ttf")
    .fontSize(50.03)
    .fill("#383c57")
    .text(name, {
      align: "left",
    });

  const textMaxWidth = 650;

  // name underline
  let nameLineSize = 530;
  let nameHeight = 405;

  doc.fillAndStroke("#021c27");
  doc.strokeOpacity(0.5);

  let nameLine = 70;
  let nameEndLine = nameLineSize;
  doc.moveTo(nameLine, nameHeight).lineTo(nameEndLine, nameHeight).stroke();

  doc.moveDown(0.2);

  doc
    .font(basePath + "/fonts/ABeeZee-Regular.ttf")
    .fontSize(18)
    .fill("#383c57")
    .text(
      `in recognition of his/her efforts and achievement in completing the program. He/She scored ${percentage}% and was awarded with ${grade} grade.`,
      {
        width: textMaxWidth,
        align: "left",
      }
    );

  doc.moveDown(0.5);

  nameLineSize = 80;
  nameHeight = doc.page.height - 50;

  nameLine = 70;
  nameEndLine = 70 + nameLineSize;
  doc.moveTo(nameLine, nameHeight).lineTo(nameEndLine, nameHeight).stroke();

  doc.moveDown(1.3);
  doc
    .font(basePath + "/fonts/ABeeZee-Regular.ttf")
    .fontSize(12)
    .fill("#383c57")
    .text("Instructor", {
      width: textMaxWidth,
      align: "left",
    });
}

module.exports = { createPdf, createPage };
