import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      year INTEGER NOT NULL,
      studios TEXT,
      winner BOOLEAN
    )
  `);

  db.run(`
    CREATE TABLE producers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )`);

  db.run(`
    CREATE TABLE producers_movies (
      producer_id INTEGER NOT NULL,
      movie_id INTEGER NOT NULL,
      FOREIGN KEY (producer_id) REFERENCES producers(id),
      FOREIGN KEY (movie_id) REFERENCES movies(id),
      PRIMARY KEY (producer_id, movie_id)
    )
    `);
});

export default db;
