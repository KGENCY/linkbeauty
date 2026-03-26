import { S3Client } from "@aws-sdk/client-s3";

const globalForR2 = globalThis as unknown as { r2Client: S3Client };

function createR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export const r2Client = globalForR2.r2Client || createR2Client();

if (process.env.NODE_ENV !== "production") globalForR2.r2Client = r2Client;
