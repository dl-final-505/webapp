// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

type Data = {
  prediction: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const form = formidable({ uploadDir: ".uploads", keepExtensions: true });

    form.parse(req);
    res.status(200).json({ prediction: 0.6 });
  } else {
    res.status(200).json({ prediction: 0.8 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
