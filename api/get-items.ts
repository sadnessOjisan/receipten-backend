import "../infra/firebase";

import { NowRequest, NowResponse } from "@vercel/node";
import admin from "firebase-admin";
import dotenv from "dotenv";

const db = admin.firestore();

type D = { data: { itemPrice: string; itemName: string }[] };

export default async (req: NowRequest, res: NowResponse) => {
  const { id } = req.query;
  if (typeof id !== "string") return res.json("error");
  const ref = await db.collection("item").doc(id);
  const data: D = (await (await ref.get()).data()) as any;
  const prices = data.data.map((d) => ({
    ...d,
    priceNum: parseInt(d.itemPrice.replace("¥", "").replace(/,/g, "")),
  }));
  const sum = prices.reduce((prev, current) => prev + current.priceNum, 0);
  return res.json({ ...data, sum });
};
