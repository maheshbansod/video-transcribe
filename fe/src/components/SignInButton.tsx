import { firebaseAuth } from "@/config/firebase";
import StyledFirebaseAuth from "./StyledFirebaseAuth";
import firebase from 'firebase/compat/app';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export function SignInButton() {
  return <>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
  </>
}
