// utils/googleLogin.js
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { auth, provider } from "@/lib/firebase";
export const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save to your MongoDB backend
    const res = await axios.post("/api/auth/google", {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    //   uid: user.uid,
    });
    // Save user/token to localStorage or context
    // localStorage.setItem("token", res.data.token);
    // localStorage.setItem("user", JSON.stringify(res.data.user)); 
    return res.data.user;
  } catch (err) {
    console.error("Google Sign-In error:", err);
    throw err;
  }
};
