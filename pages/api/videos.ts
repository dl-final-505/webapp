// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v4 as uuidV4 } from "uuid";

export type Prediction = {
  prediction: number;
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prediction>
) {
  if (req.method === "POST") {
    const id = uuidV4();
    const form = formidable({
      uploadDir: ".uploads",
      keepExtensions: true,
      filename: (_, ext) => `${id}${ext}`,
    });

    form.parse(req, async (err, fields, files) => {
      console.log(files[0]);

      console.log(`file uploaded: ${id}`);

      const result = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: JSON.stringify({
          path: `/Users/dorshinar/git/webapp/.uploads/${id}.mp4`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await result.json();

      console.log(`prediction: ${json.prediction}`);

      res.status(200).json({ prediction: json.prediction, id });
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
