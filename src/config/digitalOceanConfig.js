import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const digitalOceanConfig = {
  accessKey: process.env.DO_SPACE_ACCESS_KEY || "",
  secretKey: process.env.DO_SPACE_SECRET_KEY || "",
  bucketName: process.env.DO_SPACE_NAME || "",
  region: process.env.DO_SPACE_REGION || "nyc3", // Default to 'nyc3' if not set
  endpoint:
    process.env.DO_SPACE_ENDPOINT || "https://nyc3.digitaloceanspaces.com", // Default endpoint
};

export default digitalOceanConfig;
