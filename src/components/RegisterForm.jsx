import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/google.png";
import { auth, db } from "../config";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const onSignIn = () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSignUp = (e) => {
    e.preventDefault();
    console.log("hello");

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userData = {
          email: user.email,
          name: user.displayName ? user.displayName : name,
        };

        await addDoc(collection(db, "users"), userData);
        setTimeout(() => {
          toast.success("you were registered");
        }, 1000);

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center my-[50px]">
      <div className="flex flex-col ">
        <h1 className="text-center text-2xl mb-3 ">Create your account</h1>
        <button className="border px-3 py-2 rounded-full" onClick={onSignIn}>
          <img className="h-6 inline" src={GoogleIcon} alt="" srcset="" /> Login
          With Google
        </button>
        <h1 className="text-center">or</h1>

        <form onSubmit={onSignUp}>
          <div className="flex flex-col my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
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
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign up
            </button>

            <p>
              Already have an account? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
