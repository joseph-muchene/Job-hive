import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Application from "../components/Application";
import { useParams } from "react-router-dom";
import { auth, db } from "../config";
import { onAuthStateChanged } from "firebase/auth";

export default function Applications() {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        return navigate("/");
      }
    });
  }, []);

  async function getApplication() {
    const q = query(collection(db, "applications"));

    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().jobId === id) {
        const data = { id: doc.id, ...doc.data() };
        arr.push(data);
      }
    });

    setApplications(arr);
  }

  useEffect(() => {
    getApplication();
  }, [id]);
  return (
    <div>
      <Navbar />

      <div className="flex flex-col  ">
        {applications.length < 1 && (
          <h1 className="text-center mt-56 text-2xl">
            There are no applications for now!
          </h1>
        )}
        {applications.map((application, index) => (
          <Application application={application} key={index} />
        ))}
      </div>
    </div>
  );
}
