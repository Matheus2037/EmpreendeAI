import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getColletions(colletionName: string) {
  return (await getDocs(collection(db, colletionName))).docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data(),
    };
  });
}
