import Hero from "./components/Hero";
import JobsCard from "./components/JobsCard";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="bg-[#f4f4f4] h-screen w-full ">
      <Navbar />
      <Hero />
      <JobsCard />
    </div>
  );
}
