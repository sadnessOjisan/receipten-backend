import "../infra/firebase";

import { NowRequest, NowResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";
import { ItemPostBody } from "../type";

dotenv.config();

const db = admin.firestore();

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  const body = JSON.parse(req.body) as ItemPostBody;
  console.log("body", body);
  const data = await db.collection("item").add({ data: body });
  console.log("data", data);
  const id = data.id;
  return res.json({ id });
};
