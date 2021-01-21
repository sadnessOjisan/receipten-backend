import admin from "firebase-admin";

if (
  typeof process.env.FIREBASE_PROJECT_ID === "string" &&
  typeof process.env.FIREBASE_CLIENT_EMAIL === "string" &&
  typeof process.env.FIREBASE_PRIVATE_KEY === "string"
) {
  const cert = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });
} else {
  throw new Error("invalid env");
}
