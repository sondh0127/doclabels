import express, { Request, Response, NextFunction } from "express";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
import cors from "cors";
import fs from "fs";
import AWS from "aws-sdk";
import { fileUploadArgs, fileOutput } from "./fileUploadTypes";
import { v4 } from "uuid";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.static("public"));

app.post("/hello", async (req, res) => {
  return res.json({
    hello: "world",
  });
});

const s3Bucket = new AWS.S3({
  accessKeyId: "AKIAIM7XSY3PNGYVXTXQ",
  secretAccessKey: "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",
});

const fileUploadHandler = async (args: fileUploadArgs): Promise<fileOutput> => {
  const { type, base64str, name } = args;

  // Setting up S3 upload parameters
  const buf = Buffer.from(base64str, "base64");

  const data = {
    Bucket: "sondh0127",
    Key: `${name}-${v4()}.pdf`, // File name you want to save as in S3
    Body: buf,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: "application/pdf",
  };

  s3Bucket.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error uploading data: ", data);
    } else {
      console.log("succesfully uploaded the image!");
    }
  });

  let location = "";
  let key = "";
  try {
    // @ts-ignore
    const { Location, Key } = await s3Bucket.upload(data).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error);
  }

  console.log(location, key);

  return {
    file_path: `${location}`,
  };
};

const fileUpload = async (req: Request, res: Response, next: NextFunction) => {
  const params: fileUploadArgs = req.body.input;
  const result = await fileUploadHandler(params);

  // success
  return res.json(result);
};

app.post("/fileUpload", fileUpload);

app.listen(PORT);
