// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import type { File } from "formidable";
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

    form.parse(req, async (_err, _fields, files) => {
      let file: File;
      if (Array.isArray(files.video)) {
        file = files.video[0];
      } else {
        file = files.video;
      }
      if (!file) return;

      const result = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: JSON.stringify({
          path: file.filepath,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await result.json();

      res.status(200).json({ prediction: json.prediction, id });
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
