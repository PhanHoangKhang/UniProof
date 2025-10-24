import React from "react";
import { useParams } from "react-router-dom";

const FileViewer = () => {
  const { fileName } = useParams();
  const fileUrl = `http://localhost:3000/uploads/${fileName}`;

  // Detect file type by extension
  const ext = fileName.split(".").pop().toLowerCase();

  return (
    <div className="max-w-5xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold text-[#16456a] mb-6">Xem Tệp</h2>

      {ext === "pdf" ? (
        <iframe
          src={fileUrl}
          title="PDF Viewer"
          className="w-full h-[80vh] border rounded-lg shadow"
        ></iframe>
      ) : ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif" ? (
        <img
          src={fileUrl}
          alt="Uploaded"
          className="max-w-full mx-auto rounded-lg shadow"
        />
      ) : ext === "docx" || ext === "doc" ? (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
          title="Word Viewer"
          className="w-full h-[80vh] border rounded-lg shadow"
        ></iframe>
      ) : (
        <p className="text-gray-600">
          Không thể xem trước loại tệp này.{" "}
          <a
            href={fileUrl}
            download
            className="text-blue-600 hover:underline"
          >
            Tải xuống tệp
          </a>
        </p>
      )}
    </div>
  );
};

export default FileViewer;
