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
        const { year, title, studios, producers, winner } = row;
        const isWinner = winner && winner.trim().toLowerCase() === "yes";

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
              const producersList = producers
                .split(/,| and /)
                .map((producer) => producer.trim())
                .filter((p) => p.length > 0);

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
        console.error("Error ao ler CSV: ", error);
        reject(error);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve();
      });
  });
}
