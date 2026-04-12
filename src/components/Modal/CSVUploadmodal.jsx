import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { uploadCSV, fetchLeads } from "../../redux/slices/leadSlice";
import { MdOutlineFileDownload } from "react-icons/md";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { CgClose } from "react-icons/cg";
import "react-circular-progressbar/dist/styles.css";
import upload from "../../assets/icons/upload.svg";
import { FaAngleRight } from "react-icons/fa6";

const CSVUploadModal = ({ close }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState("select");

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  const handleVerify = () => {
    if (!file) return;

    setStep("verify");
    setProgress(0);

    let value = 0;

    const interval = setInterval(() => {
      value += 20;

      if (value >= 100) {
        clearInterval(interval);
        setProgress(100);
      } else {
        setProgress(value);
      }
    }, 150);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await dispatch(uploadCSV(file)).unwrap();
      dispatch(fetchLeads());

      close();
    } catch (err) {
      console.error(err);
      setStep("verify");
    }
  };

  return (
    <div className="csv-modal-overlay" onClick={close}>
      <div className="csv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="csv-header">
          <div>
            <h2>CSV Upload</h2>
            <p>Add your documents here</p>
          </div>
          <button className="close-btn" onClick={close}>
            <CgClose />
          </button>
        </div>

        <div
          className="upload-box"
          {...(step === "select" ? getRootProps() : {})}
        >
          {step === "select" && (
            <>
              <input {...getInputProps()} />

              <div className="upload-icon">
                <img src={upload} alt="" />
              </div>

              <p className="upload-text">
                Drag your file(s) to start uploading
              </p>

              <div className="or-divider">OR</div>

              <button className="browse-btn">Browse files</button>

              <div className="file-preview">
                <span>{file ? file.name : "Sample File.csv"}</span>
                <MdOutlineFileDownload />
              </div>
            </>
          )}

          {step === "verify" && (
            <div className="progress-box">
              <div className="progress-circle">
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                  styles={buildStyles({
                    pathColor: `rgba(0, 0, 0, ${progress / 100})`,
                    textColor: "black",
                  })}
                />
              </div>

              <p className="progress-text">
                {progress === 100 ? "Verified" : "Verifying..."}
              </p>

              <button className="cancel-mini" onClick={close}>
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="csv-footer">
          <button className="cancel-btn" onClick={close}>
            Cancel
          </button>

          {step === "select" && (
            <button
              className="upload-btn"
              onClick={handleVerify}
              disabled={!file}
            >
              Next <FaAngleRight />
            </button>
          )}

          {step === "verify" && (
            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={progress !== 100}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVUploadModal;
