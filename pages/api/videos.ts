// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import type { File } from "formidable";
import { v4 as uuidV4 } from "uuid";
import { exec } from "node:child_process";
import { unlinkSync } from "node:fs";

export type Prediction = {
  prediction: number;
  id: string;
  time: string;
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
      filename: (fileName, ext) => {
        if (fileName === "blob") {
          return `${id}.webm`;
        }
        return `${id}${ext}`;
      },
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (_err, _fields, files) => {
        let file: File;
        if (Array.isArray(files.video)) {
          file = files.video[0];
        } else {
          file = files.video;
        }
        if (!file) return;

        const mp4Path = `${file.filepath.substring(
          0,
          file.filepath.lastIndexOf(".")
        )}.mp4`;

        if (file.filepath.endsWith("webm")) {
          exec(`ffmpeg -i ${file.filepath} ${mp4Path}`);
        }

        const result = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: JSON.stringify({
            path: mp4Path,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await result.json();

        const today = new Date();
        const day = today.toLocaleDateString();
        const datetime = today.toLocaleTimeString();
        let temp = day + " " + datetime;
        const time = temp;

        res.status(200).json({ prediction: json.prediction, id, time });
        resolve(undefined);

        unlinkSync(file.filepath);
        unlinkSync(mp4Path);
      });

      form.on("error", (error) => {
        reject(error);
      });
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
