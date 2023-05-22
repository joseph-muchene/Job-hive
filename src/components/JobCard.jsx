import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { FaCalendar, FaLocationArrow } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../config";
import moment from "moment";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteDoc(doc(db, "jobs", job?.id));

    toast.success("Job removed");
  };

  function formatTimestamp(timestamp) {
    const momentDate = moment(timestamp).fromNow();
    // const formattedDate = momentDate.format("YYYY-MM-DD").fromNow();
    return momentDate;
  }

  return (
    <div className="bg-white p-3 my-4 border shadow relative md:w-[70%]">
      <div className="absolute top-0 left-0 ">
        <h2 className="mb-4 bg-[#000] text-white w-20 rounded text-center">
          {job?.category}
        </h2>
      </div>

      <h1
        onClick={() => navigate("/job/" + job?.id)}
        className="my-4 text-2xl  cursor-pointer w-1/2  "
      >
        {job?.title}
      </h1>

      <p>{job?.description}</p>

      <div className="flex md:space-x-3 my-2 flex-wrap">
        <div>
          <h2 className="my-[20px] flex gap-2 ">
            <FaLocationArrow />
            <span>Location: {job?.location}</span>
          </h2>
        </div>
        <div>
          <h2 className="my-[20px] flex gap-2">
            <FaCalendar />
            <span>Date posted: {formatTimestamp(job.date)}</span>{" "}
          </h2>
        </div>
      </div>

      {window.location.pathname.startsWith("/dashboard") && (
        <div className="flex flex-row space-x-2 flex-wrap ">
          <button
            onClick={() => navigate("/update/" + job.title)}
            className="py-2 px-3 bg-[#08db79] text-white rounded md:w-[20%] text-center"
          >
            update
          </button>
          <button
            onClick={handleDelete}
            className="py-2 px-3 bg-[#d11414] text-white rounded  md:w-[20%] text-center"
          >
            delete
          </button>

          <button
            // onClick={handleDelete}
            className="py-2 px-3 bg-[#035b6d] text-white rounded md:w-[20%] text-center"
          >
            <Link to={`/applications/${job?.id}`}> Applications</Link>
          </button>
        </div>
      )}
    </div>
  );
}
