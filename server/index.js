import app from "./app.js";
import connectDB from "./database/dbMongo.config.js";

const host = process.env.HOST ?? "0.0.0.0";
const port = process.env.PORT ?? 5000;

// Listen Server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// Database
connectDB();
