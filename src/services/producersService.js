import db from "../database/index.js";

export async function getProducersWinners() {
  return await new Promise((resolve, reject) => {
    db.all(
      `
      SELECT p.name AS producer, m.year
      FROM producers p
      JOIN producers_movies pm ON p.id = pm.producer_id
      JOIN movies m ON m.id = pm.movie_id
      WHERE m.winner = 1
      ORDER BY p.name, m.year
    `,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}
