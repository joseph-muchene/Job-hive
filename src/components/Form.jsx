import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";
import getUserAuth from "../hooks";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const { user } = getUserAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [responsibilitys, setResponsibilities] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

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

    if (!title || !location || !description || !category) {
      return toast.error("All fields are required");
    }

    try {
      const JobData = {
        user: user,
        title,
        location,
        description,
        category,
        requirements,
        applications: [],
        responsibilitys,
        date: Date.now(),
      };
      await addDoc(collection(db, "jobs"), JobData);
      setDescription("");
      setTitle("");
      setRequirements("");
      setResponsibilities("");
      toast.success("Job posted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className=" p-4 md:mx-[10%]" onSubmit={onPublish}>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className={`border px-4 py-2 border-[#333] rounded ${
            title < 1 && ` border-2 border-[#c52626]`
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="job title"
        />
        <input
          type="text"
          className={`border px-4 py-2 border-[#333]   rounded ${
            location < 1 && ` border-2 border-[#c52626]`
          }`}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="job location"
        />
        <input
          type="text"
          className={`border px-4 py-2 border-[#c52626] rounded ${
            category < 1 && ` border-2 border-[red]`
          }`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="department"
        />
        <input
          className={`border px-4 py-2 border-[#c52626] rounded ${
            description < 1 && ` border-2 border-[#c52626]`
          }`}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="job description"
        />
        <div>
          <h1>Requirements</h1>

          <div className="flex flex-col input-requirements"></div>
          <button
            type="button"
            onClick={addRequirement}
            class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-[10rem]"
          >
            Add requirement
          </button>
        </div>
        <div>
          <h1>Requirements</h1>

          <div className="flex flex-col input-responsibility"></div>
          <button
            type="button"
            onClick={addResponsibility}
            class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-[10rem]"
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
