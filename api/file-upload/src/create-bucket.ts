import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIAIM7XSY3PNGYVXTXQ",
  secretAccessKey: "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",
});

const params = {
  Bucket: "sondh0127",
  CreateBucketConfiguration: {
    LocationConstraint: "ap-southeast-1",
  },
};

s3.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log("Bucket Created Successfully", data.Location);
});
