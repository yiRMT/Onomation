import Card from "./Card";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import AuthContext from "../../libs/context/AuthContext";

const AuthCard = () => {
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
        const user = result.user;
        console.log('ログインに成功しました uid: ', user.uid);
      } catch (error) {
        console.log(error);
        alert('認証に失敗しました');
      }
    }
  }

  return (
    <>
      <div className="relative group">
        <div
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
        </div>
        <div onClick={ handleSignIn }>
          <Card title={ authState.user ? "ログアウト" : "ログイン" } />
        </div>
      </div>
    </>
  );
}

export default AuthCard;
