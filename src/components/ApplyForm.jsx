import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config";
import { toast } from "react-hot-toast";
import getUserAuth from "../hooks";

export default function ApplyForm() {
  const { user } = getUserAuth();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // get current use

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email) {
      return navigate("/login");
    }

    if (!name || !email || !coverLetter) {
      return toast.error("All fields are required");
    }
    // Upload the resume file to Firebase Storage
    const storage = getStorage();

    // Create a storage reference from our storage service
    console.log(resumeFile.name);
    const storageRef = ref(storage, `resumes/${resumeFile.name}`);

    uploadBytes(storageRef, resumeFile.name).then(async (snapshot) => {
      toast.success("Uploaded a blob or file!");

      const applicationData = {
        name,
        email,
        jobId: id,
        phone,
        resume: snapshot?.metadata.fullPath,
        coverLetter,
      };

      await addDoc(collection(db, "applications"), applicationData);
      setName("");
      setEmail("");
      setPhone("");
      setResume("");
      setCoverLetter("");
      toast.success("application was sent");
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 my-4">Apply here</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block text-gray-700">
            Resume
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="border px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block text-gray-700">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="Enter your cover letter"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
