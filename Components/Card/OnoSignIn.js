import WorksCard from "./Card";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { useContext, useEffect } from "react";
import AuthContext from "@/libs/context/AuthContext";

const OnoSignIn = () => {
  const {authState, authDispatch} = useContext(AuthContext);

  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    if (authState.user) {
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...  
        console.log(user);
      } catch (error) {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      }
    }
  }

  return (
    <>
      <span className="relative group">
        <span
          className={[
            "whitespace-nowrap",
            "rounded",
            "bg-black",
            "px-2",
            "py-1",
            "text-white",
            "absolute",
            "-top-12",
            "left-1/2",
            "-translate-x-1/2",
            "before:content-['']",
            "before:absolute",
            "before:-translate-x-1/2",
            "before:left-1/2",
            "before:top-full",
            "before:border-4",
            "before:border-transparent",
            "before:border-t-black",
            "opacity-0",
            "group-hover:opacity-100",
            "transition",
            "pointer-events-none",
          ].join(" ")}
        >
          { authState.user ? "ログアウトする" : "Googleアカウントでログインする" }
        </span>
        <button onClick={ handleSignIn }>
          <WorksCard title={ authState.user ? "ログアウト" : "ログイン" } />
        </button>
      </span>
    </>
  );
}

export default OnoSignIn;
