import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function getUserAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const onRequest = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  };

  useEffect(() => {
    onRequest();
  }, []);
  const userData = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    // photo: user.photoUrl,
  };

  return { user: userData };
}
