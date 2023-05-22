import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config";

export default function Page() {
  const [details, setDetails] = useState();
  const { id } = useParams();

  const getDocument = async () => {
    const q = query(collection(db, "jobs"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        setDetails(doc.data());
      }
    });
  };
  useEffect(() => {
    getDocument();
  }, []);

  return (
    <div className="shadow mx-4 my-4 p-3">
      <div className="p-3  ">
        <h1 className="text-2xl">{details?.title}</h1>
      </div>
      <div className="p-3  ">
        <p>{details?.description}</p>
      </div>

      <div className="mx-3">
        <h1 className="text-xl">Requirements</h1>
        <ul>
          {details?.requirements?.map((requirement) => (
            <li className="my-3">{requirement}</li>
          ))}
        </ul>
      </div>
      <div className="mx-3 my-3">
        <h1 className="text-xl">Responsibilities</h1>
        <ul>
          <ul>
            {details?.responsibilitys?.map((requirement) => (
              <li className="my-3">{requirement}</li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}
