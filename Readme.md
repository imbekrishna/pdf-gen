# PDF Generator

## Description

This server application allows users to upload CSV or Excel files, processes the file data, and generates a PDF document based on the provided data. The server uses `multer` for handling file uploads, `pdfkit` for generating PDFs, and `sheetjs` for parsing CSV and Excel files.

## Features

- File upload validation (CSV, Excel)
- PDF generation from uploaded data
- Real-time processing and streaming

## Dependencies

- Node.js
- npm
- express
- multer
- pdfkit
- sheetjs

## Get started

1. Clone the repository:

   ```bash
   git clone https://github.com/imbekrishna/pdf-gen.git
   cd pdf-gen
   ```
2. Install the client dependencies
   
   ```bash
   cd client
   npm install
   ```
3. Install the server dependencies
   ```bash
   cd ..
   npm install
   ```
4. Build the client
   ```
   npm run build
   ```
5. Start the server
   ```
   npm run start
   ```
   The sever will run on `http://localhost:8080`


## API Endpoints

### POST /pdf/upload

  1. Description: Uploads a file to the server.
  2. Request:
      - file: CSV or Excel file (multipart/form-data)
  3. Response: JSON object containing the uploaded filename.

### POST /pdf/generate

  1. Description: Generates a PDF from the uploaded file.
  2. Request:
      - filename: Name of the uploaded file (JSON body)
  3. Response: PDF file stream.