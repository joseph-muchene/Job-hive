import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Page from "../components/Page";
import { useParams } from "react-router-dom";

export default function Job() {
  const { id } = useParams();

  return (
    <div>
      <Navbar />
      <Hero show={true} id={id} />
      <Page />
    </div>
  );
}
