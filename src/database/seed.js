import fs from "fs";
import path from "path";
import csv from "csv-parser";
import db from "./index.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvFilePath = path.join(__dirname, "Movielist.csv");

export async function seedDatabase() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        //console.log({ row });
      })
      .on("error", (error) => {
        console.error("Error ao ler CSV: ", error);
        reject(error);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve();
      });
  });
}
