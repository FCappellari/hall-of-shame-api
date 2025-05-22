import app from "./src/app.js";
import dotenv from "dotenv";

import { seedDatabase } from "./src/database/seed.js";

await seedDatabase();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
