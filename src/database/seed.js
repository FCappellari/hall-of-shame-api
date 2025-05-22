import fs from "fs";
import path from "path";
import csv from "csv-parser";
import db from "./index.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvFilePath = path.join(__dirname, "Movielist.csv");

function splitProducers(rawValue) {
  if (!rawValue || typeof rawValue !== "string") return [];
  return rawValue
    .split(/\s+and\s+|,\s*/g)
    .map((producer) => producer.trim())
    .filter((p) => p.length > 0);
}

export async function seedDatabase() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        const { year, title, studios, producers, winner } = row;
        const isWinner = winner && winner.trim().toLowerCase() === "yes";

        const parsedYear = parseInt(year, 10);
        if (!parsedYear || isNaN(parsedYear)) {
          console.warn(`Invalid year for movie ${title}: ${year}`);
          return;
        }

        db.serialize(() => {
          db.run(
            `INSERT INTO movies (title, year, studios, winner) VALUES (?, ?, ?, ?)`,
            [title, year, studios, isWinner],
            function (error) {
              if (error) {
                console.error(`Error inserting movie ${title}: `, error);
                return;
              }

              const movieId = this.lastID;
              const producersList = splitProducers(producers);

              if (!producersList.length) {
                console.warn(`No producers found for movie ${title}`);
                return;
              }

              producersList.forEach((producer) => {
                db.run(
                  `INSERT OR IGNORE INTO producers (name) VALUES (?)`,
                  [producer],
                  function () {
                    db.get(
                      `SELECT id FROM producers WHERE name = ?`,
                      [producer],
                      (error, row) => {
                        if (!error && row) {
                          db.run(
                            `INSERT INTO producers_movies (producer_id, movie_id) values (?, ?)`,
                            [row.id, movieId]
                          );
                        }
                      }
                    );
                  }
                );
              });
            }
          );
        });
      })
      .on("error", (error) => {
        console.error("Error reading CSV: ", error);
        reject(error);
      })
      .on("end", () => {
        console.log("CSV file successfully processed. 🆗");
        resolve();
      });
  });
}
