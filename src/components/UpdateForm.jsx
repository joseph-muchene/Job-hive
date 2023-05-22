import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { db } from "../config";
import getUserAuth from "../hooks";
import { toast } from "react-hot-toast";

export default function UpdateForm() {
  const [title, setTitle] = useState("");
  const [docId, setDocId] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [responsibilitys, setResponsibilities] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  // get current user
  const { user } = getUserAuth();

  const addRequirement = () => {
    const InputRequirements = document.querySelector(".input-requirements");

    const input = document.createElement("input");
    input.type = "text";
    input.onchange = (e) => setRequirement(e.target.value);
    input.placeholder = "Enter job requirement";
    input.className = "my-2 border px-4 py-2 border-[#333] rounded";

    InputRequirements.appendChild(input);
    let requirementArray = [];
    requirementArray.push(requirement);
    setRequirements((intialState) => [...intialState, ...requirementArray]);
  };

  const addResponsibility = () => {
    const InputResponsibilities = document.querySelector(
      ".input-responsibility"
    );

    const input = document.createElement("input");
    input.type = "text";
    input.onchange = (e) => setResponsibility(e.target.value);
    input.placeholder = "Enter job responsibilities";
    input.className = "my-2 border px-4 py-2 border-[#333] rounded";

    InputResponsibilities.appendChild(input);
    let responsibilitiesArray = [];
    responsibilitiesArray.push(responsibility);
    setResponsibilities((intialState) => [
      ...intialState,
      ...responsibilitiesArray,
    ]);
  };

  const onPublish = async (e) => {
    e.preventDefault();
    try {
      const JobData = {
        user,
        title,
        location,
        description,
        category,
        requirements,
        responsibilitys,
        date: Date.now(),
      };
      const docRef = doc(db, "jobs", docId);

      await updateDoc(docRef, { ...JobData });

      toast.success("Job updated");
    } catch (error) {
      console.log(error);
    }
  };

  // update article
  const { slug } = useParams();

  const getDocument = async () => {
    const q = query(collection(db, "jobs"), where("title", "==", slug));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDocId(doc.id);
      setTitle(doc.data()?.title);
      setCategory(doc.data()?.category);
      setLocation(doc.data()?.location);
      setDescription(doc.data()?.description);
      setRequirements(doc.data()?.requirements);
      setResponsibilities(doc.data()?.responsibilitys);
    });
  };
  useEffect(() => {
    getDocument();
  }, [slug]);

  const handleChangeResponsibility = (newValue, index) => {
    const updatedResponsibilitys = [...responsibilitys];
    updatedResponsibilitys[index] = newValue;
    setResponsibilities(updatedResponsibilitys);
  };

  const handleChangeRequirements = (newValue, index) => {
    const updatedRequirement = [...requirements];
    updatedRequirement[index] = newValue;
    setRequirements(updatedRequirement);
  };

  return (
    <form className=" p-4 md:mx-[10%]" onSubmit={onPublish}>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="border px-4 py-2 border-[#333] rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="job title"
        />
        <input
          type="text"
          className="border px-4 py-2 border-[#333] rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="job location"
        />
        <input
          type="text"
          className="border px-4 py-2 border-[#333] rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="which category does the job lie"
        />
        <input
          className=" my-2 border px-4 py-2 border-[#333] rounded"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="job description"
        />
        <div>
          <h1>Requirements</h1>

          <div className="flex flex-col input-requirements">
            {requirements?.length > 0 &&
              requirements?.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleChangeRequirements(e.target.value, index)
                  }
                  className="my-2 border px-4 py-2 border-[#333] rounded"
                  placeholder="Enter job requirements"
                />
              ))}
          </div>
          <button
            type="button"
            onClick={addRequirement}
            class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-[10rem]"
          >
            Add requirement
          </button>
        </div>
        <div>
          <h1>Responsibilities</h1>

          <div className="flex flex-col input-responsibility">
            {responsibilitys?.length > 0 &&
              responsibilitys?.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleChangeResponsibility(e.target.value, index)
                  }
                  className="my-2 border px-4 py-2 border-[#333] rounded"
                  placeholder="Enter job requirements"
                />
              ))}
          </div>
          <button
            type="button"
            onClick={addResponsibility}
            className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-[10rem]"
          >
            Add responsibility
          </button>
        </div>
      </div>
      <div className="flex justify-center my-3">
        <button
          type="submit"
          className="p-2 bg-[#16c4d1] text-white my-2 rounded w-[20rem]"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
