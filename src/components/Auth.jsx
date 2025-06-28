import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";

const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

export default function Auth({ setUser }) {
  const signInWithGoogle = async () => {
    try {
      if (isIOS) {
        await signInWithRedirect(auth, provider);
        setUser(result.user);
      } else {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
      }
    } catch (error) {
      alert("שגיאה בכניסה עם גוגל: " + error.message);
      console.error("שגיאת כניסה:", error);
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      <h1 className="text-4xl font-bold mb-4">ברוכים הבאים ל'הארץ' הימני</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
      >
        התחבר עם גוגל
      </button>
    </div>
  );
}
