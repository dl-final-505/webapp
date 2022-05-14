// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export type Prediction = {
  prediction: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prediction>
) {
  if (req.method === "POST") {
    const form = formidable({
      uploadDir: ".uploads",
      keepExtensions: true,
    });

    form.parse(req);
    res.status(200).json({ prediction: Math.random() });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
