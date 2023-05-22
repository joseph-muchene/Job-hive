import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import PDFViewer from "react-pdf-js";
export default function Resume({ application }) {
  const [downLoadUrl, setDownloadurl] = useState(null);

  const storage = getStorage();

  useEffect(() => {
    const storagePath = application.resume; // Replace with your storage path
    getStorageDownloadURL(storagePath)
      .then((url) => setDownloadurl(url))
      .catch((error) => {
        // Handle the error here
      });
  }, []);
  useEffect(() => {
    const storagePath = application.resume; // Replace with your storage path
    getStorageDownloadURL(storagePath)
      .then((url) => setDownloadurl(url))
      .catch((error) => {
        // Handle the error here
      });
  }, [application.resume]);

  const getStorageDownloadURL = async (storagePath) => {
    try {
      const storageRef = ref(storage);
      const fileRef = ref(storageRef, storagePath);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="border-b-2 mb-2">
      {downLoadUrl && (
        <button className="bg-[#000] px-4 py-2 border rounded text-white">
          {downLoadUrl && <a href={downLoadUrl}>Download resume</a>}
        </button>
      )}
    </div>
  );
}
