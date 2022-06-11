// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v4 as uuidV4 } from "uuid";
import video from "../../components/video/video";

export type Prediction = {
  prediction: number;
  id: string;
  time:  string;
  //file: NextApiRequest;

};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prediction>
) {
  if (req.method === "POST") {
    const id = uuidV4();
    const time = new Date().toDateString()

    const form = formidable({
      uploadDir: ".uploads",
      keepExtensions: true,
      filename: () => `${id}.mp4`,
    });

    form.parse(req);
    res.status(200).json({ prediction: Math.random(), id, time});
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
