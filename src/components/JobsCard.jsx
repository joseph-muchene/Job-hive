import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

export default function JobsCard() {
  const [jobs, setJobs] = useState([]);
  const q = query(collection(db, "jobs"));

  async function getData() {
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      const d = {
        id: doc.id,
        ...doc.data(),
      };

      data.push(d);
    });
    setJobs(data);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(jobs);
  return (
    <div class="flex flex-col justify-center items-center mx-4">
      {jobs.map((job) => (
        <JobCard job={job} />
      ))}
    </div>
  );
}
