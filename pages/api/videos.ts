// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v4 as uuidV4 } from "uuid";

export type Prediction = {
  prediction: number;
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prediction>
) {
  if (req.method === "POST") {
    const id = uuidV4();
    const form = formidable({
      uploadDir: ".uploads",
      keepExtensions: true,
      filename: () => `${id}.mp4`,
    });

    form.parse(req);
    res.status(200).json({ prediction: Math.random(), id });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
