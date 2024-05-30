import axios from "axios";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./fileUpload.module.css";

const baseUrl = "http://localhost:3001/pdf";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const filename = file?.name.replace(/\.[^/.]+$/, "");

  const onDrop = useCallback((acceptedFiles) => {
    setErrors(null);
    const selectedFile = acceptedFiles[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (selectedFile && selectedFile.size > maxSize) {
      setErrors("File size should be less than 2MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  }, []);

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const result = await axios.post(`${baseUrl}/upload`, formData);
        const data = result.data;
        setUploadedFile(data.filename);
        setErrors(null);
      } catch (error) {
        console.log(error);
        setErrors(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${baseUrl}/generate`,
        {
          filename: uploadedFile,
        },
        { responseType: "blob" }
      );

      const pdfBlob = new Blob([result.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", `${filename}.pdf`);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      let errorString = error.response.data;
      if (
        error.request.responseType === "blob" &&
        error.response.data instanceof Blob &&
        error.response.data.type &&
        error.response.data.type.toLowerCase().indexOf("json") != -1
      ) {
        errorString = JSON.parse(await error.response.data.text());
      }
      setErrors(errorString.message);
    } finally {
      setLoading(false);
      setFile(null);
      setUploadedFile(null);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  return (
    <div>
      <div className={styles.boxInput}>
        {!uploadedFile && (
          <>
            <p>Select csv/xlsx files to generate pdfs.</p>
            <div
              {...getRootProps({
                className: clsx(
                  styles.uploadLabel,
                  isDragAccept && styles.accpet,
                  isDragReject && styles.reject
                ),
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : file ? (
                <p>{filename}</p>
              ) : (
                <p>Select file or drag it here.</p>
              )}
            </div>
          </>
        )}
        {!uploadedFile && file && (
          <button
            disabled={loading}
            className={styles.boxButton}
            onClick={handleUpload}
          >
            {loading ? <span className={styles.loader}></span> : "Upload"}
          </button>
        )}
        {uploadedFile && (
          <button
            disabled={loading}
            className={styles.boxButton}
            onClick={handleDownload}
          >
            {loading ? (
              <span className={styles.loader}></span>
            ) : (
              "Download certificates"
            )}
          </button>
        )}

        {errors && <p className={styles.errors}>{errors}</p>}
      </div>
    </div>
  );
};
export default FileUpload;
