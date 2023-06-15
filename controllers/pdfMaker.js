const express = require("express");
const mongoose = require("mongoose");
const PdfPrinter = require("pdfmake");
const fs = require("fs");

// Initialize Express
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost/pdf-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a Mongoose schema for your PDF documents
const pdfSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Pdf = mongoose.model("Pdf", pdfSchema);

exports.CreatePdf = (req,res) => {
  Pdf.findById(req.params.id, (err, pdf) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (!pdf) {
      return res.status(404).send("PDF not found");
    }

    const printer = new PdfPrinter();
    const docDefinition = {
      content: [
        { text: pdf.title, style: "header" },
        { text: pdf.content, style: "content" },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        content: { fontSize: 12 },
      },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pdf.title}.pdf`
    );

    pdfDoc.pipe(res);
    pdfDoc.end();
  });
};
