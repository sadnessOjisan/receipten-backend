import "../infra/firebase";

import { NowRequest, NowResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";

const db = admin.firestore();

export default async (req: NowRequest, res: NowResponse) => {
  const { id } = req.query;
  if (typeof id !== "string") return res.json("error");
  const ref = await db.collection("item").doc(id);
  const data = await (await ref.get()).data();
  return res.json({ data });
};
