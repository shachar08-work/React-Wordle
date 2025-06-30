import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";


function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.userAgent)
}

const isIOS = iOS();

export default function Auth({ setUser }) {
  const signInWithGoogle = async () => {
  try {
    if (isIOS) {
      await signInWithRedirect(auth, provider);  // iOS
  } else {
      await signInWithPopup(auth, provider);     // others
  }
  } catch (error) {
    alert("שגיאה בכניסה עם גוגל: " + error.message);
  }
};


  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      <h1 className="text-4xl font-bold mb-4">'הארץ' הימני</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
      >
        התחבר עם גוגל
      </button>
    </div>
  );
}
