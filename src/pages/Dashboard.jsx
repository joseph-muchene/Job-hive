import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../config";
export default function Dashboard() {
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const [docId, setDocId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        return navigate("/");
      }
    });
  }, []);

  const getDocuments = async () => {
    const arr = [];
    const q = query(collection(db, "jobs"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().user.id === user.uid) {
        const d = {
          id: doc.id,
          ...doc.data(),
        };
        arr.push(d);
        setDocId(doc?.id);
      }
    });
    setJobs(arr);
  };
  useEffect(() => {
    getDocuments();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="mx-4">
        {jobs.length > 0 && jobs.map((job) => <JobCard job={job} />)}
      </div>
    </div>
  );
}
