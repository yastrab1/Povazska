import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/config/firebase";

export default function useIsLoggedIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Set up the authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setName(user.displayName || "");
        setEmail(user.email || "");
      } else {
        setLoggedIn(false);
        setName("");
        setEmail("");
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [loggedIn, name,email]); // Empty dependency array ensures this runs only once

  return { loggedIn, name, email };
}
