var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// template/certificate.jsx
var certificate_exports = {};
__export(certificate_exports, {
  default: () => certificate_default
});
module.exports = __toCommonJS(certificate_exports);
var import_react = __toESM(require("react"), 1);
var import_renderer = __toESM(require("@react-pdf/renderer"), 1);
var styles = import_renderer.StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    color: "#131925",
    marginBottom: 8
  },
  statement: {
    fontSize: 20,
    color: "#131925",
    lineHeight: 1.4,
    marginBottom: 4
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#999999",
    margin: "24px 0 24px 0"
  },
  paragraph: {
    fontSize: 12,
    color: "#212935",
    lineHeight: 1.67
  },
  columnParent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  columnStart: {
    flex: 1
  },
  columnEnd: {
    flex: 1,
    alignItems: "flex-end"
  }
});
var PDF = ({ data }) => {
  return /* @__PURE__ */ import_react.default.createElement(import_renderer.Document, null, /* @__PURE__ */ import_react.default.createElement(import_renderer.Page, { size: "A4", style: styles.page }, /* @__PURE__ */ import_react.default.createElement(import_renderer.View, { style: styles.section }, /* @__PURE__ */ import_react.default.createElement(import_renderer.View, { style: styles.columnParent }, /* @__PURE__ */ import_react.default.createElement(import_renderer.View, { style: styles.columnStart }, /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.heading }, data.companyName), /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.paragraph }, data.companyPhone), /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.paragraph }, data.companyEmail)), /* @__PURE__ */ import_react.default.createElement(import_renderer.View, { style: styles.columnEnd }, /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.heading }, "Receipt"), /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.paragraph }, "Receipt number: ", data.receiptNumber), /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.paragraph }, "Date paid: ", data.datePaid), /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.paragraph }, "Payment method: ", data.paymentMethod))), /* @__PURE__ */ import_react.default.createElement(import_renderer.View, { style: styles.divider }), /* @__PURE__ */ import_react.default.createElement(import_renderer.View, null, /* @__PURE__ */ import_react.default.createElement(
    import_renderer.Text,
    {
      style: styles.statement
    },
    `${data.amount} paid on ${data.datePaid}`
  ), /* @__PURE__ */ import_react.default.createElement(import_renderer.Text, { style: styles.paragraph }, "Thank you for your business!")))));
};
var certificate_default = async (data) => {
  return await import_renderer.default.renderToStream(/* @__PURE__ */ import_react.default.createElement(PDF, { ...{ data } }));
};
