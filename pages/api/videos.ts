// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  prediction: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
      res.status(200).json({ prediction: 0.6 });
  } else {
      res.status(200).json({ prediction: 0.8 });
  }
}
