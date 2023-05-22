import Resume from "./Resume";

export default function Application({ application }) {
  return (
    <div className="shadow mb-8 my-2 p-2   mx-8">
      <div className="border-b-2 mb-2">
        <h1 className="text-[#0e5658] text-xl my-1">Name</h1>
        <span>{application?.name}</span>
      </div>
      <div className="border-b-2 mb-2">
        <h1 className="text-[#0e5658] text-xl my-1">Email</h1>
        <span>{application?.email}</span>
      </div>
      <div className="border-b-2 mb-2">
        <h1 className="text-[#0e5658] text-xl my-1">Phone</h1>
        <span>{application?.phone}</span>
      </div>

      <Resume application={application} />
      <div className=" mb-2">
        <h1 className="text-[#0e5658] text-xl my-1">Cover letter</h1>
        <span>{application?.coverLetter}</span>
      </div>
    </div>
  );
}
