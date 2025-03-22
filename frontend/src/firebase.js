import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🚨 Disable reCAPTCHA verification ONLY in development mode
if (window.location.hostname === "localhost") {
    auth.settings.appVerificationDisabledForTesting = true;
}

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
