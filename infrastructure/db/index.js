import mongoose from "mongoose";

const mongodbInit = () => {
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const dbName = process.env.DB_NAME;
  const MONGODB_URI = `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export { mongodbInit };
