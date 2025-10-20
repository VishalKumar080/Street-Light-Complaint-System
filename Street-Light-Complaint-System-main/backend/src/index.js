import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port: " + PORT);
      // console.log("Open the server on https://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error: " + err);
  });