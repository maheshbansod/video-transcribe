import { firebaseAuth, fireStore } from "@/config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore/lite";


type VideoData = {
  filename: string,
  timesetamp: number
  // Let's see
  // url: string,
  // status: Status
}

export async function addVideoItem(videoData: VideoData) {
  const user = firebaseAuth.currentUser;

  if (!user) {
    throw new Error("User not authenticated. Cannot add video item.");
  }
  const userId = user.uid;
  const db = fireStore;

  const existingData = await getVideoItems();
  console.log({ existingData });

  // Reference to the specific document using the user's UID
  const userVideoDocRef = doc(db, 'user_videos', userId);

  // You can either merge new data or overwrite.
  // setDoc with merge: true will add/update fields without deleting others.
  // If you want to replace the entire document content, omit { merge: true }.
  await setDoc(userVideoDocRef, videoData, { merge: true });

}

export async function getVideoItems() {
  const user = firebaseAuth.currentUser;

  if (!user) {
    throw new Error("User not authenticated. Cannot add video item.");
  }
  const userId = user.uid;
  const db = fireStore;

  // Reference to the specific document using the user's UID
  const userVideoDocRef = doc(db, 'user_videos', userId);


  const videoDoc = await getDoc(userVideoDocRef);
  if (videoDoc.exists()) {
    return videoDoc.data()
  }
  return undefined;
}
