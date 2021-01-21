import { NowRequest, NowResponse } from "@vercel/node";
import { ItemPostBody } from "../type";

export default (req: NowRequest, res: NowResponse) => {
  const body = req.body as ItemPostBody;
  return res.json({ body });
};
