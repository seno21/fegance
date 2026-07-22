/**
 * Cleanup Script — Remove `avatar` field from all testimonials in Firestore.
 *
 * Usage: npx tsx scripts/cleanup-testimonial-avatar.ts
 *
 * Make sure your .env file has the correct Firebase config.
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteField,
} from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanup() {
  console.log("Removing `avatar` field from all testimonials...\n");

  const snapshot = await getDocs(collection(db, "testimonials"));

  if (snapshot.empty) {
    console.log("No testimonials found. Nothing to clean up.");
    process.exit(0);
  }

  let cleaned = 0;
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if ("avatar" in data) {
      await updateDoc(doc(db, "testimonials", docSnap.id), {
        avatar: deleteField(),
      });
      cleaned++;
      console.log(`  ✓ ${data.name || docSnap.id}`);
    }
  }

  console.log(`\nDone. Cleaned ${cleaned} of ${snapshot.size} testimonials.`);
  process.exit(0);
}

cleanup().catch((e) => {
  console.error("Cleanup failed:", e);
  process.exit(1);
});
