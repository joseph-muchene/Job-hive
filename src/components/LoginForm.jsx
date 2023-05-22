import React, { useState } from "react";
import GoogleIcon from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-hot-toast";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setTimeout(() => {
          toast.success("Sign in succesfull");
        }, 1000);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  };

  const signInForm = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setTimeout(() => {
          toast("Sign in succesfull");
        }, 1000);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="flex justify-center my-[50px]">
      <div className="flex flex-col ">
        <h1 className="text-center text-2xl mb-3 ">Create your account</h1>
        <button
          className="border px-3 py-2 rounded-full"
          onClick={googleSignIn}
        >
          <img className="h-6 inline" src={GoogleIcon} alt="" srcset="" /> Login
          With Google
        </button>
        <h1 className="text-center">or</h1>

        <form onSubmit={signInForm}>
          <div className="flex flex-col my-3">
            <label htmlFor="name">Email</label>
            <input
              className="border px-3 py-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="name">Password</label>
            <input
              className="border px-3 py-2"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div>
            <p>I agree to all Term, Privacy and Fees</p>
          </div>

          <div className="space-y-3 mt-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>

            <p>
              Dont have an account? <Link to={"/register"}>register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
